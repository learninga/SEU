var gl;
var eyeColor1,eyeColor2,eyeColor3,eyeColor4,eyeColor5,eyeColor6;
var VERTEX_SHADER_SOURCE =
	'attribute vec4 vPosition;\n' +
//	'attribute vec4 aColor;\n' +
////	'varying vec4 eye_Color;\n' +
	'void main() {\n' +
	//'   eye_Color=aColor;\n' +
	'   gl_Position = vPosition;\n' +
	'}\n';

// fragment shader
var FRAGMENT_SHADER_SOURCE =
	'precision mediump float;\n' +
	'uniform vec4 eye_Color;\n' +
	'void main() {\n' +
	'   gl_FragColor = eye_Color;\n' +
	'}\n';

window.onload = function() {
	var canvas = document.getElementById("canvas");
	var gl = canvas.getContext('webgl');
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	if(!initShaders(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)) {
		alert('Failed to init shaders');
	}

	//设置眼睛圆心位置
	var N = 100;
	//左右眼睛最外围的圆
	var vertexData = [-0.5, 0.0];
	var vData = [0.5, 0.0 ];
	
	//左右眼睛瞳孔
	var verData1 = [-0.5, 0.0];
	var verData2 = [0.5, 0.0];
	
	//左右眼睛蓝色部分
	var verData3 = [-0.5,0.0];
	var verData4 = [0.5,0.0];
	
	//设置眼睛最外部圆形半径大小
	var r = 0.25;
	//瞳孔半径大小
	var r1=0.05;
	var r2 = 0.1;
	
	for(var i = 0; i <= N; i++) {
		var theta = i * 2 * Math.PI / N;
		
		//左眼外围
		var x = r * Math.sin(theta)-0.5;
		var y = r * Math.cos(theta);
		vertexData.push(x, y);
		
		//右眼外围
		var x2 = r * Math.sin(theta) + 0.5;
		var y2 = r * Math.cos(theta) + 0.0;
		vData.push(x2, y2);
		
		//左眼瞳孔
		var x3= r1 * Math.sin(theta)-0.5;
		var y3 = r1 * Math.cos(theta);
		verData1.push(x3,y3);
		
		//右眼瞳孔
		var x4 = r1 * Math.sin(theta)+0.5;
		var y4 = r1 * Math.cos(theta) ;
		verData2.push(x4,y4);
		
		//左眼蓝色部分
		var x5= r2 * Math.sin(theta)-0.5;
		var y5 = r2 * Math.cos(theta);
		verData3.push(x5,y5);
		
		//右眼蓝色
		var x6 = r2 * Math.sin(theta)+0.5;
		var y6 = r2 * Math.cos(theta) ;
		verData4.push(x6,y6);
		
	}
	
	//左眼
	var vertices = new Float32Array(vertexData);
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer) {
		console.log('Failed to create buffer object');
		return -1;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	
	var a_Position = gl.getAttribLocation(gl.program, 'vPosition');
	eyeColor1=gl.getUniformLocation(gl.program,'eye_Color');
	
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
	gl.uniform4f(eyeColor1,0.0,0.0,0.0,0.0);
	
	gl.enableVertexAttribArray(a_Position);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);
	
	//右眼
	var vertices2 = new Float32Array(vData);
	var vertexBuffer2 = gl.createBuffer();
	if(!vertexBuffer2) {
		console.log('Failed to create buffer object');
		return -1;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
	gl.bufferData(gl.ARRAY_BUFFER, vertices2, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
	
	var aPosition = gl.getAttribLocation(gl.program, 'vPosition');
	eyeColor2=gl.getUniformLocation(gl.program,'eye_Color');
	
	gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
	gl.uniform4f(eyeColor2,0.0,0.0,0.0,0.0);
	
	gl.enableVertexAttribArray(aPosition);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices2.length / 2);
	
	
	//左眼蓝色
	var vertices5 = new Float32Array(verData3);
	var vertexBuffer5 = gl.createBuffer();
	if(!vertexBuffer5) {
		console.log('Failed to create buffer object');
		return -1;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer5);
	gl.bufferData(gl.ARRAY_BUFFER, vertices5, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer5);
	
	var aPosition5 = gl.getAttribLocation(gl.program, 'vPosition');
	eyeColor5=gl.getUniformLocation(gl.program,'eye_Color');
	
	gl.vertexAttribPointer(aPosition5, 2, gl.FLOAT, false, 0, 0);
	gl.uniform4f(eyeColor5,0.11,0.56,1.0,1.0);
	
	gl.enableVertexAttribArray(aPosition5);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices5.length / 2);
	
	
	//右眼蓝色
	var vertices6 = new Float32Array(verData4);
	var vertexBuffer6 = gl.createBuffer();
	if(!vertexBuffer6) {
		console.log('Failed to create buffer object');
		return -1;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer6);
	gl.bufferData(gl.ARRAY_BUFFER, vertices6, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer6);
	
	var aPosition6 = gl.getAttribLocation(gl.program, 'vPosition');
	eyeColor6=gl.getUniformLocation(gl.program,'eye_Color');
	
	gl.vertexAttribPointer(aPosition6, 2, gl.FLOAT, false, 0, 0);
	gl.uniform4f(eyeColor6,0.11,0.56,1.0,1.0);
	
	gl.enableVertexAttribArray(aPosition6);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices6.length / 2);
	
	//左眼瞳孔
	var vertices3 = new Float32Array(verData1);
	var vertexBuffer3 = gl.createBuffer();
	if(!vertexBuffer3) {
		console.log('Failed to create buffer object');
		return -1;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer3);
	gl.bufferData(gl.ARRAY_BUFFER, vertices3, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer3);
	
	var aPosition3 = gl.getAttribLocation(gl.program, 'vPosition');
	eyeColor3=gl.getUniformLocation(gl.program,'eye_Color');
	
	gl.vertexAttribPointer(aPosition3, 2, gl.FLOAT, false, 0, 0);
	gl.uniform4f(eyeColor3,0.0,0.0,0.0,1.0);
	
	gl.enableVertexAttribArray(aPosition3);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices3.length / 2);
	
	
	//右眼瞳孔
	var vertices4 = new Float32Array(verData2);
	var vertexBuffer4 = gl.createBuffer();
	if(!vertexBuffer4) {
		console.log('Failed to create buffer object');
		return -1;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer4);
	gl.bufferData(gl.ARRAY_BUFFER, vertices4, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer4);
	
	var aPosition4 = gl.getAttribLocation(gl.program, 'vPosition');
	eyeColor4=gl.getUniformLocation(gl.program,'eye_Color');
	
	gl.vertexAttribPointer(aPosition4, 2, gl.FLOAT, false, 0, 0);
	gl.uniform4f(eyeColor4,0.0,0.0,0.0,1.0);
	
	gl.enableVertexAttribArray(aPosition4);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices4.length / 2);
	

	
	
	
	
	
}