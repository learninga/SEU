var canvas;
var gl;

var ms=180;

var forward = 0;

var dr = 2.0 * Math.PI/180.0;

var radius = 6.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = Math.PI/180.0;
var count = 0;

const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

var left = -2.0;
var right = 2.0;
var ytop = 2.0;
var bottom = -2.0;
var near = 10;
var far = -10;

var modeViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var viewIndex = 0;

//黑色小电视
var points=[];
var colors=[];

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
var colors2 = []; // 颜色容器
var vColor2, vPosition2;
var cBuffer2, vBuffer2; // 粉色小电视的buffer
var numVertices2 = 36*9 + ms*3*2*3 + 12; // 粉色小电视顶点个数
var CubeTx2 = 0, CubeTy2 = 0, CubeTz2 = 0; // 粉色小电视平移量
var CubeRotateAngle2 = 0; // 粉色小电视旋转角度
var scalePercent2 = 0.5; // 缩放比例
var direct2 = vec4( 0.0, 0.0, 1.0, 1.0 ); // 粉色小电视当前正面方向

// 啤酒
var points3 = []; // 顶点容器
var colors3 = []; // 颜色容器
var vColor3, vPosition3;
var cBuffer3, vBuffer3; // 啤酒的buffer
var numVertices3 = 36*9 + ms*3*2*3 + 12; // 啤酒顶点个数
var CubeTx3 = 0, CubeTy3 = 0, CubeTz3 = 0; // 啤酒平移量
var CubeRotateAngle3 = 0; // 啤酒旋转角度
var scalePercent3 = 0.5; // 缩放比例
var direct3 = vec4( 0.0, 0.0, 1.0, 1.0 ); // 啤酒当前正面方向


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
	
	//黑白/粉色小电视
	// 本体
	drawBody(0,1,2,3,0,8);  // 正面
	drawBody(0,3,7,4,1,10); 	// 左面
	drawBody(4,5,6,7,2,9);	// 后面
	drawBody(1,5,6,2,3,11);  // 右面
	drawBody(0,4,5,1,4,12);	
	drawBody(3,7,6,2,5,13);	
	
	// 上面的黑杠杠/白杠杠
	drawUpBar(0,1,2,3,6,7); 
	drawUpBar(0,3,7,4,6,7); 
	drawUpBar(4,5,6,7,6,7);	
	drawUpBar(1,5,6,2,6,7);  
	drawUpBar(0,4,5,1,6,7);
	drawUpBar(3,7,6,2,6,7);	
	
	// 下面的黑杠杠/白杠杠
	drawDownBar(0,1,2,3,6,7); 
	drawDownBar(0,3,7,4,6,7); 
	drawDownBar(4,5,6,7,6,7);	
	drawDownBar(1,5,6,2,6,7);  
	drawDownBar(0,4,5,1,6,7);
	drawDownBar(3,7,6,2,6,7);	
	
	// 左面的黑杠杠
	drawLeftBar(0,1,2,3,6,7); 
	drawLeftBar(0,3,7,4,6,7); 
	drawLeftBar(4,5,6,7,6,7);	
	drawLeftBar(1,5,6,2,6,7);  
	drawLeftBar(0,4,5,1,6,7);
	drawLeftBar(3,7,6,2,6,7);
	
	// 右面的黑杠杠
	drawRightBar(0,1,2,3,6,7); 
	drawRightBar(0,3,7,4,6,7); 
	drawRightBar(4,5,6,7,6,7);	
	drawRightBar(1,5,6,2,6,7);  
	drawRightBar(0,4,5,1,6,7);
	drawRightBar(3,7,6,2,6,7);
	
	// 左眼
	drawLeftEye(0,1,2,3,6,7); 
	drawLeftEye(0,3,7,4,6,7); 
	drawLeftEye(4,5,6,7,6,7);	
	drawLeftEye(1,5,6,2,6,7);  
	drawLeftEye(0,4,5,1,6,7);
	drawLeftEye(3,7,6,2,6,7);	
	
	// 右眼
	drawRightEye(0,1,2,3,6,7); 
	drawRightEye(0,3,7,4,6,7); 
	drawRightEye(4,5,6,7,6,7);	
	drawRightEye(1,5,6,2,6,7);  
	drawRightEye(0,4,5,1,6,7);
	drawRightEye(3,7,6,2,6,7);	
	
	// 嘴嘴上面的杠杠
	drawupMouth(0,1,2,3,6,7); 
	drawupMouth(0,3,7,4,6,7); 
	drawupMouth(4,5,6,7,6,7);	
	drawupMouth(1,5,6,2,6,7);  
	drawupMouth(0,4,5,1,6,7);
	drawupMouth(3,7,6,2,6,7);	
	
	// 左天线
	drawLeftAntenna(0,1,2,3,6,7); 
	drawLeftAntenna(0,3,7,4,6,7); 
	drawLeftAntenna(4,5,6,7,6,7);	
	drawLeftAntenna(1,5,6,2,6,7);  
	drawLeftAntenna(0,4,5,1,6,7);
	drawLeftAntenna(3,7,6,2,6,7);	
	
	// 右天线
	drawRightAntenna(0,1,2,3,6,7); 
	drawRightAntenna(0,3,7,4,6,7); 
	drawRightAntenna(4,5,6,7,6,7);	
	drawRightAntenna(1,5,6,2,6,7);  
	drawRightAntenna(0,4,5,1,6,7);
	drawRightAntenna(3,7,6,2,6,7);	
	
	// 左脚脚
	drawLeftFoot(0,1,2,3,6,7); 
	drawLeftFoot(0,3,7,4,6,7); 
	drawLeftFoot(4,5,6,7,6,7);	
	drawLeftFoot(1,5,6,2,6,7);  
	drawLeftFoot(0,4,5,1,6,7);
	drawLeftFoot(3,7,6,2,6,7);
	
	// 右脚脚
	drawRightFoot(0,1,2,3,6,7); 
	drawRightFoot(0,3,7,4,6,7); 
	drawRightFoot(4,5,6,7,6,7);	
	drawRightFoot(1,5,6,2,6,7);  
	drawRightFoot(0,4,5,1,6,7);
	drawRightFoot(3,7,6,2,6,7);
	
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
		colors3.push(chooseColors[colorIndex]);
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
		colors3.push(chooseColors[colorIndex]);
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
		colors3.push(chooseColors[colorIndex]);
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
		colors3.push(chooseColors[colorIndex]);
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
		colors3.push(chooseColors[colorIndex]);
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
		colors3.push(chooseColors[colorIndex]);
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
		colors3.push(chooseColors[colorIndex]);
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
		colors3.push(chooseColors[colorIndex]);
	}
}

//小电视
//本体
function drawBody(a,b,c,d,colorIndex1,colorIndex2){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(bodyVer[indices[i]]);
		colors.push(chooseColors[colorIndex1]);
		points2.push(bodyVer2[indices[i]]);
		colors2.push(chooseColors[colorIndex2]);
	}
}

// 上边框
function drawUpBar(a,b,c,d,colorIndex1,colorIndex2){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(upBarVer[indices[i]]);
		colors.push(chooseColors[colorIndex1]);
		points2.push(upBarVer2[indices[i]]);
		colors2.push(chooseColors[colorIndex2]);
	}
}

// 下边框
function drawDownBar(a,b,c,d,colorIndex1,colorIndex2){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(downBarVer[indices[i]]);
		colors.push(chooseColors[colorIndex1]);
		points2.push(downBarVer2[indices[i]]);
		colors2.push(chooseColors[colorIndex2]);
	}
}

// 左边框
function drawLeftBar(a,b,c,d,colorIndex1,colorIndex2){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(leftBarVer[indices[i]]);
		colors.push(chooseColors[colorIndex1]);
		points2.push(leftBarVer2[indices[i]]);
		colors2.push(chooseColors[colorIndex2]);
	}
}

// 右边框
function drawRightBar(a,b,c,d,colorIndex1,colorIndex2){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(rightBarVer[indices[i]]);
		colors.push(chooseColors[colorIndex1]);
		points2.push(rightBarVer2[indices[i]]);
		colors2.push(chooseColors[colorIndex2]);
	}
}

// 左眼
function drawLeftEye(a,b,c,d,colorIndex1,colorIndex2){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(leftEyeVer[indices[i]]);
		colors.push(chooseColors[colorIndex1]);
		points2.push(leftEyeVer2[indices[i]]);
		colors2.push(chooseColors[colorIndex2]);
	}
}

// 右眼
function drawRightEye(a,b,c,d,colorIndex1,colorIndex2){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(rightEyeVer[indices[i]]);
		colors.push(chooseColors[colorIndex1]);
		points2.push(rightEyeVer2[indices[i]]);
		colors2.push(chooseColors[colorIndex2]);
	}
}

// 嘴嘴
function drawupMouth(a,b,c,d,colorIndex1,colorIndex2){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(upMouthVer[indices[i]]);
		colors.push(chooseColors[colorIndex1]);
		points2.push(upMouthVer2[indices[i]]);
		colors2.push(chooseColors[colorIndex2]);
	}
}

// 左天线
function drawLeftAntenna(a,b,c,d,colorIndex1,colorIndex2){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(leftAntennaVer[indices[i]]);
		colors.push(chooseColors[colorIndex1]);
		points2.push(leftAntennaVer2[indices[i]]);
		colors2.push(chooseColors[colorIndex2]);
	}
}

// 右天线
function drawRightAntenna(a,b,c,d,colorIndex1,colorIndex2){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(leftAntennaVer[indices[i]]);
		colors.push(chooseColors[colorIndex1]);
		points2.push(leftAntennaVer2[indices[i]]);
		colors2.push(chooseColors[colorIndex2]);
	}
}

// 左脚脚
function drawLeftFoot(a,b,c,d,colorIndex1,colorIndex2){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(leftFootVer[indices[i]]);
		colors.push(chooseColors[colorIndex1]);
		points2.push(leftFootVer2[indices[i]]);
		colors2.push(chooseColors[colorIndex2]);
	}
}

// 右脚脚
function drawRightFoot(a,b,c,d,colorIndex1,colorIndex2){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(rightFootVer[indices[i]]);
		colors.push(chooseColors[colorIndex1]);
		points2.push(rightFootVer2[indices[i]]);
		colors2.push(chooseColors[colorIndex2]);
	}
}

function changeAngle()
{
	theta -= dr;
	count ++;
	if(count === 360){
		phi -=(3*dr);
		count = 0;
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

    setPoints(); // 设置两个模型所有顶点位置及颜色
    gl.enable(gl.DEPTH_TEST); // 消除隐藏面

    // 初始化着色器
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	var projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
	var projectionMatrix = ortho( left, right, bottom, ytop, near, far );
	
	gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    //设置默认的照相机方向
    // 获取viewMatrix变量的存储地址
    viewMatrixLoc = gl.getUniformLocation(program, 'viewMatrix');
    // 设置视点方向、视线方向和上方向
    viewMatrix = lookAt(vec3(0, 0, 0), vec3(0, 0, 0), vec3(0, 1, 0));
    // 将视图矩阵传递给viewMatrix变量
    gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));


    // 创建缓冲区，并向缓冲区写入立方体每个面的颜色信息
	//黑白小电视
    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    //获取着色器中vColor变量，并向其传递数据
    vColor = gl.getAttribLocation( program, "vColor" );
    gl.enableVertexAttribArray( vColor );
	
	//粉白小电视
    cBuffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors2), gl.STATIC_DRAW );
    //获取着色器中vColor变量，并向其传递数据
    vColor2 = gl.getAttribLocation( program, "vColor" );
    gl.enableVertexAttribArray( vColor2 );

	//啤酒
    cBuffer3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer3 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors3), gl.STATIC_DRAW );
    //获取着色器中vColor变量，并向其传递数据
    vColor3 = gl.getAttribLocation( program, "vColor" );
    gl.enableVertexAttribArray( vColor3 );
	
    // 创建缓冲区，并向缓冲区写入立方体的顶点信息
    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    // 获取着色器中vPosition变量，并向其传递数据
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.enableVertexAttribArray( vPosition );

    vBuffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points2), gl.STATIC_DRAW );
    // 获取着色器中vPosition变量，并向其传递数据
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
    gl.enableVertexAttribArray( vPosition2 );
	
	vBuffer3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer3 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points3), gl.STATIC_DRAW );
    // 获取着色器中vPosition变量，并向其传递数据
    vPosition3 = gl.getAttribLocation( program, "vPosition" );
    gl.enableVertexAttribArray( vPosition3 );
	

    modelViewMatrixLoc = gl.getUniformLocation(program, 'modelViewMatrix');
	  document.getElementById("adjustView").onclick = function() {
        // if (viewIndex === 0) {
        //     viewIndex = 1;
        //     // 设置视点、视线和上方向
        //     viewMatrix = lookAt(vec3(0.10, 0.15, 0.15), vec3(0, 0, 0), vec3(0, 1, 0));
        //     // 将视图矩阵传递给viewMatrix变量
        //     gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));
        // } else if (viewIndex === 1) {
        //     viewIndex = 0;
        //     // 设置视点、视线和上方向
        //     viewMatrix = lookAt(vec3(0, 0, 0), vec3(0, 0, 0), vec3(0, 1, 0));
        //     // 将视图矩阵传递给viewMatrix变量
        //     gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));
        // }
		if (viewIndex === 0) {
		    viewIndex = 1;
			theta = 0;
			phi = 0;
		} else if (viewIndex === 1) {
		    viewIndex = 0;
		    // 设置视点、视线和上方向
		    // viewMatrix = lookAt(vec3(0, 0, 0), vec3(0, 0, 0), vec3(0, 1, 0));
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
	//黑白小电视
	// document.getElementById("BlackForward").onclick=function(){
	// 	CubeTx+=0.1*direct[0];
	// 	CubeTy+=0.1*direct[1];
	// 	CubeTz+=0.1*direct[2];
	// };
	// document.getElementById("BlackBack").onclick=function(){
	// 	CubeTx-=0.1*direct[0];
	// 	CubeTy-=0.1*direct[1];
	// 	CubeTz-=0.1*direct[2];
	// };
	// document.getElementById("BlackShun").onclick=function(){
	// 	CubeRotateAngle-=5;
	// };
	// document.getElementById("BlackNi").onclick=function(){
	// 	CubeRotateAngle+=5;
	// };
	// document.getElementById("BlackSmall").onclick=function(){
	// 	scalePercent-=0.05;
	// };
	// document.getElementById("BlackBig").onclick=function(){
	// 	scalePercent+=0.05;
	// };
	
	// //粉色小电视
	// document.getElementById("PinkForword").onclick=function(){
	// 	CubeTx2+=0.1*direct[0];
	// 	CubeTy2+=0.1*direct[1];
	// 	CubeTz2+=0.1*direct[2];
	// };
	// document.getElementById("PinkBackword").onclick=function(){
	// 	CubeTx2-=0.1*direct[0];
	// 	CubeTy2-=0.1*direct[1];
	// 	CubeTz2-=0.1*direct[2];
	// };
	// document.getElementById("PinkShun").onclick=function(){
	// 	CubeRotateAngle2-=5;
	// };
	// document.getElementById("PinkNi").onclick=function(){
	// 	CubeRotateAngle2+=5;
	// };
	// document.getElementById("PinkSmall").onclick=function(){
	// 	scalePercent2-=0.05;
	// };
	// document.getElementById("PinkBig").onclick=function(){
	// 	scalePercent2+=0.05;
	// };
	
	render();
}


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// var eye = vec3( radius*Math.sin(theta)*Math.cos(phi),
	//                 radius*Math.sin(theta)*Math.sin(phi),
	//                 radius*Math.cos(theta));
	
	//forward
	// CubeTx+=0.0019*direct[0];
	// CubeTy+=0.0019*direct[1];
	// CubeTz+=0.0019*direct[2];
	
	
	if(forward === 1){
		CubeRotateAngle-=0.5;
		CubeRotateAngle2 +=0.7;
	}
	// CubeRotateAngle2+=0.1;
	if(viewIndex === 1){
		changeAngle();
	}
	
	
    // 黑色小电视变换
    var init = translate(0, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    var S = scalem(scalePercent, scalePercent, scalePercent);
    var T = translate(CubeTx, CubeTy, CubeTz);
    var R = rotateY(CubeRotateAngle);

    modelViewMatrix = mult(mult(mult(init, T), R), S);
	// modelViewMatrix = mult(mult(T, R), S);
    var m = mult(mult(T, R), S); // 用于处理正面的方向

    // 记录正面的方向
    direct = vec4( 0.0, 0.0, 1.0, 1.0 ); // 初始化初始方向
    direct = multMat4Vec4(m, direct);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    // 黑色小电视颜色
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    // 黑色小电视顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

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

    // 粉色小电视颜色
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    // 粉色小电视顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.vertexAttribPointer(vPosition2, 4, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, numVertices2);
	
	// 啤酒变换
    init = translate(0, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    S = scalem(scalePercent3, scalePercent3, scalePercent3);
    T = translate(CubeTx3, CubeTy3, CubeTz3);
    R = rotateY(CubeRotateAngle3);

    modelViewMatrix = mult(mult(mult(init, T), R), S);
	// modelViewMatrix = mult(mult(T, R), S);
    var m = mult(mult(T, R), S); // 用于处理正面的方向

    // 记录正面的方向
    direct3 = vec4( 0.0, 0.0, 1.0, 1.0 ); // 初始化初始方向
    direct3 = multMat4Vec4(m, direct3);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    // 啤酒颜色
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer3);
    gl.vertexAttribPointer(vColor3, 4, gl.FLOAT, false, 0, 0);
    // 啤酒顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer3);
    gl.vertexAttribPointer(vPosition3, 4, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, numVertices3);

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
