var canvas;
var gl;

var ms=180;

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

var viewMatrixLoc; // 视图矩阵的存储地址
var viewMatrix; // 当前视图矩阵
var viewIndex = 0; // 视图编号

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
    vec4(0.96, 0.64, 0.66, 1.0), // 粉色

];
function setPoints(){
	
	//黑白小电视
	// 本体
	drawBody(0,1,2,3,0,points,colors);  // 正面
	drawBody(0,3,7,4,1,points,colors); 	// 左面
	drawBody(4,5,6,7,2,points,colors);	// 后面
	drawBody(1,5,6,2,3,points,colors);  // 右面
	drawBody(0,4,5,1,4,points,colors);	
	drawBody(3,7,6,2,5,points,colors);	
	
	// 上面的黑杠杠
	drawUpBar(0,1,2,3,6,points,colors); 
	drawUpBar(0,3,7,4,6,points,colors); 
	drawUpBar(4,5,6,7,6,points,colors);	
	drawUpBar(1,5,6,2,6,points,colors);  
	drawUpBar(0,4,5,1,6,points,colors);
	drawUpBar(3,7,6,2,6,points,colors);	
	
	// 下面的黑杠杠
	drawDownBar(0,1,2,3,6,points,colors); 
	drawDownBar(0,3,7,4,6,points,colors); 
	drawDownBar(4,5,6,7,6,points,colors);	
	drawDownBar(1,5,6,2,6,points,colors);  
	drawDownBar(0,4,5,1,6,points,colors);
	drawDownBar(3,7,6,2,6,points,colors);	
	
	// 左面的黑杠杠
	drawLeftBar(0,1,2,3,6,points,colors); 
	drawLeftBar(0,3,7,4,6,points,colors); 
	drawLeftBar(4,5,6,7,6,points,colors);	
	drawLeftBar(1,5,6,2,6,points,colors);  
	drawLeftBar(0,4,5,1,6,points,colors);
	drawLeftBar(3,7,6,2,6,points,colors);
	
	// 右面的黑杠杠
	drawRightBar(0,1,2,3,6,points,colors); 
	drawRightBar(0,3,7,4,6,points,colors); 
	drawRightBar(4,5,6,7,6,points,colors);	
	drawRightBar(1,5,6,2,6,points,colors);  
	drawRightBar(0,4,5,1,6,points,colors);
	drawRightBar(3,7,6,2,6,points,colors);
	
	// 左眼
	drawLeftEye(0,1,2,3,6,points,colors); 
	drawLeftEye(0,3,7,4,6,points,colors); 
	drawLeftEye(4,5,6,7,6,points,colors);	
	drawLeftEye(1,5,6,2,6,points,colors);  
	drawLeftEye(0,4,5,1,6,points,colors);
	drawLeftEye(3,7,6,2,6,points,colors);	
	
	// 右眼
	drawRightEye(0,1,2,3,6,points,colors); 
	drawRightEye(0,3,7,4,6,points,colors); 
	drawRightEye(4,5,6,7,6,points,colors);	
	drawRightEye(1,5,6,2,6,points,colors);  
	drawRightEye(0,4,5,1,6,points,colors);
	drawRightEye(3,7,6,2,6,points,colors);	
	
	// 嘴嘴上面的杠杠
	drawupMouth(0,1,2,3,6,points,colors); 
	drawupMouth(0,3,7,4,6,points,colors); 
	drawupMouth(4,5,6,7,6,points,colors);	
	drawupMouth(1,5,6,2,6,points,colors);  
	drawupMouth(0,4,5,1,6,points,colors);
	drawupMouth(3,7,6,2,6,points,colors);	
	
	// 左天线
	drawLeftAntenna(0,1,2,3,6,points,colors); 
	drawLeftAntenna(0,3,7,4,6,points,colors); 
	drawLeftAntenna(4,5,6,7,6,points,colors);	
	drawLeftAntenna(1,5,6,2,6,points,colors);  
	drawLeftAntenna(0,4,5,1,6,points,colors);
	drawLeftAntenna(3,7,6,2,6,points,colors);	
	
	// 右天线
	drawRightAntenna(0,1,2,3,6,points,colors); 
	drawRightAntenna(0,3,7,4,6,points,colors); 
	drawRightAntenna(4,5,6,7,6,points,colors);	
	drawRightAntenna(1,5,6,2,6,points,colors);  
	drawRightAntenna(0,4,5,1,6,points,colors);
	drawRightAntenna(3,7,6,2,6,points,colors);	
	
	// 左脚脚
	drawLeftFoot(0,1,2,3,6,points,colors); 
	drawLeftFoot(0,3,7,4,6,points,colors); 
	drawLeftFoot(4,5,6,7,6,points,colors);	
	drawLeftFoot(1,5,6,2,6,points,colors);  
	drawLeftFoot(0,4,5,1,6,points,colors);
	drawLeftFoot(3,7,6,2,6,points,colors);
	
	// 右脚脚
	drawRightFoot(0,1,2,3,6,points,colors); 
	drawRightFoot(0,3,7,4,6,points,colors); 
	drawRightFoot(4,5,6,7,6,points,colors);	
	drawRightFoot(1,5,6,2,6,points,colors);  
	drawRightFoot(0,4,5,1,6,points,colors);
	drawRightFoot(3,7,6,2,6,points,colors);
}

//本体
function drawBody(a,b,c,d,colorIndex,points,colors){
	var bodyVer=[
	
 		vec4(-0.32,0.3,0.2,1.0),
 		vec4( 0.32,0.3,0.2,1.0),
 		vec4(0.32,-0.15,0.2,1.0),
 		vec4(-0.32,-0.15,0.2,1.0),
 		vec4(-0.32, 0.3, -0.2,1.0),
 		vec4(0.32, 0.3, -0.2,1.0),
 		vec4(0.32,-0.15,-0.2,1.0),
 		vec4(-0.32, -0.15, -0.2,1.0)
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(bodyVer[indices[i]]);
		colors.push(chooseColors[colorIndex]);
	}
}

// 上边框
function drawUpBar(a,b,c,d,colorIndex,points,colors){
		var upBarVer=[
		
		vec4(-0.24,0.22,0.22,1.0),
 		vec4( 0.24,0.22,0.22,1.0),
 		vec4(0.24,0.20,0.22,1.0),
 		vec4(-0.24,0.20,0.22,1.0),
 		vec4(-0.24,0.22, 0.2,1.0),
 		vec4( 0.24,0.22, 0.2,1.0),
 		vec4(0.24,0.20, 0.2,1.0),
 		vec4(-0.24,0.20, 0.2,1.0)
		
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(upBarVer[indices[i]]);
		colors.push(chooseColors[colorIndex]);
	}
}

// 下边框
function drawDownBar(a,b,c,d,colorIndex,points,colors){
		var downBarVer=[
		
		vec4(-0.24,-0.07,0.22,1.0),
 		vec4(-0.24,-0.05,0.22,1.0),
 		vec4(0.24,-0.05,0.22,1.0),
 		vec4(0.24,-0.07,0.22,1.0),
 		vec4(-0.24,-0.07, 0.2,1.0),
 		vec4(-0.24,-0.05, 0.2,1.0),
 		vec4(0.24,-0.05, 0.2,1.0),
 		vec4(0.24,-0.07, 0.2,1.0)
		
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(downBarVer[indices[i]]);
		colors.push(chooseColors[colorIndex]);
	}
}

// 左边框
function drawLeftBar(a,b,c,d,colorIndex,points,colors){
		var leftBarVer=[
		
		vec4(-0.24,0.22,0.22,1.0),
 		vec4(-0.22,0.22,0.22,1.0),
 		vec4(-0.22,-0.07,0.22,1.0),
 		vec4(-0.24,-0.07,0.22,1.0),
 		vec4(-0.24,0.22, 0.2,1.0),
 		vec4(-0.22,0.22, 0.2,1.0),
 		vec4(-0.22,-0.07, 0.2,1.0),
 		vec4(-0.24,-0.07, 0.2,1.0)
		
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(leftBarVer[indices[i]]);
		colors.push(chooseColors[colorIndex]);
	}
}

// 右边框
function drawRightBar(a,b,c,d,colorIndex,points,colors){
		var rightBarVer=[
		
		vec4(0.24,0.22,0.22,1.0),
 		vec4(0.22,0.22,0.22,1.0),
 		vec4(0.22,-0.07,0.22,1.0),
 		vec4(0.24,-0.07,0.22,1.0),
 		vec4(0.24,0.22, 0.2,1.0),
 		vec4(0.22,0.22, 0.2,1.0),
 		vec4(0.22,-0.07, 0.2,1.0),
 		vec4(0.24,-0.07, 0.2,1.0)
		
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(rightBarVer[indices[i]]);
		colors.push(chooseColors[colorIndex]);
	}
}

// 左眼
function drawLeftEye(a,b,c,d,colorIndex,points,colors){
		var leftEyeVer=[
		
 		vec4(-0.08,0.16,0.22,1.0),
 		vec4(-0.06,0.14,0.22,1.0),
 		vec4(-0.17,0.08,0.22,1.0),
 		vec4(-0.19,0.10,0.22,1.0),
 		vec4(-0.08,0.16, 0.2,1.0),
 		vec4(-0.06,0.14, 0.2,1.0),
 		vec4(-0.17,0.08,0.2,1.0),
 		vec4(-0.19,0.10, 0.2,1.0)
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(leftEyeVer[indices[i]]);
		colors.push(chooseColors[colorIndex]);
	}
}

// 右眼
function drawRightEye(a,b,c,d,colorIndex,points,colors){
		var rightEyeVer=[
		
 		vec4(0.08,0.16,0.22,1.0),
 		vec4(0.06,0.14,0.22,1.0),
 		vec4(0.17,0.08,0.22,1.0),
 		vec4(0.19,0.10,0.22,1.0),
 		vec4(0.08,0.16, 0.2,1.0),
 		vec4(0.06,0.14, 0.2,1.0),
 		vec4(0.17,0.08,0.2,1.0),
 		vec4(0.19,0.10, 0.2,1.0)
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(rightEyeVer[indices[i]]);
		colors.push(chooseColors[colorIndex]);
	}
}

// 嘴嘴
function drawupMouth(a,b,c,d,colorIndex,points,colors){
		var upMouthVer=[
		
		vec4(-0.05,0.02,0.22,1.0),
 		vec4( 0.05,0.02,0.22,1.0),
 		vec4(0.05,0.0,0.22,1.0),
 		vec4(-0.05,0.0,0.22,1.0),
 		vec4(-0.05,0.02, 0.2,1.0),
 		vec4( 0.05,0.02, 0.2,1.0),
 		vec4(0.05,0.0, 0.2,1.0),
 		vec4(-0.05,0.0, 0.2,1.0)
	];
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(upMouthVer[indices[i]]);
		colors.push(chooseColors[colorIndex]);
	}
}

// 左天线
function drawLeftAntenna(a,b,c,d,colorIndex,points,colors){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(leftAntennaVer[indices[i]]);
		colors.push(chooseColors[colorIndex]);
	}
}

// 右天线
function drawRightAntenna(a,b,c,d,colorIndex,points,colors){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(leftAntennaVer[indices[i]]);
		colors.push(chooseColors[colorIndex]);
	}
}

// 左脚脚
function drawLeftFoot(a,b,c,d,colorIndex,points,colors){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(leftFootVer[indices[i]]);
		colors.push(chooseColors[colorIndex]);
	}
}

// 右脚脚
function drawRightFoot(a,b,c,d,colorIndex,points,colors){
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
	var indices=[a,b,c,a,c,d];
	for(var i=0;i<indices.length;i++){
		points.push(rightFootVer[indices[i]]);
		colors.push(chooseColors[colorIndex]);
	}
}


window.onload=function init(){
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas, null );
    if (!gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.91, 0.92, 0.93, 1.0 ); //背景颜色

    setPoints(); // 设置两个模型所有顶点位置及颜色
    gl.enable(gl.DEPTH_TEST); // 消除隐藏面

    // 初始化着色器
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

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

    modelViewMatrixLoc = gl.getUniformLocation(program, 'modelViewMatrix');

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
	
	render();
}


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // 海绵宝宝变换
    var init = translate(-0.3, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    var S = scalem(scalePercent, scalePercent, scalePercent);
    var T = translate(CubeTx, CubeTy, CubeTz);
    var R = rotateY(CubeRotateAngle);

    modelViewMatrix = mult(mult(mult(init, T), R), S);
    var m = mult(mult(T, R), S); // 用于处理正面的方向

    // 记录正面的方向
    direct = vec4( 0.0, 0.0, 1.0, 1.0 ); // 初始化初始方向
    direct = multMat4Vec4(m, direct);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    // 海绵宝宝颜色
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    // 海绵宝宝顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, numVertices);


    // 粉色海绵宝宝变换
    init = translate(0.3, 0, 0); // 初始变换矩阵，用于设置模型的初始位置
    S = scalem(scalePercent2, scalePercent2, scalePercent2);
    T = translate(CubeTx2, CubeTy2, CubeTz2);
    R = rotateY(CubeRotateAngle2);

    modelViewMatrix = mult(mult(mult(init, T), R), S);
    m = mult(mult(T, R), S);

    // 记录正面的方向
    direct2 = vec4( 0.0, 0.0, 1.0, 1.0 ); // 初始化初始方向
    direct2 = multMat4Vec4(m, direct2);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    // 粉色海绵宝宝颜色
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer2);
    gl.vertexAttribPointer(vColor2, 4, gl.FLOAT, false, 0, 0);
    // 海绵宝宝顶点
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.vertexAttribPointer(vPosition2, 4, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, numVertices2);

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
