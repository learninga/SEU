var canvas;
var gl;
var program;
var ms = 180;

var forward = 0;
var eye;
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
var lightPosition = vec4(0.0, 0.0, 2.6, 1.0 ); //光源位置
var lightAmbient = vec4(0.3, 0.3, 0.3, 1.0 ); //光源环境光
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 ); //光源漫反射
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 ); //光源镜面反射

var materialAmbient = vec4( 1.0, 0.0, 1.0, 0.0 ); //材料环境光
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0 ); //材料漫反射
var materialSpecular = vec4( 1.0, 0.8, 0.0, 1.0 ); //材料镜面反射
var materialShininess = 100.0; //反光度，越小越反光变白

var ambientColor, diffuseColor, specularColor; //环境光颜色，漫反射颜色，镜面反射颜色

//黑色小电视
var points=[];
var normalsArray = []; // 法向量数组
var vColor, vPosition;
var cBuffer, vBuffer,tBuffer; // 黑色小电视的buffer
var numVertices = 36*5 ; // 黑色小电视顶点个数
var modelViewMatrix = mat4(); // 当前变换矩阵
var modelViewMatrixLoc; // shader变量
var CubeTx = 0, CubeTy = 0, CubeTz = 0; //黑色小电视平移量
var CubeRotateAngle = 0; //黑色小电视旋转角度
var scalePercent = 0.7; // 黑白小电视缩放比例
var direct = vec4( 0.0, 0.0, 1.0, 1.0 ); // 黑白小电视当前正面方向
var texCoordsArray = [];//纹理
var vTexCoord;


// 粉色小电视
var points2 = []; // 顶点容器
var normalsArray2 = []; // 法向量数组
var vColor2, vPosition2;
var cBuffer2, vBuffer2,tBuffer2; // 粉色小电视的buffer
var numVertices2 = 36*5; // 粉色小电视顶点个数
var CubeTx2 = 0, CubeTy2 = 0, CubeTz2 = 0; // 粉色小电视平移量
var CubeRotateAngle2 = 0; // 粉色小电视旋转角度
var scalePercent2 = 0.7; // 缩放比例
var direct2 = vec4( 0.0, 0.0, 1.0, 1.0 ); // 粉色小电视当前正面方向
var texCoordsArray2=[];//纹理
var vTexCoord2;

// 啤酒
var points3 = []; // 顶点容器
var normalsArray3 = []; // 法向量数组
var vColor3, vPosition3;
var cBuffer3, vBuffer3, tBuffer3; 
var vNormal3, nBuffer3; 
var numVertices3 = 36*5; // 啤酒顶点个数
var CubeTx3 = 0, CubeTy3 = 0, CubeTz3 = 0; // 啤酒平移量
var CubeRotateAngle3 = 0; // 啤酒旋转角度
var scalePercent3 = 0.5; // 缩放比例
var direct3 = vec4( 0.0, 0.0, 1.0, 1.0 ); // 啤酒当前正面方向
var texCoordsArray3=[];//纹理
var vTexCoord3;
var pointsArray = [];

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
var texCoordsArray4=[];
var vTexCoord4;


var texCoord = [
	vec2(0,0),
	vec2(0,1),
	vec2(1,1),
	vec2(1,0)
];

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

//凹凸纹理
var texSize = 256;
// Bump Data

var data = new Array()
    for (var i = 0; i<= texSize; i++)  data[i] = new Array();
    for (var i = 0; i<= texSize; i++) for (var j=0; j<=texSize; j++)
        data[i][j] = 0.0;
 //    for (var i = texSize/8; i<1*texSize/4; i++) for (var j = texSize/4; j<3*texSize/4; j++)
 //        data[i][j] = 1.0;
	// for (var i = 3*texSize/8; i<5*texSize/8; i++) for (var j = texSize/4; j<3*texSize/4; j++)
	//     data[i][j] = 1.0;
	// for (var i = 3*texSize/4; i<7*texSize/8; i++) for (var j = texSize/4; j<3*texSize/4; j++)
	//     data[i][j] = 1.0;
	for (var i = texSize/4; i<3*texSize/4; i++) for (var j = texSize/8; j<5*texSize/16; j++)
	   data[i][j] = 1.0;
	for (var i = texSize/4; i<3*texSize/4; i++) for (var j = 7*texSize/16; j<9*texSize/16; j++)
		data[i][j] = 1.0;
	for (var i = texSize/4; i<3*texSize/4; i++) for (var j = 11*texSize/16; j<7*texSize/8; j++)
		data[i][j] = 1.0;

// Bump Map Normals

var normalst = new Array()
    for (var i=0; i<texSize; i++)  normalst[i] = new Array();
    for (var i=0; i<texSize; i++) for ( var j = 0; j < texSize; j++)
        normalst[i][j] = new Array();
    for (var i=0; i<texSize; i++) for ( var j = 0; j < texSize; j++) {
        normalst[i][j][0] = data[i][j]-data[i+1][j];
        normalst[i][j][1] = data[i][j]-data[i][j+1];
        normalst[i][j][2] = 1;
    }

// Scale to Texture Coordinates

    for (var i=0; i<texSize; i++) for (var j=0; j<texSize; j++) {
       var d = 0;
       for(k=0;k<3;k++) d+=normalst[i][j][k]*normalst[i][j][k];
       d = Math.sqrt(d);
       for(k=0;k<3;k++) normalst[i][j][k]= 0.5*normalst[i][j][k]/d + 0.5;
    }

// Normal Texture Array

var normals = new Uint8Array(3*texSize*texSize);

    for ( var i = 0; i < texSize; i++ )
        for ( var j = 0; j < texSize; j++ )
           for(var k =0; k<3; k++)
                normals[3*texSize*i+3*j+k] = 255*normalst[i][j][k];

var imag3 = normals;

function setPoints(){
	//光源
	drawLight(points4,normalsArray4,texCoordsArray4);
	
	//黑白/粉色小电视
	drawBody(points,normalsArray,texCoordsArray);
	drawBody2(points2,normalsArray2,texCoordsArray2);
	
	// 左天线
	drawLeftAntenna(points,normalsArray,texCoordsArray);
	drawLeftAntenna2(points2,normalsArray2,texCoordsArray2);
	
	// 右天线
	drawRightAntenna(points,normalsArray,texCoordsArray);
	drawRightAntenna2(points2,normalsArray2,texCoordsArray2);	
	
	// 左脚脚
	drawLeftFoot(points,normalsArray,texCoordsArray);
	drawLeftFoot2(points2,normalsArray2,texCoordsArray2);
	
	// 右脚脚
	drawRightFoot(points,normalsArray,texCoordsArray);
	drawRightFoot2(points2,normalsArray2,texCoordsArray2);
	
	//啤酒本体
	drawBeerFront(0,3,2,1,14); 
	drawBeer(0,4,7,3,14); 
	drawBeer(4,5,6,7,14);	
	drawBeer(1,2,6,5,14);  
	drawBeer(0,1,5,4,14);
	drawBeer(3,7,6,2,14);
	
	//啤酒花
	drawBeerFroth(0,3,2,1,15); 
	drawBeerFroth(0,4,7,3,15); 
	drawBeerFroth(4,5,6,7,15);	
	drawBeerFroth(1,2,6,5,15);  
	drawBeerFroth(0,1,5,4,15);
	drawBeerFroth(3,7,6,2,15);
	
	//啤酒把手
	drawBeerHandle1(0,3,2,1,14); 
	drawBeerHandle1(0,4,7,3,14); 
	drawBeerHandle1(4,5,6,7,14);	
	drawBeerHandle1(1,2,6,5,14);  
	drawBeerHandle1(0,1,5,4,14);
	drawBeerHandle1(3,7,6,2,14);
	
	drawBeerHandle2(0,3,2,1,14); 
	drawBeerHandle2(0,4,7,3,14); 
	drawBeerHandle2(4,5,6,7,14);	
	drawBeerHandle2(1,2,6,5,14);  
	drawBeerHandle2(0,1,5,4,14);
	drawBeerHandle2(3,7,6,2,14);
	
	drawBeerHandle3(0,3,2,1,14); 
	drawBeerHandle3(0,4,7,3,14); 
	drawBeerHandle3(4,5,6,7,14);	
	drawBeerHandle3(1,2,6,5,14);  
	drawBeerHandle3(0,1,5,4,14);
	drawBeerHandle3(3,7,6,2,14);
	
	//啤酒壁
	drawBeerCupWall1(0,3,2,1,16); 
	drawBeerCupWall1(0,4,7,3,16); 
	drawBeerCupWall1(4,5,6,7,16);	
	drawBeerCupWall1(1,2,6,5,16);  
	drawBeerCupWall1(0,1,5,4,16);
	drawBeerCupWall1(3,7,6,2,16);
	
	drawBeerCupWall2(0,3,2,1,16); 
	drawBeerCupWall2(0,4,7,3,16); 
	drawBeerCupWall2(4,5,6,7,16);	
	drawBeerCupWall2(1,2,6,5,16);  
	drawBeerCupWall2(0,1,5,4,16);
	drawBeerCupWall2(3,7,6,2,16);

	drawBeerCupWall3(0,3,2,1,16); 
	drawBeerCupWall3(0,4,7,3,16); 
	drawBeerCupWall3(4,5,6,7,16);	
	drawBeerCupWall3(1,2,6,5,16);  
	drawBeerCupWall3(0,1,5,4,16);
	drawBeerCupWall3(3,7,6,2,16);
}

//设置法向量同时将顶点push
function quad(vertices,a,b,c,d,pointArray,normalArray){
	var t1=subtract(vertices[b],vertices[a]);
	var t2=subtract(vertices[c],vertices[b]);
	var normal=cross(t1,t2);
	normal = vec4(normal[0],normal[1],normal[2],0);
	
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

function quadPush(texCoordsArray){
	texCoordsArray.push(texCoord[0]);
	texCoordsArray.push(texCoord[1]);
	texCoordsArray.push(texCoord[2]);
	texCoordsArray.push(texCoord[0]);
	texCoordsArray.push(texCoord[2]);
	texCoordsArray.push(texCoord[3]);
}

function quadPushTCNULL(texCoordsArray){
	texCoordsArray.push(texCoord[0]);
	texCoordsArray.push(texCoord[0]);
	texCoordsArray.push(texCoord[0]);
	texCoordsArray.push(texCoord[0]);
	texCoordsArray.push(texCoord[0]);
	texCoordsArray.push(texCoord[0]);
}
//光源
function drawLight(pointArray,normalArray,texCoordsArray){
	// 光源的八个顶点(x,y,z,a)
	var lightVertices = [
	    vec4(-0.01, 0.01, 0.01, 1.0),
	    vec4(0.01, 0.01, 0.01, 1.0),
	    vec4(0.01, -0.01, 0.01, 1.0),
	    vec4(-0.01, -0.01, 0.01, 1.0),
	    vec4(-0.01, 0.01, -0.01, 1.0),
	    vec4(0.01, 0.01, -0.01, 1.0),
	    vec4(0.01, -0.01, -0.01, 1.0),
	    vec4(-0.01, -0.01, -0.01, 1.0)
	];
	quad(lightVertices, 0,3,2,1, pointArray, normalArray);
	quad(lightVertices, 0,4,7,3, pointArray, normalArray);
	quad(lightVertices, 4,5,6,7, pointArray, normalArray);
	quad(lightVertices, 1,2,6,5, pointArray, normalArray);
	quad(lightVertices, 0,1,5,4, pointArray, normalArray);
	quad(lightVertices, 3,7,6,2, pointArray, normalArray);
	for(var i=0;i<6;i++){
		quadPush(texCoordsArray);
	}
}

//啤酒本体
function drawBeerFront(a,b,c,d,colorIndex){
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
		normalsArray3.push(beerVer[indices[i]][0],beerVer[indices[i]][1],beerVer[indices[i]][2],0.0);
		texCoordsArray.push(texCoord[indices[i]]);
	}
}
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
		normalsArray3.push(beerVer[indices[i]][0],beerVer[indices[i]][1],beerVer[indices[i]][2],0.0);
	}
}
// function drawBeer(pointArray,normalArray,texCoordsArray){
// 	var beerVer=[
// 		vec4(-0.8,0.7,0.8,1.0),
// 		vec4(0.8,0.7,0.8,1.0),
// 		vec4(0.8,-1.2,0.8,1.0),
// 		vec4(-0.8,-1.2,0.8,1.0),
// 		vec4(-0.8, 0.7, -0.8,1.0),
// 		vec4(0.8, 0.7, -0.8,1.0),
// 		vec4(0.8,-1.2,-0.8,1.0),
// 		vec4(-0.8, -1.2, -0.8,1.0)
// 	];
// 	quad(beerVer,0,3,2,1,pointArray,normalArray);
// 	quad(beerVer,0,4,7,3,pointArray,normalArray);
// 	quad(beerVer,4,5,6,7,pointArray,normalArray);
// 	quad(beerVer,1,2,6,5,pointArray,normalArray);
// 	quad(beerVer,0,1,5,4,pointArray,normalArray);
// 	quad(beerVer,3,7,6,2,pointArray,normalArray);
// 	for(var i=0;i<6;i++){
// 		quadPushTCNULL(texCoordsArray);
// 	}
// }

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
		normalsArray3.push(beerCupWall3[indices[i]][0],beerCupWall3[indices[i]][1],beerCupWall3[indices[i]][2],0.0);
	}
}

//本体
function drawBody(pointArray,normalArray,texCoordsArray){
	var bodyVer=[
		vec4(-0.32,0.3,0.2,1.0),
		vec4( 0.32,0.3,0.2,1.0),
		vec4(0.32,-0.15,0.2,1.0),
		vec4(-0.32,-0.15,0.2,1.0),
		vec4(-0.32, 0.3, -0.2,1.0),
		vec4(0.32, 0.3, -0.2,1.0),
		vec4(0.32,-0.15,-0.2,1.0),
		vec4(-0.32, -0.15, -0.2, 1.0)
	];
	
	//bodyVer
	quad(bodyVer,0,3,2,1,pointArray,normalArray);
	quad(bodyVer,0,4,7,3,pointArray,normalArray);
	quad(bodyVer,4,5,6,7,pointArray,normalArray);
	quad(bodyVer,1,2,6,5,pointArray,normalArray);
	quad(bodyVer,0,1,5,4,pointArray,normalArray);
	quad(bodyVer,3,7,6,2,pointArray,normalArray);
	
	var texCoordBody=[
		vec2(0,0),
		vec2(0,1),
		vec2(1,1),
		vec2(1,0)
	];
	texCoordsArray.push(texCoordBody[2]);
	texCoordsArray.push(texCoordBody[3]);
	texCoordsArray.push(texCoordBody[0]);
	texCoordsArray.push(texCoordBody[2]);
	texCoordsArray.push(texCoordBody[0]);
	texCoordsArray.push(texCoordBody[1]);
	for(var i=0;i<5;i++){
		quadPushTCNULL(texCoordsArray);
	}
}
function drawBody2(pointArray,normalArray,texCoordsArray){
	var bodyVer2=[
		vec4(-0.32,0.3,0.2,1.0),
		vec4( 0.32,0.3,0.2,1.0),
		vec4(0.32,-0.15,0.2,1.0),
		vec4(-0.32,-0.15,0.2,1.0),
		vec4(-0.32, 0.3, -0.2,1.0),
		vec4(0.32, 0.3, -0.2,1.0),
		vec4(0.32,-0.15,-0.2,1.0),
		vec4(-0.32, -0.15, -0.2,1.0)
	];
	//bodyVer2
	quad(bodyVer2,0,3,2,1,pointArray,normalArray);
	quad(bodyVer2,0,4,7,3,pointArray,normalArray);
	quad(bodyVer2,4,5,6,7,pointArray,normalArray);
	quad(bodyVer2,1,2,6,5,pointArray,normalArray);
	quad(bodyVer2,0,1,5,4,pointArray,normalArray);
	quad(bodyVer2,3,7,6,2,pointArray,normalArray);
	//纹理
	var texCoordBody=[
		vec2(0,0),
		vec2(0,1),
		vec2(1,1),
		vec2(1,0)
	];
	texCoordsArray.push(texCoordBody[2]);
	texCoordsArray.push(texCoordBody[3]);
	texCoordsArray.push(texCoordBody[0]);
	texCoordsArray.push(texCoordBody[2]);
	texCoordsArray.push(texCoordBody[0]);
	texCoordsArray.push(texCoordBody[1]);
	for(var i=0;i<5;i++){
		quadPushTCNULL(texCoordsArray);
	}
}

// 左天线
function drawLeftAntenna(pointArray,normalArray,texCoordsArray){
	var leftAntennaVer=[
		
		vec4(-0.02,0.3,0.02,1.0),
		vec4(-0.04,0.3,0.02,1.0),
		vec4(-0.16,0.36,0.02,1.0),
		vec4(-0.14,0.38,0.02,1.0),
		vec4(-0.02,0.3, -0.02,1.0),
		vec4(-0.04,0.3, -0.02,1.0),
		vec4(-0.16,0.36,-0.02,1.0),
		vec4(-0.14,0.38,-0.02,1.0)
	];
	quad(leftAntennaVer,0,3,2,1,pointArray,normalArray);
	quad(leftAntennaVer,0,4,7,3,pointArray,normalArray);
	quad(leftAntennaVer,4,5,6,7,pointArray,normalArray);
	quad(leftAntennaVer,1,2,6,5,pointArray,normalArray);
	quad(leftAntennaVer,0,1,5,4,pointArray,normalArray);
	quad(leftAntennaVer,3,7,6,2,pointArray,normalArray);
	for(var i=0;i<6;i++){
		quadPushTCNULL(texCoordsArray);
	}
}
function drawLeftAntenna2(pointArray,normalArray,texCoordsArray){
	var leftAntennaVer2=[
		
		vec4(-0.02,0.3,0.02,1.0),
		vec4(-0.04,0.3,0.02,1.0),
		vec4(-0.16,0.36,0.02,1.0),
		vec4(-0.14,0.38,0.02,1.0),
		vec4(-0.02,0.3, -0.02,1.0),
		vec4(-0.04,0.3, -0.02,1.0),
		vec4(-0.16,0.36,-0.02,1.0),
		vec4(-0.14,0.38,-0.02,1.0)
	];
	quad(leftAntennaVer2,0,3,2,1,pointArray,normalArray);
	quad(leftAntennaVer2,0,4,7,3,pointArray,normalArray);
	quad(leftAntennaVer2,4,5,6,7,pointArray,normalArray);
	quad(leftAntennaVer2,1,2,6,5,pointArray,normalArray);
	quad(leftAntennaVer2,0,1,5,4,pointArray,normalArray);
	quad(leftAntennaVer2,3,7,6,2,pointArray,normalArray);
	for(var i=0;i<6;i++){
		quadPushTCNULL(texCoordsArray);
	}
}

// 右天线
function drawRightAntenna(pointArray,normalArray,texCoordsArray){
		var leftAntennaVer=[
		
 		vec4(0.02,0.3,0.02,1.0),
 		vec4(0.04,0.3,0.02,1.0),
 		vec4(0.16,0.4,0.02,1.0),
 		vec4(0.14,0.42,0.02,1.0),
 		vec4(0.02,0.3, -0.02,1.0),
 		vec4(0.04,0.3, -0.02,1.0),
 		vec4(0.16,0.4,-0.02,1.0),
 		vec4(0.14,0.42,-0.02,1.0)
	];
	quad(leftAntennaVer,0,1,2,3,pointArray,normalArray);
	quad(leftAntennaVer,0,3,7,4,pointArray,normalArray);
	quad(leftAntennaVer,4,7,6,5,pointArray,normalArray);
	quad(leftAntennaVer,1,5,6,2,pointArray,normalArray);
	quad(leftAntennaVer,0,4,5,1,pointArray,normalArray);
	quad(leftAntennaVer,3,2,6,7,pointArray,normalArray);
	for(var i=0;i<6;i++){
		quadPushTCNULL(texCoordsArray);
	}
}
function drawRightAntenna2(pointArray,normalArray,texCoordsArray){
	var leftAntennaVer2=[
		
		vec4(0.02,0.3,0.02,1.0),
		vec4(0.04,0.3,0.02,1.0),
		vec4(0.16,0.4,0.02,1.0),
		vec4(0.14,0.42,0.02,1.0),
		vec4(0.02,0.3, -0.02,1.0),
		vec4(0.04,0.3, -0.02,1.0),
		vec4(0.16,0.4,-0.02,1.0),
		vec4(0.14,0.42,-0.02,1.0)
	];
	quad(leftAntennaVer2,0,1,2,3,pointArray,normalArray);
	quad(leftAntennaVer2,0,3,7,4,pointArray,normalArray);
	quad(leftAntennaVer2,4,7,6,5,pointArray,normalArray);
	quad(leftAntennaVer2,1,5,6,2,pointArray,normalArray);
	quad(leftAntennaVer2,0,4,5,1,pointArray,normalArray);
	quad(leftAntennaVer2,3,2,6,7,pointArray,normalArray);
	for(var i=0;i<6;i++){
		quadPushTCNULL(texCoordsArray);
	}
}

// 左脚脚
function drawLeftFoot(pointArray,normalArray,texCoordsArray){
	var leftFootVer=[
		vec4(-0.18,-0.15,0.02,1.0),
		vec4(-0.16,-0.15,0.02,1.0),
		vec4(-0.16,-0.17,0.02,1.0),
		vec4(-0.18,-0.17,0.02,1.0),
		vec4(-0.18,-0.15, -0.02,1.0),
		vec4(-0.16,-0.15, -0.02,1.0),
		vec4(-0.16,-0.17,-0.02,1.0),
		vec4(-0.18,-0.17, -0.02,1.0)
	];
	quad(leftFootVer,0,3,2,1,pointArray,normalArray);
	quad(leftFootVer,0,4,7,3,pointArray,normalArray);
	quad(leftFootVer,4,5,6,7,pointArray,normalArray);
	quad(leftFootVer,1,2,6,5,pointArray,normalArray);
	quad(leftFootVer,0,1,5,4,pointArray,normalArray);
	quad(leftFootVer,3,7,6,2,pointArray,normalArray);
	for(var i=0;i<6;i++){
		quadPushTCNULL(texCoordsArray);
	}
}
function drawLeftFoot2(pointArray,normalArray,texCoordsArray){
	var leftFootVer2=[
		
		vec4(-0.18,-0.15,0.02,1.0),
		vec4(-0.16,-0.15,0.02,1.0),
		vec4(-0.16,-0.17,0.02,1.0),
		vec4(-0.18,-0.17,0.02,1.0),
		vec4(-0.18,-0.15, -0.02,1.0),
		vec4(-0.16,-0.15, -0.02,1.0),
		vec4(-0.16,-0.17,-0.02,1.0),
		vec4(-0.18,-0.17, -0.02,1.0)
	];
	quad(leftFootVer2,0,3,2,1,pointArray,normalArray);
	quad(leftFootVer2,0,4,7,3,pointArray,normalArray);
	quad(leftFootVer2,4,5,6,7,pointArray,normalArray);
	quad(leftFootVer2,1,2,6,5,pointArray,normalArray);
	quad(leftFootVer2,0,1,5,4,pointArray,normalArray);
	quad(leftFootVer2,3,7,6,2,pointArray,normalArray);
	for(var i=0;i<6;i++){
		quadPushTCNULL(texCoordsArray);
	}
}

// 右脚脚
function drawRightFoot(pointArray,normalArray,texCoordsArray){
	var rightFootVer=[
		
		vec4(0.18,-0.15,0.02,1.0),
		vec4(0.16,-0.15,0.02,1.0),
		vec4(0.16,-0.17,0.02,1.0),
		vec4(0.18,-0.17,0.02,1.0),
		vec4(0.18,-0.15, -0.02,1.0),
		vec4(0.16,-0.15, -0.02,1.0),
		vec4(0.16,-0.17,-0.02,1.0),
		vec4(0.18,-0.17, -0.02,1.0)
	];
	quad(rightFootVer,0,1,2,3,pointArray,normalArray);
	quad(rightFootVer,0,3,7,4,pointArray,normalArray);
	quad(rightFootVer,4,7,6,5,pointArray,normalArray);
	quad(rightFootVer,1,5,6,2,pointArray,normalArray);
	quad(rightFootVer,0,4,5,1,pointArray,normalArray);
	quad(rightFootVer,3,2,6,7,pointArray,normalArray);
	for(var i=0;i<6;i++){
		quadPushTCNULL(texCoordsArray);
	}
}
function drawRightFoot2(pointArray,normalArray,texCoordsArray){
	var rightFootVer2=[
		
		vec4(0.18,-0.15,0.02,1.0),
		vec4(0.16,-0.15,0.02,1.0),
		vec4(0.16,-0.17,0.02,1.0),
		vec4(0.18,-0.17,0.02,1.0),
		vec4(0.18,-0.15, -0.02,1.0),
		vec4(0.16,-0.15, -0.02,1.0),
		vec4(0.16,-0.17,-0.02,1.0),
		vec4(0.18,-0.17, -0.02,1.0)
	];
	
	quad(rightFootVer2,0,1,2,3,pointArray,normalArray);
	quad(rightFootVer2,0,3,7,4,pointArray,normalArray);
	quad(rightFootVer2,4,7,6,5,pointArray,normalArray);
	quad(rightFootVer2,1,5,6,2,pointArray,normalArray);
	quad(rightFootVer2,0,4,5,1,pointArray,normalArray);
	quad(rightFootVer2,3,2,6,7,pointArray,normalArray);
	for(var i=0;i<6;i++){
		quadPushTCNULL(texCoordsArray);
	}
}


function changeAngle(){
	theta -= dr;
	count ++;
	// phi +=dr;
	if(count === 360){
		phi -=(3*dr);
		count = 0;
		// console.log(phi);
	}
	eye = vec3( radius*Math.sin(theta)*Math.cos(phi),
	                radius*Math.sin(theta)*Math.sin(phi)+1,
	                radius*Math.cos(theta)+1);
	
	
	viewMatrix = lookAt(eye, at, up);
	gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));
}

function configureTexture0(image){
	var texture = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0);
	
	gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.uniform1i(gl.getUniformLocation(program, "texture0"), 0);
}

//粉色小电视纹理
function configureTexture2(image){
	var texture = gl.createTexture();
	gl.activeTexture(gl.TEXTURE2);
	
	gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture2"), 2);
}

function configureTexture3( image ) {
    var texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, texSize, texSize, 0, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	
	gl.uniform1i(gl.getUniformLocation(program, "texture3"), 3);
}

window.onload=function init(){
	canvas = document.getElementById( "gl-canvas" );
	
	//获取图片
	var imag0 = document.getElementById("blackTv");
	var imag2 = document.getElementById("pinkTv");
	
    gl = WebGLUtils.setupWebGL( canvas );
    if (!gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 0.0 ); //透明背景
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
	
	//纹理信息
	vPosition =gl.getAttribLocation(program,"vPosition");
	gl.vertexAttribPointer(vPosition,4,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vPosition);
	
	tBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,tBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,flatten(texCoordsArray),gl.STATIC_DRAW);
	
	vTexCoord = gl.getAttribLocation(program,"vTexCoord");
	gl.vertexAttribPointer(vTexCoord,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vTexCoord);
	
	configureTexture0(imag0);
	
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
	
	//纹理信息
	vPosition2=gl.getAttribLocation(program,"vPosition");
	gl.vertexAttribPointer(vPosition2,4,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vPosition2);
	
	tBuffer2 = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,tBuffer2);
	gl.bufferData(gl.ARRAY_BUFFER,flatten(texCoordsArray2),gl.STATIC_DRAW);
	
	vTexCoord2 = gl.getAttribLocation(program,"vTexCoord");
	gl.vertexAttribPointer(vTexCoord2,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vTexCoord2);
	
	configureTexture2(imag2);


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
	
	tBuffer3 = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,tBuffer3);
	gl.bufferData(gl.ARRAY_BUFFER,flatten(texCoordsArray3),gl.STATIC_DRAW);
	
	vTexCoord3 = gl.getAttribLocation(program,"vTexCoord");
	gl.vertexAttribPointer(vTexCoord3,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vTexCoord3);
	
	configureTexture3(imag3);
	
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
	    lightPosition[2] += 0.2;
	    CubeTz4 = lightPosition[2];
	};
	document.getElementById("lightBack").onclick = function() {
	    lightPosition[2] -= 0.2;
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
       "lightPosition"),flatten(lightPosition) );
	gl.uniform4fv( gl.getUniformLocation(program,
       "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "specularProduct"),flatten(specularProduct) );
    gl.uniform1f( gl.getUniformLocation(program,
       "shininess"),materialShininess );
	   
	render();
}


function render(){
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);	
		
	if(forward === 1){
		CubeRotateAngle-=0.5;
		CubeRotateAngle2 +=0.7;
	}
	
	if(viewIndex === 1){
		changeAngle();
	}
    // 黑色小电视变换
	var init = translate(-1.8, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    var S = scalem(scalePercent, scalePercent, scalePercent);
    var T = translate(CubeTx, CubeTy, CubeTz);
    var R = rotateY(CubeRotateAngle);

    modelViewMatrix = mult(mult(mult(init, T), R), S);
    var m = mult(mult(T, R), S); // 用于处理正面的方向

    // 记录正面的方向
    direct = vec4( 0.0, 0.0, 1.0, 1.0 ); // 初始化初始方向
    direct = multMat4Vec4(m, direct);

	//here 
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

	normalMatrix = [
 		vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
 		vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
 		vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
 	];
	gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix));
	
	gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer);
	gl.vertexAttribPointer(vPosition,4,gl.FLOAT,false,0,0);
	
	//设置材质
	materialAmbient=vec4( 1.0, 1.0, 0.5, 1.0 );
    materialDiffuse = vec4(0.98,0.5,0.44, 1.0);
    materialSpecular = vec4( 1.0, 0.1, 1.0, 1.0 );
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
    
	//纹理
	gl.bindBuffer(gl.ARRAY_BUFFER,tBuffer);
	gl.vertexAttribPointer(vTexCoord,2,gl.FLOAT,false,0,0);
	gl.uniform1i(gl.getUniformLocation(program,"bTexCoord"),0);
	gl.activeTexture(gl.TEXTURE0);
	gl.enableVertexAttribArray(vTexCoord);
	
    gl.drawArrays(gl.TRIANGLES, 0, numVertices);
	
    // 粉色小电视变换
    init = translate(1.5, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
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
    
	// 粉色小电视顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.vertexAttribPointer(vPosition2, 4, gl.FLOAT, false, 0, 0);
	//设置材质
	materialAmbient=vec4( 0.6,0.6,0.4, 1.0 );
	materialDiffuse = vec4( 0.933, 0.70, 0.133, 1.0);
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
	
	gl.bindBuffer(gl.ARRAY_BUFFER,tBuffer2);
	gl.vertexAttribPointer(vTexCoord2,2,gl.FLOAT,false,0,0);
	gl.uniform1i(gl.getUniformLocation(program,"bTexCoord"),2);
	gl.activeTexture(gl.TEXTURE2);
	gl.enableVertexAttribArray(vTexCoord2);
	
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
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	
	normalMatrix = [
 		vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
 		vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
 		vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
 	];
	gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix));
	
	// 啤酒顶点
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer3);
	gl.vertexAttribPointer(vPosition3, 4, gl.FLOAT, false, 0, 0);
		
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
	
	//纹理
	gl.bindBuffer(gl.ARRAY_BUFFER,tBuffer);
	gl.vertexAttribPointer(vTexCoord,2,gl.FLOAT,false,0,0);
	gl.uniform1i(gl.getUniformLocation(program,"bTexCoord"),3);
	gl.activeTexture(gl.TEXTURE0);
	gl.enableVertexAttribArray(vTexCoord);
	
	gl.drawArrays(gl.TRIANGLES, 0, numVertices3);
	
	//光源变化
	S = scalem(scalePercent4, scalePercent4, scalePercent4);
	T = translate(CubeTx4, CubeTy4, CubeTz4);
	
	modelViewMatrix = mult(S, T);
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	
	//hereeeeeeeeeeeeeeeeeeeeeeeeeeeeee
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
	materialShininess = 100.0;
	
	ambientProduct = mult(lightAmbient, materialAmbient);
	diffuseProduct = mult(lightDiffuse, materialDiffuse);
	specularProduct = mult(lightSpecular, materialSpecular);
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
