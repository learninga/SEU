var canvas;
var gl;
var program;
var ms = 180;

var forward = 0;
var eye = vec3(0.0, 0.0, -2);
var dr = 2.0 * Math.PI/180.0;
var near = 10;
var far = -10;
var radius = 6.0;
var theta  = 0.0;
var phi = 0.0;
var dr = Math.PI/180.0;
var count = 0;

const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

var left = -2.0;
var right = 2.0;
var ytop = 2.0;
var bottom = -2.0;

var modeViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

var normalMatrix, normalMatrixLoc; //法向量矩阵，法向量矩阵位置
var viewIndex = 0;

// 设置光照和明暗，注意考虑多个对象的构建
var lightPosition = vec4(0.0, 0.0, 4.0, 1.0 ); //光源位置
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 ); //光源环境光
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 ); //光源漫反射
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 ); //光源镜面反射

var materialAmbient = vec4( 1.0, 0.0, 1.0, 0.0 ); //材料环境光
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0 ); //材料漫反射
var materialSpecular = vec4( 1.0, 0.8, 0.0, 1.0 ); //材料镜面反射
var materialShininess = 100.0; //反光度，越小越反光变白

var ambientColor, diffuseColor, specularColor; //环境光颜色，漫反射颜色，镜面反射颜色


//黑色小电视
var points=[];
//var colors=[];
var normalsArray = []; // 法向量数组
var vColor, vPosition;
var cBuffer, vBuffer; // 黑色小电视的buffer
var numVertices = 36*9 + ms*3*2*3 + 12; // 黑色小电视顶点个数
var modelViewMatrix = mat4(); // 当前变换矩阵
var modelViewMatrixLoc; // shader变量
var CubeTx = 0, CubeTy = 0, CubeTz = 0; //黑色小电视平移量
var CubeRotateAngle = 0; //黑色小电视旋转角度
var scalePercent = 0.5; // 黑白小电视缩放比例
var direct = vec4( 0.0, 0.0, 1.0, 1.0 ); // 黑白小电视当前正面方向

// 粉色小电视
var points2 = []; // 顶点容器
//var colors2 = []; // 颜色容器
var normalsArray2 = []; // 法向量数组
var vColor2, vPosition2;
var cBuffer2, vBuffer2; // 粉色小电视的buffer
var numVertices2 = 36*9 + ms*3*2*3 + 12; // 粉色小电视顶点个数
var CubeTx2 = 0, CubeTy2 = 0, CubeTz2 = 0; // 粉色小电视平移量
var CubeRotateAngle2 = 0; // 粉色小电视旋转角度
var scalePercent2 = 0.5; // 缩放比例
var direct2 = vec4( 0.0, 0.0, 1.0, 1.0 ); // 粉色小电视当前正面方向

// 啤酒
var points3 = []; // 顶点容器
//var colors3 = []; // 颜色容器
var normalsArray3 = []; // 法向量数组
var vColor3, vPosition3;
var cBuffer3, vBuffer3; 
var vNormal3, nBuffer3; 
var numVertices3 = 36*9 + ms*3*2*3 + 12; // 啤酒顶点个数
var CubeTx3 = 0, CubeTy3 = 0, CubeTz3 = 0; // 啤酒平移量
var CubeRotateAngle3 = 0; // 啤酒旋转角度
var scalePercent3 = 0.5; // 缩放比例
var direct3 = vec4( 0.0, 0.0, 1.0, 1.0 ); // 啤酒当前正面方向

//光源
var points4=[];
var normalsArray4=[];
var cBuffer4,vBuffer4;
var vNormal4,nBuffer4;
var numVertices4=36;
var vPosition4;
var CubeTx4=lightPosition[0],CubeTy4=lightPosition[1],CubeTz4=lightPosition[2];
var scalePercent4=1;
var CubeRotateAngle4=0;



// 所有的备选颜色
var chooseColors = [
	
	//小电视六个不同色度的灰色用以区别不同面
    vec4(0.0, 0.0, 0.0, 0.02), // 正面灰色
	vec4(0.0, 0.0, 0.0, 0.12), // 左面灰色
	vec4(0.0, 0.0, 0.0, 0.15), // 后面灰色
	vec4(0.0, 0.0, 0.0, 0.17),// 右面灰色
	vec4(0.0, 0.0, 0.0, 0.2), // 上面灰色
	vec4(0.0, 0.0, 0.0, 0.3), // 下面灰色
	
    vec4(0.0, 0.0, 0.0, 1.0), // 黑色
    vec4(1.0, 1.0, 1.0, 1.0), //白色
    vec4(0.925, 0.478, 0.62, 0.9), // 正面粉色
	vec4(0.925, 0.478, 0.62, 0.95), // 后面粉色
	vec4(0.925, 0.478, 0.62, 0.925), // 左面粉色
	vec4(0.925, 0.478, 0.62, 0.97), // 右面粉色
	vec4(0.925, 0.478, 0.62, 0.975), // 上面粉色
	vec4(0.925, 0.478, 0.62, 0.99), // 下面粉色
	
	vec4(1.0,0.757,0.145,0.9),//啤酒黄 255 193 37
	vec4(1.0,1.0,0.878,1.0),//啤酒花
	vec4(0.855,0.647,0.125,1.0),//深黄杯壁 218 165 32
	
];



function setPoints(){
	//光源
	drawLight(points4,normalsArray4);
	
	//黑白/粉色小电视
	drawBody(points,normalsArray);
	drawBody2(points2,normalsArray2);
	
	// 上面的黑杠杠/白杠杠
	drawUpBar(points,normalsArray);
	drawUpBar2(points2,normalsArray2);
	
	// 下面的黑杠杠/白杠杠
	drawDownBar(points,normalsArray);
	drawDownBar2(points2,normalsArray2);
	
	// 左面的黑杠杠
	drawLeftBar(points,normalsArray);
	drawLeftBar2(points2,normalsArray2);
	
	// 右面的黑杠杠
	drawRightBar(points,normalsArray);
	drawRightBar2(points2,normalsArray2);
	
	// 左眼
	drawLeftEye(points,normalsArray);
	drawLeftEye2(points2,normalsArray2);
	
	// 右眼
	drawRightEye(points,normalsArray);
	drawRightEye2(points2,normalsArray2);
	
	// 嘴嘴上面的杠杠
	drawupMouth(points,normalsArray);
	drawupMouth2(points2,normalsArray2);
	
	// 左天线
	drawLeftAntenna(points,normalsArray);
	drawLeftAntenna2(points2,normalsArray2);
	
	// 右天线
	drawRightAntenna(points,normalsArray);
	drawRightAntenna2(points2,normalsArray2);	
	
	// 左脚脚
	drawLeftFoot(points,normalsArray);
	drawLeftFoot2(points2,normalsArray2);
	
	// 右脚脚
	drawRightFoot(points,normalsArray);
	drawRightFoot2(points2,normalsArray2);
	
	//啤酒本体
	drawBeer(0,1,2,3,14); 
	drawBeer(0,3,7,4,14); 
	drawBeer(4,5,6,7,14);	
	drawBeer(1,5,6,2,14);  
	drawBeer(0,4,5,1,14);
	drawBeer(3,7,6,2,14);
	
	//啤酒花
	drawBeerFroth(0,1,2,3,15); 
	drawBeerFroth(0,3,7,4,15); 
	drawBeerFroth(4,5,6,7,15);	
	drawBeerFroth(1,5,6,2,15);  
	drawBeerFroth(0,4,5,1,15);
	drawBeerFroth(3,7,6,2,15);
	
	//啤酒把手
	drawBeerHandle1(0,1,2,3,14); 
	drawBeerHandle1(0,3,7,4,14); 
	drawBeerHandle1(4,5,6,7,14);	
	drawBeerHandle1(1,5,6,2,14);  
	drawBeerHandle1(0,4,5,1,14);
	drawBeerHandle1(3,7,6,2,14);
	
	drawBeerHandle2(0,1,2,3,14); 
	drawBeerHandle2(0,3,7,4,14); 
	drawBeerHandle2(4,5,6,7,14);	
	drawBeerHandle2(1,5,6,2,14);  
	drawBeerHandle2(0,4,5,1,14);
	drawBeerHandle2(3,7,6,2,14);
	
	drawBeerHandle3(0,1,2,3,14); 
	drawBeerHandle3(0,3,7,4,14); 
	drawBeerHandle3(4,5,6,7,14);	
	drawBeerHandle3(1,5,6,2,14);  
	drawBeerHandle3(0,4,5,1,14);
	drawBeerHandle3(3,7,6,2,14);
	
	//啤酒壁
	drawBeerCupWall1(0,1,2,3,16); 
	drawBeerCupWall1(0,3,7,4,16); 
	drawBeerCupWall1(4,5,6,7,16);	
	drawBeerCupWall1(1,5,6,2,16);  
	drawBeerCupWall1(0,4,5,1,16);
	drawBeerCupWall1(3,7,6,2,16);
	
	drawBeerCupWall2(0,1,2,3,16); 
	drawBeerCupWall2(0,3,7,4,16); 
	drawBeerCupWall2(4,5,6,7,16);	
	drawBeerCupWall2(1,5,6,2,16);  
	drawBeerCupWall2(0,4,5,1,16);
	drawBeerCupWall2(3,7,6,2,16);

	drawBeerCupWall3(0,1,2,3,16); 
	drawBeerCupWall3(0,3,7,4,16); 
	drawBeerCupWall3(4,5,6,7,16);	
	drawBeerCupWall3(1,5,6,2,16);  
	drawBeerCupWall3(0,4,5,1,16);
	drawBeerCupWall3(3,7,6,2,16);
}

//设置法向量同时将顶点push
function quad(vertices,a,b,c,d,pointArray,normalArray){
	var t1=subtract(vertices[b],vertices[a]);
	var t2=subtract(vertices[c],vertices[b]);
	var normal=cross(t1,t2);
	normal = vec4(normal[0],normal[1],normal[2],0,0);
	
	pointArray.push(vertices[a]);
	normalArray.push(normal);
	pointArray.push(vertices[b]);
	normalArray.push(normal);
	pointArray.push(vertices[c]);
	normalArray.push(normal);
	pointArray.push(vertices[a]);
	normalArray.push(normal);
	pointArray.push(vertices[c]);
	normalArray.push(normal);
	pointArray.push(vertices[d]);
	normalArray.push(normal);
}

//光源
function drawLight(pointArray,normalArray){
	// 光源的八个顶点(x,y,z,a)
	var lightVertices = [
	    vec4(-0.01, -0.01, 0.01, 1.0),
	    vec4(-0.01, 0.01, 0.01, 1.0),
	    vec4(0.01, 0.01, 0.01, 1.0),
	    vec4(0.01, -0.01, 0.01, 1.0),
	    vec4(-0.01, -0.01, -0.01, 1.0),
	    vec4(-0.01, 0.01, -0.01, 1.0),
	    vec4(0.01, 0.01, -0.01, 1.0),
	    vec4(0.01, -0.01, -0.01, 1.0)
	];
	quad(lightVertices, 1, 0, 3, 2, pointArray, normalArray);
	quad(lightVertices, 2, 3, 7, 6, pointArray, normalArray);
	quad(lightVertices, 3, 0, 4, 7, pointArray, normalArray);
	quad(lightVertices, 6, 5, 1, 2, pointArray, normalArray);
	quad(lightVertices, 4, 5, 6, 7, pointArray, normalArray);
	quad(lightVertices, 5, 4, 0, 1, pointArray, normalArray);
}

//啤酒本体
function drawBeer(a,b,c,d,colorIndex){
	var beerVer=[
		vec4(-0.8,0.7,0.8,1.0),
		vec4(0.8,0.7,0.8,1.0),
		vec4(0.8,-1.2,0.8,1.0),
		vec4(-0.8,-1.2,0.8,1.0),
		vec4(-0.8, 0.7, -0.8,1.0),
		vec4(0.8, 0.7, -0.8,1.0),
		vec4(0.8,-1.2,-0.8,1.0),
		vec4(-0.8, -1.2, -0.8,1.0)
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points3.push(beerVer[indices[i]]);
		//colors3.push(chooseColors[colorIndex]);
		
		normalsArray3.push(beerVer[indices[i]][0],beerVer[indices[i]][1],beerVer[indices[i]][2],0.0);
	}
}

// 啤酒把手1
function drawBeerHandle1(a,b,c,d,colorIndex){
	var beerHandleVer1=[
		vec4(-1.4,0.4,0.2,1.0),
		vec4(-0.8,0.4,0.2,1.0),
		vec4(-0.8,0.2,0.2,1.0),
		vec4(-1.4,0.2,0.2,1.0),
		vec4(-1.4,0.4, -0.2,1.0),
		vec4(-0.8,0.4, -0.2,1.0),
		vec4(-0.8,0.2,-0.2,1.0),
		vec4(-1.4,0.2, -0.2,1.0)
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points3.push(beerHandleVer1[indices[i]]);
		//colors3.push(chooseColors[colorIndex]);
		// 法向量数组,这里注意！，需要帮助，需要帮助
		normalsArray3.push(beerHandleVer1[indices[i]][0],beerHandleVer1[indices[i]][1],beerHandleVer1[indices[i]][2],0.0);
	}
	
}

// 啤酒把手2
function drawBeerHandle2(a,b,c,d,colorIndex){
	var beerHandleVer3=[
		vec4(-1.4,0.4,0.2,1.0),
		vec4(-1.2,0.4,0.2,1.0),
		vec4(-1.2,-0.4,0.2,1.0),
		vec4(-1.4,-0.4,0.2,1.0),
		vec4(-1.4,0.4, -0.2,1.0),
		vec4(-1.2,0.4, -0.2,1.0),
		vec4(-1.2,-0.4,-0.2,1.0),
		vec4(-1.4,-0.4, -0.2,1.0)
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points3.push(beerHandleVer3[indices[i]]);
		//colors3.push(chooseColors[colorIndex]);
		normalsArray3.push(beerHandleVer3[indices[i]][0],beerHandleVer3[indices[i]][1],beerHandleVer3[indices[i]][2],0.0);
	}

}

// 啤酒把手3
function drawBeerHandle3(a,b,c,d,colorIndex){
	var beerHandleVer3=[
		vec4(-1.4,-0.4,0.2,1.0),
		vec4(-0.8,-0.4,0.2,1.0),
		vec4(-0.8,-0.2,0.2,1.0),
		vec4(-1.4,-0.2,0.2,1.0),
		vec4(-1.4,-0.4, -0.2,1.0),
		vec4(-0.8,-0.4, -0.2,1.0),
		vec4(-0.8,-0.2,-0.2,1.0),
		vec4(-1.4,-0.2, -0.2,1.0)
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points3.push(beerHandleVer3[indices[i]]);
		//colors3.push(chooseColors[colorIndex]);
		normalsArray3.push(beerHandleVer3[indices[i]][0],beerHandleVer3[indices[i]][1],beerHandleVer3[indices[i]][2],0.0);
	}

}

// 啤酒泡
function drawBeerFroth(a,b,c,d,colorIndex){
	var beerfrothVer=[
		vec4(-1.0,1.3,1.0,1.0),
		vec4(1.0,1.3,1.0,1.0),
		vec4(1.0,0.7,1.0,1.0),
		vec4(-1.0,0.7,1.0,1.0),
		vec4(-1.0, 1.3, -1.0,1.0),
		vec4(1.0, 1.3, -1.0,1.0),
		vec4(1.0,0.7,-1.0,1.0),
		vec4(-1.0, 0.7, -1.0,1.0)
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points3.push(beerfrothVer[indices[i]]);
		//colors3.push(chooseColors[colorIndex]);
		normalsArray3.push(beerfrothVer[indices[i]][0],beerfrothVer[indices[i]][1],beerfrothVer[indices[i]][2],0.0);
	}
}

// 杯壁1
function drawBeerCupWall1(a,b,c,d,colorIndex){
	var beerCupWall1=[
		vec4(-0.6,0.5,0.85,1.0),
		vec4(-0.4,0.5,0.85,1.0),
		vec4(-0.4,-1.0,0.85,1.0),
		vec4(-0.6,-1.0,0.85,1.0),
		vec4(-0.6, 0.5, 0.8,1.0),
		vec4(-0.4, 0.5, 0.8,1.0),
		vec4(-0.4,-1.0, 0.8,1.0),
		vec4(-0.6, -1.0, 0.8,1.0)
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points3.push(beerCupWall1[indices[i]]);
		//colors3.push(chooseColors[colorIndex]);
		normalsArray3.push(beerCupWall1[indices[i]][0],beerCupWall1[indices[i]][1],beerCupWall1[indices[i]][2],0.0);
	}
}

// 杯壁2
function drawBeerCupWall2(a,b,c,d,colorIndex){
	var beerCupWall2=[
		vec4(-0.1,0.5,0.85,1.0),
		vec4(0.1,0.5,0.85,1.0),
		vec4(0.1,-1.0,0.85,1.0),
		vec4(-0.1,-1.0,0.85,1.0),
		vec4(-0.1, 0.5, 0.8,1.0),
		vec4(0.1, 0.5, 0.8,1.0),
		vec4(0.1,-1.0, 0.8,1.0),
		vec4(-0.1, -1.0, 0.8,1.0)
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points3.push(beerCupWall2[indices[i]]);
		//colors3.push(chooseColors[colorIndex]);
		normalsArray3.push(beerCupWall2[indices[i]][0],beerCupWall2[indices[i]][1],beerCupWall2[indices[i]][2],0.0);
	}
}

// 杯壁3
function drawBeerCupWall3(a,b,c,d,colorIndex){
	var beerCupWall3=[
		vec4(0.6,0.5,0.85,1.0),
		vec4(0.4,0.5,0.85,1.0),
		vec4(0.4,-1.0,0.85,1.0),
		vec4(0.6,-1.0,0.85,1.0),
		vec4(0.6, 0.5, 0.8,1.0),
		vec4(0.4, 0.5, 0.8,1.0),
		vec4(0.4,-1.0, 0.8,1.0),
		vec4(0.6, -1.0, 0.8,1.0)
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points3.push(beerCupWall3[indices[i]]);
		//colors3.push(chooseColors[colorIndex]);
		normalsArray3.push(beerCupWall3[indices[i]][0],beerCupWall3[indices[i]][1],beerCupWall3[indices[i]][2],0.0);
	}
}

//本体
function drawBody(pointArray,normalArray){
	var bodyVer=[
		vec4(-0.32-3.5,0.3,0.2,1.0),
		vec4( 0.32-3.5,0.3,0.2,1.0),
		vec4(0.32-3.5,-0.15,0.2,1.0),
		vec4(-0.32-3.5,-0.15,0.2,1.0),
		vec4(-0.32-3.5, 0.3, -0.2,1.0),
		vec4(0.32-3.5, 0.3, -0.2,1.0),
		vec4(0.32-3.5,-0.15,-0.2,1.0),
		vec4(-0.32-3.5, -0.15, -0.2,1.0)
	];
	
	//bodyVer
	quad(bodyVer,0,1,2,3,pointArray,normalArray);
	quad(bodyVer,0,3,7,4,pointArray,normalArray);
	quad(bodyVer,4,5,6,7,pointArray,normalArray);
	quad(bodyVer,1,5,6,2,pointArray,normalArray);
	quad(bodyVer,0,4,5,1,pointArray,normalArray);
	quad(bodyVer,3,7,6,2,pointArray,normalArray);
}
function drawBody2(pointArray,normalArray){
	var bodyVer2=[
		vec4(-0.32+2.5,0.3,0.2,1.0),
		vec4( 0.32+2.5,0.3,0.2,1.0),
		vec4(0.32+2.5,-0.15,0.2,1.0),
		vec4(-0.32+2.5,-0.15,0.2,1.0),
		vec4(-0.32+2.5, 0.3, -0.2,1.0),
		vec4(0.32+2.5, 0.3, -0.2,1.0),
		vec4(0.32+2.5,-0.15,-0.2,1.0),
		vec4(-0.32+2.5, -0.15, -0.2,1.0)
	];
	//bodyVer2
	quad(bodyVer2,0,1,2,3,pointArray,normalArray);
	quad(bodyVer2,0,3,7,4,pointArray,normalArray);
	quad(bodyVer2,4,5,6,7,pointArray,normalArray);
	quad(bodyVer2,1,5,6,2,pointArray,normalArray);
	quad(bodyVer2,0,4,5,1,pointArray,normalArray);
	quad(bodyVer2,3,7,6,2,pointArray,normalArray);
}
// 上边框
function drawUpBar(pointArray,normalArray){
	var upBarVer=[
		
		vec4(-0.24-3.5,0.22,0.22,1.0),
		vec4( 0.24-3.5,0.22,0.22,1.0),
		vec4(0.24-3.5,0.20,0.22,1.0),
		vec4(-0.24-3.5,0.20,0.22,1.0),
		vec4(-0.24-3.5,0.22, 0.2,1.0),
		vec4( 0.24-3.5,0.22, 0.2,1.0),
		vec4(0.24-3.5,0.20, 0.2,1.0),
		vec4(-0.24-3.5,0.20, 0.2,1.0)
		
	];
	
	quad(upBarVer,0,1,2,3,pointArray,normalArray);
	quad(upBarVer,0,3,7,4,pointArray,normalArray);
	quad(upBarVer,4,5,6,7,pointArray,normalArray);
	quad(upBarVer,1,5,6,2,pointArray,normalArray);
	quad(upBarVer,0,4,5,1,pointArray,normalArray);
	quad(upBarVer,3,7,6,2,pointArray,normalArray);
}
function drawUpBar2(pointArray,normalArray){
	var upBarVer2=[
		
		vec4(-0.24+2.5,0.22,0.22,1.0),
		vec4( 0.24+2.5,0.22,0.22,1.0),
		vec4(0.24+2.5,0.20,0.22,1.0),
		vec4(-0.24+2.5,0.20,0.22,1.0),
		vec4(-0.24+2.5,0.22, 0.2,1.0),
		vec4( 0.24+2.5,0.22, 0.2,1.0),
		vec4(0.24+2.5,0.20, 0.2,1.0),
		vec4(-0.24+2.5,0.20, 0.2,1.0)
		
	];
	quad(upBarVer2,0,1,2,3,pointArray,normalArray);
	quad(upBarVer2,0,3,7,4,pointArray,normalArray);
	quad(upBarVer2,4,5,6,7,pointArray,normalArray);
	quad(upBarVer2,1,5,6,2,pointArray,normalArray);
	quad(upBarVer2,0,4,5,1,pointArray,normalArray);
	quad(upBarVer2,3,7,6,2,pointArray,normalArray);
}

// 下边框
function drawDownBar(pointArray,normalArray){
	var downBarVer=[
		
		vec4(-0.24-3.5,-0.07,0.22,1.0),
		vec4(-0.24-3.5,-0.05,0.22,1.0),
		vec4(0.24-3.5,-0.05,0.22,1.0),
		vec4(0.24-3.5,-0.07,0.22,1.0),
		vec4(-0.24-3.5,-0.07, 0.2,1.0),
		vec4(-0.24-3.5,-0.05, 0.2,1.0),
		vec4(0.24-3.5,-0.05, 0.2,1.0),
		vec4(0.24-3.5,-0.07, 0.2,1.0)
		
	];	
	quad(downBarVer,0,1,2,3,pointArray,normalArray);
	quad(downBarVer,0,3,7,4,pointArray,normalArray);
	quad(downBarVer,4,5,6,7,pointArray,normalArray);
	quad(downBarVer,1,5,6,2,pointArray,normalArray);
	quad(downBarVer,0,4,5,1,pointArray,normalArray);
	quad(downBarVer,3,7,6,2,pointArray,normalArray);
}
function drawDownBar2(pointArray,normalArray){
	var downBarVer2=[
		
		vec4(-0.24+2.5,-0.07,0.22,1.0),
		vec4(-0.24+2.5,-0.05,0.22,1.0),
		vec4(0.24+2.5,-0.05,0.22,1.0),
		vec4(0.24+2.5,-0.07,0.22,1.0),
		vec4(-0.24+2.5,-0.07, 0.2,1.0),
		vec4(-0.24+2.5,-0.05, 0.2,1.0),
		vec4(0.24+2.5,-0.05, 0.2,1.0),
		vec4(0.24+2.5,-0.07, 0.2,1.0)
		
	];
	quad(downBarVer2,0,1,2,3,pointArray,normalArray);
	quad(downBarVer2,0,3,7,4,pointArray,normalArray);
	quad(downBarVer2,4,5,6,7,pointArray,normalArray);
	quad(downBarVer2,1,5,6,2,pointArray,normalArray);
	quad(downBarVer2,0,4,5,1,pointArray,normalArray);
	quad(downBarVer2,3,7,6,2,pointArray,normalArray);
}

// 左边框
function drawLeftBar(pointArray,normalArray){
	var leftBarVer=[
		
		vec4(-0.24-3.5,0.22,0.22,1.0),
		vec4(-0.22-3.5,0.22,0.22,1.0),
		vec4(-0.22-3.5,-0.07,0.22,1.0),
		vec4(-0.24-3.5,-0.07,0.22,1.0),
		vec4(-0.24-3.5,0.22, 0.2,1.0),
		vec4(-0.22-3.5,0.22, 0.2,1.0),
		vec4(-0.22-3.5,-0.07, 0.2,1.0),
		vec4(-0.24-3.5,-0.07, 0.2,1.0)
		
	];

	quad(leftBarVer,0,1,2,3,pointArray,normalArray);
	quad(leftBarVer,0,3,7,4,pointArray,normalArray);
	quad(leftBarVer,4,5,6,7,pointArray,normalArray);
	quad(leftBarVer,1,5,6,2,pointArray,normalArray);
	quad(leftBarVer,0,4,5,1,pointArray,normalArray);
	quad(leftBarVer,3,7,6,2,pointArray,normalArray);
}
function drawLeftBar2(pointArray,normalArray){
	var leftBarVer2=[
		
		vec4(-0.24+2.5,0.22,0.22,1.0),
		vec4(-0.22+2.5,0.22,0.22,1.0),
		vec4(-0.22+2.5,-0.07,0.22,1.0),
		vec4(-0.24+2.5,-0.07,0.22,1.0),
		vec4(-0.24+2.5,0.22, 0.2,1.0),
		vec4(-0.22+2.5,0.22, 0.2,1.0),
		vec4(-0.22+2.5,-0.07, 0.2,1.0),
		vec4(-0.24+2.5,-0.07, 0.2,1.0)
		
	];

	quad(leftBarVer2,0,1,2,3,pointArray,normalArray);
	quad(leftBarVer2,0,3,7,4,pointArray,normalArray);
	quad(leftBarVer2,4,5,6,7,pointArray,normalArray);
	quad(leftBarVer2,1,5,6,2,pointArray,normalArray);
	quad(leftBarVer2,0,4,5,1,pointArray,normalArray);
	quad(leftBarVer2,3,7,6,2,pointArray,normalArray);
}

// 右边框
function drawRightBar(pointArray,normalArray){
	var rightBarVer=[
		
		vec4(0.24-3.5,0.22,0.22,1.0),
		vec4(0.22-3.5,0.22,0.22,1.0),
		vec4(0.22-3.5,-0.07,0.22,1.0),
		vec4(0.24-3.5,-0.07,0.22,1.0),
		vec4(0.24-3.5,0.22, 0.2,1.0),
		vec4(0.22-3.5,0.22, 0.2,1.0),
		vec4(0.22-3.5,-0.07, 0.2,1.0),
		vec4(0.24-3.5,-0.07, 0.2,1.0)
		
	];
	
	quad(rightBarVer,0,1,2,3,pointArray,normalArray);
	quad(rightBarVer,0,3,7,4,pointArray,normalArray);
	quad(rightBarVer,4,5,6,7,pointArray,normalArray);
	quad(rightBarVer,1,5,6,2,pointArray,normalArray);
	quad(rightBarVer,0,4,5,1,pointArray,normalArray);
	quad(rightBarVer,3,7,6,2,pointArray,normalArray);
}
function drawRightBar2(pointArray,normalArray){
	var rightBarVer2=[
		
		vec4(0.24+2.5,0.22,0.22,1.0),
		vec4(0.22+2.5,0.22,0.22,1.0),
		vec4(0.22+2.5,-0.07,0.22,1.0),
		vec4(0.24+2.5,-0.07,0.22,1.0),
		vec4(0.24+2.5,0.22, 0.2,1.0),
		vec4(0.22+2.5,0.22, 0.2,1.0),
		vec4(0.22+2.5,-0.07, 0.2,1.0),
		vec4(0.24+2.5,-0.07, 0.2,1.0)
		
	];
	quad(rightBarVer2,0,1,2,3,pointArray,normalArray);
	quad(rightBarVer2,0,3,7,4,pointArray,normalArray);
	quad(rightBarVer2,4,5,6,7,pointArray,normalArray);
	quad(rightBarVer2,1,5,6,2,pointArray,normalArray);
	quad(rightBarVer2,0,4,5,1,pointArray,normalArray);
	quad(rightBarVer2,3,7,6,2,pointArray,normalArray);
}


// 左眼
function drawLeftEye(pointArray,normalArray){
	var leftEyeVer=[
		
		vec4(-0.08-3.5,0.16,0.22,1.0),
		vec4(-0.06-3.5,0.14,0.22,1.0),
		vec4(-0.17-3.5,0.08,0.22,1.0),
		vec4(-0.19-3.5,0.10,0.22,1.0),
		vec4(-0.08-3.5,0.16, 0.2,1.0),
		vec4(-0.06-3.5,0.14, 0.2,1.0),
		vec4(-0.17-3.5,0.08,0.2,1.0),
		vec4(-0.19-3.5,0.10, 0.2,1.0)
	];
	
	quad(leftEyeVer,0,1,2,3,pointArray,normalArray);
	quad(leftEyeVer,0,3,7,4,pointArray,normalArray);
	quad(leftEyeVer,4,5,6,7,pointArray,normalArray);
	quad(leftEyeVer,1,5,6,2,pointArray,normalArray);
	quad(leftEyeVer,0,4,5,1,pointArray,normalArray);
	quad(leftEyeVer,3,7,6,2,pointArray,normalArray);
}
function drawLeftEye2(pointArray,normalArray){
	var leftEyeVer2=[
		
		vec4(-0.08+2.5,0.16,0.22,1.0),
		vec4(-0.06+2.5,0.14,0.22,1.0),
		vec4(-0.17+2.5,0.08,0.22,1.0),
		vec4(-0.19+2.5,0.10,0.22,1.0),
		vec4(-0.08+2.5,0.16, 0.2,1.0),
		vec4(-0.06+2.5,0.14, 0.2,1.0),
		vec4(-0.17+2.5,0.08,0.2,1.0),
		vec4(-0.19+2.5,0.10, 0.2,1.0)
	];
	quad(leftEyeVer2,0,1,2,3,pointArray,normalArray);
	quad(leftEyeVer2,0,3,7,4,pointArray,normalArray);
	quad(leftEyeVer2,4,5,6,7,pointArray,normalArray);
	quad(leftEyeVer2,1,5,6,2,pointArray,normalArray);
	quad(leftEyeVer2,0,4,5,1,pointArray,normalArray);
	quad(leftEyeVer2,3,7,6,2,pointArray,normalArray);
}


// 右眼
function drawRightEye(pointArray,normalArray){
	var rightEyeVer=[
		
		vec4(0.08-3.5,0.16,0.22,1.0),
		vec4(0.06-3.5,0.14,0.22,1.0),
		vec4(0.17-3.5,0.08,0.22,1.0),
		vec4(0.19-3.5,0.10,0.22,1.0),
		vec4(0.08-3.5,0.16, 0.2,1.0),
		vec4(0.06-3.5,0.14, 0.2,1.0),
		vec4(0.17-3.5,0.08,0.2,1.0),
		vec4(0.19-3.5,0.10, 0.2,1.0)
	];
	
	quad(rightEyeVer,0,1,2,3,pointArray,normalArray);
	quad(rightEyeVer,0,3,7,4,pointArray,normalArray);
	quad(rightEyeVer,4,5,6,7,pointArray,normalArray);
	quad(rightEyeVer,1,5,6,2,pointArray,normalArray);
	quad(rightEyeVer,0,4,5,1,pointArray,normalArray);
	quad(rightEyeVer,3,7,6,2,pointArray,normalArray);
}
function drawRightEye2(pointArray,normalArray){
	var rightEyeVer2=[
		
		vec4(0.08+2.5,0.16,0.22,1.0),
		vec4(0.06+2.5,0.14,0.22,1.0),
		vec4(0.17+2.5,0.08,0.22,1.0),
		vec4(0.19+2.5,0.10,0.22,1.0),
		vec4(0.08+2.5,0.16, 0.2,1.0),
		vec4(0.06+2.5,0.14, 0.2,1.0),
		vec4(0.17+2.5,0.08,0.2,1.0),
		vec4(0.19+2.5,0.10, 0.2,1.0)
	];
	
	quad(rightEyeVer2,0,1,2,3,pointArray,normalArray);
	quad(rightEyeVer2,0,3,7,4,pointArray,normalArray);
	quad(rightEyeVer2,4,5,6,7,pointArray,normalArray);
	quad(rightEyeVer2,1,5,6,2,pointArray,normalArray);
	quad(rightEyeVer2,0,4,5,1,pointArray,normalArray);
	quad(rightEyeVer2,3,7,6,2,pointArray,normalArray);
}


// 嘴嘴
function drawupMouth(pointArray,normalArray){
	var upMouthVer=[
		vec4(-0.05-3.5,0.02,0.22,1.0),
		vec4( 0.05-3.5,0.02,0.22,1.0),
		vec4(0.05-3.5,0.0,0.22,1.0),
		vec4(-0.05-3.5,0.0,0.22,1.0),
		vec4(-0.05-3.5,0.02, 0.2,1.0),
		vec4( 0.05-3.5,0.02, 0.2,1.0),
		vec4(0.05-3.5,0.0, 0.2,1.0),
		vec4(-0.05-3.5,0.0, 0.2,1.0)
	];
	quad(upMouthVer,0,1,2,3,pointArray,normalArray);
	quad(upMouthVer,0,3,7,4,pointArray,normalArray);
	quad(upMouthVer,4,5,6,7,pointArray,normalArray);
	quad(upMouthVer,1,5,6,2,pointArray,normalArray);
	quad(upMouthVer,0,4,5,1,pointArray,normalArray);
	quad(upMouthVer,3,7,6,2,pointArray,normalArray);
}
function drawupMouth2(pointArray,normalArray){
	var upMouthVer2=[
		
		vec4(-0.05+2.5,0.02,0.22,1.0),
		vec4( 0.05+2.5,0.02,0.22,1.0),
		vec4(0.05+2.5,0.0,0.22,1.0),
		vec4(-0.05+2.5,0.0,0.22,1.0),
		vec4(-0.05+2.5,0.02, 0.2,1.0),
		vec4( 0.05+2.5,0.02, 0.2,1.0),
		vec4(0.05+2.5,0.0, 0.2,1.0),
		vec4(-0.05+2.5,0.0, 0.2,1.0)
	];
	quad(upMouthVer2,0,1,2,3,pointArray,normalArray);
	quad(upMouthVer2,0,3,7,4,pointArray,normalArray);
	quad(upMouthVer2,4,5,6,7,pointArray,normalArray);
	quad(upMouthVer2,1,5,6,2,pointArray,normalArray);
	quad(upMouthVer2,0,4,5,1,pointArray,normalArray);
	quad(upMouthVer2,3,7,6,2,pointArray,normalArray);
}

// 左天线
function drawLeftAntenna(pointArray,normalArray){
	var leftAntennaVer=[
		
		vec4(-0.02-3.5,0.3,0.02,1.0),
		vec4(-0.04-3.5,0.3,0.02,1.0),
		vec4(-0.16-3.5,0.36,0.02,1.0),
		vec4(-0.14-3.5,0.38,0.02,1.0),
		vec4(-0.02-3.5,0.3, -0.02,1.0),
		vec4(-0.04-3.5,0.3, -0.02,1.0),
		vec4(-0.16-3.5,0.36,-0.02,1.0),
		vec4(-0.14-3.5,0.38,-0.02,1.0)
	];
	quad(leftAntennaVer,0,1,2,3,pointArray,normalArray);
	quad(leftAntennaVer,0,3,7,4,pointArray,normalArray);
	quad(leftAntennaVer,4,5,6,7,pointArray,normalArray);
	quad(leftAntennaVer,1,5,6,2,pointArray,normalArray);
	quad(leftAntennaVer,0,4,5,1,pointArray,normalArray);
	quad(leftAntennaVer,3,7,6,2,pointArray,normalArray);
}
function drawLeftAntenna2(pointArray,normalArray){
	var leftAntennaVer2=[
		
		vec4(-0.02+2.5,0.3,0.02,1.0),
		vec4(-0.04+2.5,0.3,0.02,1.0),
		vec4(-0.16+2.5,0.36,0.02,1.0),
		vec4(-0.14+2.5,0.38,0.02,1.0),
		vec4(-0.02+2.5,0.3, -0.02,1.0),
		vec4(-0.04+2.5,0.3, -0.02,1.0),
		vec4(-0.16+2.5,0.36,-0.02,1.0),
		vec4(-0.14+2.5,0.38,-0.02,1.0)
	];
	quad(leftAntennaVer2,0,1,2,3,pointArray,normalArray);
	quad(leftAntennaVer2,0,3,7,4,pointArray,normalArray);
	quad(leftAntennaVer2,4,5,6,7,pointArray,normalArray);
	quad(leftAntennaVer2,1,5,6,2,pointArray,normalArray);
	quad(leftAntennaVer2,0,4,5,1,pointArray,normalArray);
	quad(leftAntennaVer2,3,7,6,2,pointArray,normalArray);
}

// 右天线
function drawRightAntenna(pointArray,normalArray){
		var leftAntennaVer=[
		
 		vec4(0.02-3.5,0.3,0.02,1.0),
 		vec4(0.04-3.5,0.3,0.02,1.0),
 		vec4(0.16-3.5,0.4,0.02,1.0),
 		vec4(0.14-3.5,0.42,0.02,1.0),
 		vec4(0.02-3.5,0.3, -0.02,1.0),
 		vec4(0.04-3.5,0.3, -0.02,1.0),
 		vec4(0.16-3.5,0.4,-0.02,1.0),
 		vec4(0.14-3.5,0.42,-0.02,1.0)
	];
	quad(leftAntennaVer,0,1,2,3,pointArray,normalArray);
	quad(leftAntennaVer,0,3,7,4,pointArray,normalArray);
	quad(leftAntennaVer,4,5,6,7,pointArray,normalArray);
	quad(leftAntennaVer,1,5,6,2,pointArray,normalArray);
	quad(leftAntennaVer,0,4,5,1,pointArray,normalArray);
	quad(leftAntennaVer,3,7,6,2,pointArray,normalArray);
	
}
function drawRightAntenna2(pointArray,normalArray){
	var leftAntennaVer2=[
		
		vec4(0.02+2.5,0.3,0.02,1.0),
		vec4(0.04+2.5,0.3,0.02,1.0),
		vec4(0.16+2.5,0.4,0.02,1.0),
		vec4(0.14+2.5,0.42,0.02,1.0),
		vec4(0.02+2.5,0.3, -0.02,1.0),
		vec4(0.04+2.5,0.3, -0.02,1.0),
		vec4(0.16+2.5,0.4,-0.02,1.0),
		vec4(0.14+2.5,0.42,-0.02,1.0)
	];
	quad(leftAntennaVer2,0,1,2,3,pointArray,normalArray);
	quad(leftAntennaVer2,0,3,7,4,pointArray,normalArray);
	quad(leftAntennaVer2,4,5,6,7,pointArray,normalArray);
	quad(leftAntennaVer2,1,5,6,2,pointArray,normalArray);
	quad(leftAntennaVer2,0,4,5,1,pointArray,normalArray);
	quad(leftAntennaVer2,3,7,6,2,pointArray,normalArray);
}

// 左脚脚
function drawLeftFoot(pointArray,normalArray){
	var leftFootVer=[
		
		vec4(-0.18-3.5,-0.15,0.02,1.0),
		vec4(-0.16-3.5,-0.15,0.02,1.0),
		vec4(-0.16-3.5,-0.17,0.02,1.0),
		vec4(-0.18-3.5,-0.17,0.02,1.0),
		vec4(-0.18-3.5,-0.15, -0.02,1.0),
		vec4(-0.16-3.5,-0.15, -0.02,1.0),
		vec4(-0.16-3.5,-0.17,-0.02,1.0),
		vec4(-0.18-3.5,-0.17, -0.02,1.0)
	];
	quad(leftFootVer,0,1,2,3,pointArray,normalArray);
	quad(leftFootVer,0,3,7,4,pointArray,normalArray);
	quad(leftFootVer,4,5,6,7,pointArray,normalArray);
	quad(leftFootVer,1,5,6,2,pointArray,normalArray);
	quad(leftFootVer,0,4,5,1,pointArray,normalArray);
	quad(leftFootVer,3,7,6,2,pointArray,normalArray);
}
function drawLeftFoot2(pointArray,normalArray){
	var leftFootVer2=[
		
		vec4(-0.18+2.5,-0.15,0.02,1.0),
		vec4(-0.16+2.5,-0.15,0.02,1.0),
		vec4(-0.16+2.5,-0.17,0.02,1.0),
		vec4(-0.18+2.5,-0.17,0.02,1.0),
		vec4(-0.18+2.5,-0.15, -0.02,1.0),
		vec4(-0.16+2.5,-0.15, -0.02,1.0),
		vec4(-0.16+2.5,-0.17,-0.02,1.0),
		vec4(-0.18+2.5,-0.17, -0.02,1.0)
	];
	quad(leftFootVer2,0,1,2,3,pointArray,normalArray);
	quad(leftFootVer2,0,3,7,4,pointArray,normalArray);
	quad(leftFootVer2,4,5,6,7,pointArray,normalArray);
	quad(leftFootVer2,1,5,6,2,pointArray,normalArray);
	quad(leftFootVer2,0,4,5,1,pointArray,normalArray);
	quad(leftFootVer2,3,7,6,2,pointArray,normalArray);
}

// 右脚脚
function drawRightFoot(pointArray,normalArray){
	var rightFootVer=[
		
		vec4(0.18-3.5,-0.15,0.02,1.0),
		vec4(0.16-3.5,-0.15,0.02,1.0),
		vec4(0.16-3.5,-0.17,0.02,1.0),
		vec4(0.18-3.5,-0.17,0.02,1.0),
		vec4(0.18-3.5,-0.15, -0.02,1.0),
		vec4(0.16-3.5,-0.15, -0.02,1.0),
		vec4(0.16-3.5,-0.17,-0.02,1.0),
		vec4(0.18-3.5,-0.17, -0.02,1.0)
	];
	quad(rightFootVer,0,1,2,3,pointArray,normalArray);
	quad(rightFootVer,0,3,7,4,pointArray,normalArray);
	quad(rightFootVer,4,5,6,7,pointArray,normalArray);
	quad(rightFootVer,1,5,6,2,pointArray,normalArray);
	quad(rightFootVer,0,4,5,1,pointArray,normalArray);
	quad(rightFootVer,3,7,6,2,pointArray,normalArray);
}
function drawRightFoot2(pointArray,normalArray){
	var rightFootVer2=[
		
		vec4(0.18+2.5,-0.15,0.02,1.0),
		vec4(0.16+2.5,-0.15,0.02,1.0),
		vec4(0.16+2.5,-0.17,0.02,1.0),
		vec4(0.18+2.5,-0.17,0.02,1.0),
		vec4(0.18+2.5,-0.15, -0.02,1.0),
		vec4(0.16+2.5,-0.15, -0.02,1.0),
		vec4(0.16+2.5,-0.17,-0.02,1.0),
		vec4(0.18+2.5,-0.17, -0.02,1.0)
	];
	quad(rightFootVer2,0,1,2,3,pointArray,normalArray);
	quad(rightFootVer2,0,3,7,4,pointArray,normalArray);
	quad(rightFootVer2,4,5,6,7,pointArray,normalArray);
	quad(rightFootVer2,1,5,6,2,pointArray,normalArray);
	quad(rightFootVer2,0,4,5,1,pointArray,normalArray);
	quad(rightFootVer2,3,7,6,2,pointArray,normalArray);
}


function changeAngle()
{
	theta -= dr;
	count ++;
	// phi +=dr;
	if(count === 360){
		phi -=(3*dr);
		count = 0;
		// console.log(phi);
	}
	var eye = vec3( radius*Math.sin(theta)*Math.cos(phi),
	                radius*Math.sin(theta)*Math.sin(phi)+1,
	                radius*Math.cos(theta)+1);
	
	
	viewMatrix = lookAt(eye, at, up);
	gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));
}

window.onload=function init(){
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas, null );
    if (!gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.69, 0.87, 1.0, 1.0 ); //背景颜色
    gl.enable(gl.DEPTH_TEST); // 消除隐藏面

    // 初始化着色器
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	setPoints(); // 设置两个模型所有顶点位置及颜色
	
	// 设置默认的照相机方向
	// 获取viewMatrix变量的存储地址
	viewMatrixLoc = gl.getUniformLocation(program, 'viewMatrix');
	// 设置视点方向、视线方向和上方向
	viewMatrix = lookAt(vec3(0, 0, 0), vec3(0, 0, 0), vec3(0, 1, 0));
	// 将视图矩阵传递给viewMatrix变量
	gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));
	
	//设置材质
	var ambientProduct = mult(lightAmbient, materialAmbient); // 环境光点乘
	var diffuseProduct = mult(lightDiffuse, materialDiffuse); // 漫反射点乘
	var specularProduct = mult(lightSpecular, materialSpecular); // 镜面反射点乘
	
	
	modelViewMatrixLoc = gl.getUniformLocation(program, 'modelViewMatrix');
	// 投影矩阵
	projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
	projectionMatrix = ortho( left, right, bottom, ytop, near, far );
	normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );// 法向量矩阵位置
	
	gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    
    // 创建缓冲区，并向缓冲区写入立方体每个面的颜色信息，明暗信息
	// 黑白小电视11111111111111111111111111
    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );
	
    vNormal = gl.getAttribLocation(program,"vNormal");
	gl.vertexAttribPointer(vNormal,4,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vNormal);
	
	vBuffer=gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,flatten(points),gl.STATIC_DRAW);
	
	vPosition=gl.getAttribLocation(program,"vPosition");
	gl.vertexAttribPointer(vPosition,4,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vPosition);
	
	//获取着色器中vColor变量，并向其传递数据
    //vColor = gl.getAttribLocation( program, "vColor" );
	//gl.enableVertexAttribArray( vColor );

	//粉白小电视2222222222222222222222222222222222
    cBuffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray2), gl.STATIC_DRAW );
    
	vNormal2 = gl.getAttribLocation(program,"vNormal");
	gl.vertexAttribPointer(vNormal2,4,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vNormal2);
	
	vBuffer2=gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer2);
	gl.bufferData(gl.ARRAY_BUFFER,flatten(points2),gl.STATIC_DRAW);
	
	vPosition2=gl.getAttribLocation(program,"vPosition");
	gl.vertexAttribPointer(vPosition2,4,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vPosition2);
	
	
	//获取着色器中vColor变量，并向其传递数据
    //vColor2 = gl.getAttribLocation( program, "vColor" );
    //gl.enableVertexAttribArray( vColor2 );

	//啤酒333333333333333333333333333333333333333
    cBuffer3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer3 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray3), gl.STATIC_DRAW );
    
	vNormal3 = gl.getAttribLocation(program,"vNormal");
	gl.vertexAttribPointer(vNormal3,4,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vNormal3);
	
	vBuffer3=gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer3);
	gl.bufferData(gl.ARRAY_BUFFER,flatten(points3),gl.STATIC_DRAW);
	
	vPosition3=gl.getAttribLocation(program,"vPosition");
	gl.vertexAttribPointer(vPosition3,4,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vPosition3);
	
	//获取着色器中vColor变量，并向其传递数据
    //vColor3 = gl.getAttribLocation( program, "vColor" );
    //gl.enableVertexAttribArray( vColor3 );
	
	//光源444444444444444444444444444444
	cBuffer4 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer4 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray4), gl.STATIC_DRAW );
    
	vNormal4= gl.getAttribLocation(program,"vNormal");
	gl.vertexAttribPointer(vNormal4,4,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vNormal4);
	
	vBuffer4=gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer4);
	gl.bufferData(gl.ARRAY_BUFFER,flatten(points4),gl.STATIC_DRAW);
	
	vPosition4=gl.getAttribLocation(program,"vPosition");
	gl.vertexAttribPointer(vPosition4,4,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vPosition4);
	
//     // 黑白小电视
//     vBuffer = gl.createBuffer();
//     gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
//     gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
// 
//     vPosition = gl.getAttribLocation( program, "vPosition" );
//     gl.enableVertexAttribArray( vPosition );
// 
// 	// 粉白小电视
//     vBuffer2 = gl.createBuffer();
//     gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer2 );
//     gl.bufferData( gl.ARRAY_BUFFER, flatten(points2), gl.STATIC_DRAW );
// 
//     vPosition2 = gl.getAttribLocation( program, "vPosition" );
//     gl.enableVertexAttribArray( vPosition2 );
// 	
// 	// 啤酒
// 	// 希望改善代码质量，将var的声明都放在函数里面。
// 	nBuffer3 = gl.createBuffer();
//     gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer3 );
//     gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray3), gl.STATIC_DRAW ); // 法向量数组
//     
// 	vNormal3 = gl.getAttribLocation( program, "vNormal"); // 顶点法线位置
// 	gl.vertexAttribPointer( vNormal3, 4, gl.FLOAT, false, 0, 0 );
// 	gl.enableVertexAttribArray( vNormal3);
// 	
// 	vBuffer3 = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer3);
//     gl.bufferData(gl.ARRAY_BUFFER, flatten(points3), gl.STATIC_DRAW); // 顶点数组
// 
//     vPosition3 = gl.getAttribLocation( program, "vPosition"); // 顶点位置
//     gl.vertexAttribPointer(vPosition3, 4, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(vPosition3);
		
	//黑白小电视
	document.getElementById("BlackForword").onclick=function(){
		CubeTx+=0.1*direct[0];
		CubeTy+=0.1*direct[1];
		CubeTz+=0.1*direct[2];
	};
	document.getElementById("BlackBack").onclick=function(){
		CubeTx-=0.1*direct[0];
		CubeTy-=0.1*direct[1];
		CubeTz-=0.1*direct[2];
	};
	document.getElementById("BlackShun").onclick=function(){
		CubeRotateAngle-=5;
	};
	document.getElementById("BlackNi").onclick=function(){
		CubeRotateAngle+=5;
	};
	document.getElementById("BlackSmall").onclick=function(){
		scalePercent-=0.05;
	};
	document.getElementById("BlackBig").onclick=function(){
		scalePercent+=0.05;
	};
	
	//粉色小电视
	document.getElementById("PinkForword").onclick=function(){
		CubeTx2+=0.1*direct[0];
		CubeTy2+=0.1*direct[1];
		CubeTz2+=0.1*direct[2];
	};
	document.getElementById("PinkBackword").onclick=function(){
		CubeTx2-=0.1*direct[0];
		CubeTy2-=0.1*direct[1];
		CubeTz2-=0.1*direct[2];
	};
	document.getElementById("PinkShun").onclick=function(){
		CubeRotateAngle2-=5;
	};
	document.getElementById("PinkNi").onclick=function(){
		CubeRotateAngle2+=5;
	};
	document.getElementById("PinkSmall").onclick=function(){
		scalePercent2-=0.05;
	};
	document.getElementById("PinkBig").onclick=function(){
		scalePercent2+=0.05;
	};	



	  document.getElementById("adjustView").onclick = function() {

		if (viewIndex === 0) {
		    viewIndex = 1;
			theta = 0;
			phi = 0;
		} else if (viewIndex === 1) {
		    viewIndex = 0;
		    // 设置视点、视线和上方向
			viewMatrix = lookAt(eye, at, up);
		    // 将视图矩阵传递给viewMatrix变量
		    gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));
			
		}
    };
	
	document.getElementById("ViewBack").onclick=function(){
		viewMatrix = lookAt(vec3(0, 0, 0), vec3(0, 0, 0), vec3(0, 1, 0));
		// 将视图矩阵传递给viewMatrix变量
		gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));
	};
	
	document.getElementById("CircleBack").onclick=function(){
		CubeRotateAngle=0;
		CubeRotateAngle2=0;
		
	};
	//黑白小电视旋转
	document.getElementById("Circling").onclick=function(){
		if(forward === 0){
			forward = 1;
		}else if(forward === 1){
			forward = 0;
		}
	};
	
	//光源变化
	document.getElementById("lightLeft").onclick = function() {
	    lightPosition[0] -= 0.1;
	    CubeTx4 = lightPosition[0];
	};
	document.getElementById("lightRight").onclick = function() {
	    lightPosition[0] += 0.1;
	    CubeTx4 = lightPosition[0];
	};
	document.getElementById("lightFront").onclick = function() {
	    lightPosition[2] += 0.1;
	    CubeTz4 = lightPosition[2];
	};
	document.getElementById("lightBack").onclick = function() {
	    lightPosition[2] -= 0.1;
	    CubeTz4 = lightPosition[2];
	};
	document.getElementById("lightUp").onclick = function() {
	    lightPosition[1] += 0.1;
	    CubeTy4 = lightPosition[1];
	};
	document.getElementById("lightDown").onclick = function() {
	    lightPosition[1] -= 0.1;
	    CubeTy4 = lightPosition[1];
	};
	
	gl.uniform4fv( gl.getUniformLocation(program,
       "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "specularProduct"),flatten(specularProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program,
       "shininess"),materialShininess );
	   
	render();
}


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);	
	
	if(forward === 1){
		CubeRotateAngle-=0.5;
		CubeRotateAngle2 +=0.7;
	}
	
	if(viewIndex === 1){
		changeAngle();
	}

    // 黑色小电视变换
    var init = translate(0, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    var S = scalem(scalePercent, scalePercent, scalePercent);
    var T = translate(CubeTx, CubeTy, CubeTz);
    var R = rotateY(CubeRotateAngle);

    modelViewMatrix = mult(mult(mult(init, T), R), S);
    var m = mult(mult(T, R), S); // 用于处理正面的方向

    // 记录正面的方向
    direct = vec4( 0.0, 0.0, 1.0, 1.0 ); // 初始化初始方向
    direct = multMat4Vec4(m, direct);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

	//normalMatrix = modelViewMatrix;
	normalMatrix = [
 		vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
 		vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
 		vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
 	];
	gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix));
	
	// 黑色小电视顶点
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
	
	//设置材质
	materialAmbient=vec4( 1.0, 1.0, 0.5, 1.0 );
    materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0);
    materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
    materialShininess = 100.0;
	var ambientProduct = mult(lightAmbient, materialAmbient);
	var diffuseProduct = mult(lightDiffuse, materialDiffuse);
	var specularProduct = mult(lightSpecular, materialSpecular);
	gl.uniform4fv( gl.getUniformLocation(program,
	    "ambientProduct"),flatten(ambientProduct) );
	gl.uniform4fv( gl.getUniformLocation(program,
	    "diffuseProduct"),flatten(diffuseProduct) );
	gl.uniform4fv( gl.getUniformLocation(program,
	    "specularProduct"),flatten(specularProduct) );
	gl.uniform4fv( gl.getUniformLocation(program,
	    "lightPosition"),flatten(lightPosition) );
	gl.uniform1f( gl.getUniformLocation(program,
	    "shininess"),materialShininess );
		
	gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer);
	gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition );
	
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
	gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vNormal);
    
    gl.drawArrays(gl.TRIANGLES, 0, numVertices);


    // 粉色小电视变换
    init = translate(0, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    S = scalem(scalePercent2, scalePercent2, scalePercent2);
    T = translate(CubeTx2, CubeTy2, CubeTz2);
    R = rotateY(CubeRotateAngle2);

    modelViewMatrix = mult(mult(mult(init, T), R), S);
    m = mult(mult(T, R), S);

    // 记录正面的方向
    direct2 = vec4( 0.0, 0.0, 1.0, 1.0 ); // 初始化初始方向
    direct2 = multMat4Vec4(m, direct2);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	
	//normalMatrix = modelViewMatrix;
	normalMatrix = [
 		vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
 		vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
 		vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
 	];
	gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix));
//     // 粉色小电视颜色
//     gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
//     gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    // 粉色小电视顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.vertexAttribPointer(vPosition2, 4, gl.FLOAT, false, 0, 0);
	
	//设置材质
	materialAmbient=vec4( 1.0, 0.0, 0.5, 1.0 );
	materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0);
	materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
	materialShininess = 100.0;
	var ambientProduct = mult(lightAmbient, materialAmbient);
	var diffuseProduct = mult(lightDiffuse, materialDiffuse);
	var specularProduct = mult(lightSpecular, materialSpecular);
	gl.uniform4fv( gl.getUniformLocation(program,
	    "ambientProduct"),flatten(ambientProduct) );
	gl.uniform4fv( gl.getUniformLocation(program,
	    "diffuseProduct"),flatten(diffuseProduct) );
	gl.uniform4fv( gl.getUniformLocation(program,
	    "specularProduct"),flatten(specularProduct) );
	gl.uniform4fv( gl.getUniformLocation(program,
	    "lightPosition"),flatten(lightPosition) );
	gl.uniform1f( gl.getUniformLocation(program,
	    "shininess"),materialShininess );
		
	gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer2);
	gl.vertexAttribPointer(vPosition2, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition2 );
	
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer2);
	gl.vertexAttribPointer( vNormal2, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vNormal2);
	
    gl.drawArrays(gl.TRIANGLES, 0, numVertices2);
	
	// 啤酒变换
    init = translate(0, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    S = scalem(scalePercent3, scalePercent3, scalePercent3);
    T = translate(CubeTx3, CubeTy3, CubeTz3);
    R = rotateY(CubeRotateAngle3);

    modelViewMatrix = mult(mult(mult(init, T), R), S);
    var m = mult(mult(T, R), S); // 用于处理正面的方向

    // 记录正面的方向
    direct3 = vec4( 0.0, 0.0, 1.0, 1.0 ); // 初始化初始方向
    direct3 = multMat4Vec4(m, direct3);
	
	//normalMatrix = modelViewMatrix;
	normalMatrix = [
 		vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
 		vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
 		vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
 	];
	gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix));
	
	// 啤酒顶点
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer3);
	gl.vertexAttribPointer(vPosition3, 4, gl.FLOAT, false, 0, 0);
	
// 	normalMatrix = [
// 		vec3(viewMatrix[0][0], viewMatrix[0][1], viewMatrix[0][2]),
// 		vec3(viewMatrix[1][0], viewMatrix[1][1], viewMatrix[1][2]),
// 		vec3(viewMatrix[2][0], viewMatrix[2][1], viewMatrix[2][2])
// 	];
// 	
//     gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
//     gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix) );
	
//     // 啤酒颜色
//     gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer3);
//     gl.vertexAttribPointer(vColor3, 4, gl.FLOAT, false, 0, 0);
		
		//设置材质
		materialAmbient=vec4( 1.0, 1.0, 0.5, 1.0 );
		materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0);
		materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
		materialShininess = 100.0;
		var ambientProduct = mult(lightAmbient, materialAmbient);
		var diffuseProduct = mult(lightDiffuse, materialDiffuse);
		var specularProduct = mult(lightSpecular, materialSpecular);
		gl.uniform4fv( gl.getUniformLocation(program,
		    "ambientProduct"),flatten(ambientProduct) );
		gl.uniform4fv( gl.getUniformLocation(program,
		    "diffuseProduct"),flatten(diffuseProduct) );
		gl.uniform4fv( gl.getUniformLocation(program,
		    "specularProduct"),flatten(specularProduct) );
		gl.uniform4fv( gl.getUniformLocation(program,
		    "lightPosition"),flatten(lightPosition) );
		gl.uniform1f( gl.getUniformLocation(program,
		    "shininess"),materialShininess );
			
		gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer3);
		gl.vertexAttribPointer(vPosition3, 4, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray( vPosition3 );
		
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer3);
		gl.vertexAttribPointer( vNormal3, 4, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vNormal3);
		
		gl.drawArrays(gl.TRIANGLES, 0, numVertices3);
		
		//光源变化
		S = scalem(scalePercent4, scalePercent4, scalePercent4);
		T = translate(CubeTx4, CubeTy4, CubeTz4);
		
		modelViewMatrix = mult(T,S);
		gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
		
		//hereeeeeeeeeeeeeeeeeeeeeeeeeeeeee
		//normalMatrix = modelViewMatrix;
		normalMatrix = [
 		vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
 		vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
 		vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
 	];
		gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix));
		
		//设置材质
		materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
		materialDiffuse = vec4( 0.0, 0.8, 0.0, 1.0);
		materialSpecular = vec4( 1.0, 1.0, 0.0, 1.0 );
		materialShininess = 20.0;
		
		ambientProduct = mult(lightAmbient, materialAmbient);
		diffuseProduct = mult(lightDiffuse, materialDiffuse);
		specularProduct = mult(lightSpecular, materialSpecular);
		gl.uniform4fv( gl.getUniformLocation(program,
		    "ambientProduct"),flatten(ambientProduct) );
		gl.uniform4fv( gl.getUniformLocation(program,
		    "diffuseProduct"),flatten(diffuseProduct) );
		gl.uniform4fv( gl.getUniformLocation(program,
		    "specularProduct"),flatten(specularProduct) );
		gl.uniform1f( gl.getUniformLocation(program,
		    "shininess"),materialShininess );
		
		gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer4);
		gl.vertexAttribPointer(vPosition4, 4, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray( vPosition4 );
		
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer4);
		gl.vertexAttribPointer( vNormal4, 4, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vNormal4);
		
		gl.drawArrays(gl.TRIANGLES, 0, numVertices4);
		

    requestAnimFrame(render);
}

// 计算矩阵作用于向量的结果，mat4 * vec4
function multMat4Vec4(mat4, vector) {
    var newVec = [];
    for (var i = 0; i < 4; i++) {
        newVec.push(mat4[i][0] * vector[0] +
            mat4[i][1] * vector[1] +
            mat4[i][2] * vector[2] +
            mat4[i][3] * vector[3]);
    }
    return newVec;
}
