var gl;
var points;

var vPosition, vPosition2, vPosition3, vPosition4, vPosition5, vPosition6, vPosition7, vPosition8, vPosition9;
var bufferId, bufferId2, bufferId3, bufferId4, bufferId5, bufferId6, bufferId7, bufferId8, bufferId9;
var program;
var vColor, vColor2, vColor3;

var vPositionM, vPositionT1, vPositionT2, vPositionS, vPositionE1, vPositionE2, vPositionE3, vPositionE4, vPositionE5, vPositionE6;
var bufferIdM, bufferIdT1, bufferIdT2, bufferIdS, bufferIdE1, bufferIdE2, bufferIdE3, bufferIdE4, bufferIdE5, bufferIdE6;
var vColorM, vColorT, bufferIdS, bufferIdE1, bufferIdE2, bufferIdE3, bufferIdE4, bufferIdE5, bufferIdE6;

var vertices,vertices2,vertices3,vertices4,vertices5,vertices6,vertices7,vertices8,vertices9;
var verticesM,verticesT1,verticesT2,verticesS,verticesE1,verticesE2,verticesE3,verticesE4,verticesE5,verticesE6;

var verticesLashL1,verticesLashR1,verticesLashL2,verticesLashR2,verticesLashL3,verticesLashR3;
var bufferIdL1,buffIdR1,bufferIdL2,buffIdR2,bufferIdL3,buffIdR3;
var vColorL1,vColorR1,vColorL2,vColorR2,vColorL3,vColorR3;
var vPositionL1,vPositionR1,vPositionL2,vPositionR2,vPositionL3,vPositionR3;

var fvertices1,fvertices2,fvertices3,lf_vertices1,lf_vertices2,lf_vertices3;
var faceColor1,faceColor2,faceColor3,l_faceColor1,l_faceColor2,l_faceColor3;
var lfbufferId1,lfbufferId2,lfbufferId3,fbufferId1,fbufferId2,fbufferId3;
var vPositionLF1,vPositionLF2,vPositionLF3,vPositionF1,vPositionF2,vPositionF3;
var vColorLF1,vColorLF2,vColorLF3,vColorF1,vColorF2,vColorF3;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //头
    var N = 100;
    var vertexData = [0.0, 0.0];
    //设置圆的半径大小
    var r = 1.0;
    for (var i = 0; i <= N; i++) {
        var theta = i * 2 * Math.PI / N;
        var x = r * Math.sin(theta);
        var y = r * Math.cos(theta);
        vertexData.push(x, y);
    }
    vertices = new Float32Array(vertexData);	
	
	//海绵宝宝嘴部外轮廓
	verticesM = [
		vec2(0.00, -0.58),
		vec2(-0.30, -0.53),
		vec2(-0.53, -0.40),
		vec2(-0.65, -0.25),
		vec2(-0.66, -0.10),
		vec2(-0.58, -0.10),
		vec2(-0.23, -0.23),
		vec2(-0.05, -0.25),
		vec2(0.05, -0.25),
		vec2(0.23, -0.23),
		vec2(0.58, -0.10),
		vec2(0.66, -0.10),
		vec2(0.65, -0.25),
		vec2(0.53, -0.40),
		vec2(0.30,-0.53)
	];
	
	//海绵宝宝的一颗牙
	verticesT1 = [
		vec2(-0.23, -0.23),
		vec2(-0.05, -0.25),
		vec2(-0.06, -0.39),
		vec2(-0.25, -0.36)
	];
	
	//海绵宝宝的另一颗牙
	verticesT2 = [
		vec2(0.06,-0.39),
		vec2(0.05,-0.25),
		vec2(0.23,-0.23),
		vec2(0.25,-0.36)
	];
	
	//海绵宝宝的舌头
	verticesS = [
		vec2(0.00,-0.58),
		vec2(-0.30,-0.53),
		vec2(-0.27,-0.45),
		vec2(-0.16,-0.44),
		vec2(0.00,-0.52),
		vec2(0.16,-0.44),
		vec2(0.27,-0.45),
		vec2(0.30,-0.53)
	];
	
	//左腮红
	l_faceData1=[-0.55,-0.05];
    l_faceData2=[-0.50,-0.09];
    l_faceData3=[-0.6,-0.08];
	
	//右腮红
	var faceData1=[0.55,-0.05];
    var faceData2=[0.5,-0.09];
    var faceData3=[0.6,-0.08];
    
	var r1 = 0.02;
    for (var i = 0; i <= N; i++) {
        var theta = i * 2 * Math.PI / N;
        //右腮红
        var x1 = r1 * Math.sin(theta)+0.55;
        var y1 = r1 * Math.cos(theta)-0.05;
        
        var x2 = r1 * Math.sin(theta)+0.5;
        var y2 = r1 * Math.cos(theta)-0.09;
        
        var x3 = r1 * Math.sin(theta)+0.6;
        var y3 = r1 * Math.cos(theta)-0.08;
        
        //左腮红
        var x4 = r1 * Math.sin(theta)-0.55;
        var y4 = r1 * Math.cos(theta)-0.05;
        
        var x5 = r1 * Math.sin(theta)-0.50;
        var y5 = r1 * Math.cos(theta)-0.09;
        
        var x6 = r1 * Math.sin(theta)-0.6;
        var y6 = r1 * Math.cos(theta)-0.08;
        
        
        faceData1.push(x1, y1);
        faceData2.push(x2,y2);
        faceData3.push(x3,y3);
        l_faceData1.push(x4, y4);
        l_faceData2.push(x5,y5);
        l_faceData3.push(x6,y6);
    }
    fvertices1 = new Float32Array(faceData1);
    fvertices2 = new Float32Array(faceData2);
    fvertices3 = new Float32Array(faceData3);
    lf_vertices1 = new Float32Array(l_faceData1);
    lf_vertices2 = new Float32Array(l_faceData2);
    lf_vertices3 = new Float32Array(l_faceData3);
    
	
	//左睫毛们
	verticesLashL1=[
		vec2(-0.54,0.55),
		vec2(-0.38,0.22),
		vec2(),
		vec2(),
	];
	verticesLashL2 = [
		vec2(-0.29,0.64),
		vec2(-0.29,0.22),
		vec2(),
		vec2(),
		
	];
	verticesLashL3 = [
		vec2(-0.04,0.60),
		vec2(-0.23,0.22),
		vec2(),
		vec2(),
	]
	
	//右睫毛们
	verticesLashR1=[
		vec2(0.54,0.55),
		vec2(0.38,0.22),
		vec2(),
		vec2(),
	];
	verticesLashR2 = [
		vec2(0.29,0.64),
		vec2(0.29,0.22),
		vec2(),
		vec2(),
		
	];
	verticesLashR3 = [
		vec2(0.04,0.60),
		vec2(0.23,0.22),
		vec2(),
		vec2(),
		];
	
	//眼睛左
	var rE1 = 0.3;
	var vertexDataE1 = [-0.25, 0.45];
	   
	for (var i = 0; i <= N; i++) {
		var theta = i * 2 * Math.PI / N;
		var x = rE1 * Math.sin(theta)-0.25;
		var y = rE1 * Math.cos(theta)+0.15;
		vertexDataE1.push(x, y);
	}
	verticesE1 = new Float32Array(vertexDataE1);
	
	//眼睛右
	var rE2 = 0.3;
	var vertexDataE2 = [0.25, 0.45];
	   
	for (var i = 0; i <= N; i++) {
		var theta = i * 2 * Math.PI / N;
		var x = rE2 * Math.sin(theta)+0.25;
		var y = rE2 * Math.cos(theta)+0.15;
		vertexDataE2.push(x, y);
	}
	verticesE2 = new Float32Array(vertexDataE2);
	
	//眼白左
	var rE3 = 0.1;
	var vertexDataE3 = [-0.23, 0.22];
	   
	for (var i = 0; i <= N; i++) {
		var theta = i * 2 * Math.PI / N;
		var x = rE3 * Math.sin(theta)-0.23;
		var y = rE3 * Math.cos(theta)+0.12;
		vertexDataE3.push(x, y);
	}
	verticesE3 = new Float32Array(vertexDataE3);
	
	//眼白右
	var rE4 = 0.1;
	var vertexDataE4 = [0.23, 0.22];
	   
	for (var i = 0; i <= N; i++) {
		var theta = i * 2 * Math.PI / N;
		var x = rE4 * Math.sin(theta)+0.23;
		var y = rE4 * Math.cos(theta)+0.12;
		vertexDataE4.push(x, y);
	}
	verticesE4 = new Float32Array(vertexDataE4);
	
	//眼珠左
	var rE5 = 0.06;
	var vertexDataE5 = [0.23, 0.12];
	   
	for (var i = 0; i <= N; i++) {
		var theta = i * 2 * Math.PI / N;
		var x = rE5 * Math.sin(theta)+0.23;
		var y = rE5 * Math.cos(theta)+0.12;
		vertexDataE5.push(x, y);
	}
	verticesE5 = new Float32Array(vertexDataE5);
	
	//眼珠右
	var rE6 = 0.06;
	var vertexDataE6 = [-0.23, 0.12];
	   
	for (var i = 0; i <= N; i++) {
		var theta = i * 2 * Math.PI / N;
		var x = rE6 * Math.sin(theta)-0.23;
		var y = rE6 * Math.cos(theta)+0.12;
		vertexDataE6.push(x, y);
	}
	verticesE6 = new Float32Array(vertexDataE6);
	
	//鼻子
	var N2 = 100;
	//设置圆的半径大小
	var r2 = 0.13;
	var vertexData2 = [-Math.sin(Math.PI*5/6)*r2, Math.cos(Math.PI*5/6)*r2];
	   
	for (var i2 = 0; i2 <= N2-16; i2++) {
		var theta2 = i2 * 2 * Math.PI / N2;
		var x2 = r2 * Math.sin(theta2 - Math.PI*5/6);
		var y2 = r2 * Math.cos(theta2 - Math.PI*5/6);
		vertexData2.push(x2, y2);
	}
	vertices2 = new Float32Array(vertexData2);
	
	//斑点1
	var vertexData3 = [-0.7, 0.5];
	//设置圆的半径大小
	var r3 = 0.08;
	for (var i3 = 0; i3 <= N; i3++) {
	    var theta3 = i3 * 2 * Math.PI / N;
	    var x3 = r3 * Math.sin(theta3)-0.7;
	    var y3 = r3 * Math.cos(theta3)+0.5;
	    vertexData3.push(x3, y3);
	}
	vertices3 = new Float32Array(vertexData3);	
	   
	//斑点2
	var vertexData4 = [-0.8, 0.38];
	//设置圆的半径大小
	var r4 = 0.04;
	for (var i3 = 0; i3 <= N; i3++) {
	    var theta3 = i3 * 2 * Math.PI / N;
	    var x3 = r4 * Math.sin(theta3)-0.8;
	    var y3 = r4 * Math.cos(theta3)+0.38;
	    vertexData4.push(x3, y3);
	}
	vertices4 = new Float32Array(vertexData4);	
	
	//斑点3
	var vertexData5 = [-0.58, -0.58];
	//设置圆的半径大小
	var r5 = 0.13;
	for (var i = 0; i <= N; i++) {
	    var theta = i * 2 * Math.PI / N;
	    var x = r5 * Math.sin(theta)-0.58;
	    var y = r5 * Math.cos(theta)-0.58;
	    vertexData5.push(x, y);
	}
	vertices5 = new Float32Array(vertexData5);	
	
	//斑点4
	var vertexData6 = [-0.4, -0.75];
	//设置圆的半径大小
	var r6 = 0.05;
	for (var i = 0; i <= N; i++) {
	    var theta = i * 2 * Math.PI / N;
	    var x = r6 * Math.sin(theta)-0.4;
	    var y = r6 * Math.cos(theta)-0.75;
	    vertexData6.push(x, y);
	}
	vertices6 = new Float32Array(vertexData6);	
	
	//斑点5
	var vertexData7 = [0.75, 0.4];
	//设置圆的半径大小
	var r7 = 0.063;
	for (var i = 0; i <= N; i++) {
	    var theta = i * 2 * Math.PI / N;
	    var x = r7 * Math.sin(theta)+0.75;
	    var y = r7 * Math.cos(theta)+0.4;
	    vertexData7.push(x, y);
	}
	vertices7 = new Float32Array(vertexData7);	
	
	//斑点6
	var vertexData8 = [0.75, -0.4];
	//设置圆的半径大小
	var r8 = 0.12;
	for (var i = 0; i <= N; i++) {
	    var theta = i * 2 * Math.PI / N;
	    var x = r8 * Math.sin(theta)+0.75;
	    var y = r8 * Math.cos(theta)-0.4;
	    vertexData8.push(x, y);
	}
	vertices8 = new Float32Array(vertexData8);	
	
	//斑点7
	var vertexData9 = [0.62, -0.58];
	//设置圆的半径大小
	var r9 = 0.05;
	for (var i = 0; i <= N; i++) {
	    var theta = i * 2 * Math.PI / N;
	    var x = r9 * Math.sin(theta)+0.62;
	    var y = r9 * Math.cos(theta)-0.58;
	    vertexData9.push(x, y);
	}
	vertices9 = new Float32Array(vertexData9);	
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
	
    //头
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );
    
    //左腮红
    lfbufferId1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, lfbufferId1 );
    gl.bufferData( gl.ARRAY_BUFFER,lf_vertices1, gl.STATIC_DRAW );
    
    lfbufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, lfbufferId2 );
    gl.bufferData( gl.ARRAY_BUFFER,lf_vertices2, gl.STATIC_DRAW );
    
    lfbufferId3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, lfbufferId3 );
    gl.bufferData( gl.ARRAY_BUFFER,lf_vertices3, gl.STATIC_DRAW );
    
    //右腮红
    fbufferId1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fbufferId1 );
    gl.bufferData( gl.ARRAY_BUFFER,fvertices1, gl.STATIC_DRAW );
    
    fbufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fbufferId2 );
    gl.bufferData( gl.ARRAY_BUFFER,fvertices2, gl.STATIC_DRAW );
    
    fbufferId3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, fbufferId3 );
    gl.bufferData( gl.ARRAY_BUFFER,fvertices3, gl.STATIC_DRAW );
	
	//海绵宝宝的嘴
	bufferIdM = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdM );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesM), gl.STATIC_DRAW );
	
	//海绵宝宝的左牙
	bufferIdT2 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdT2 );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesT2), gl.STATIC_DRAW );
	
	//海绵宝宝的右牙
	bufferIdT1 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdT1 );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesT1), gl.STATIC_DRAW );
	
	//海绵宝宝的舌头
	bufferIdS = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdS );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesS), gl.STATIC_DRAW );

    //左睫毛们
    bufferIdL1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,bufferIdL1);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(verticesLashL1),gl.STATIC_DRAW);
    
    bufferIdL2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,bufferIdL2);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(verticesLashL2),gl.STATIC_DRAW);
    
    bufferIdL3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,bufferIdL3);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(verticesLashL3),gl.STATIC_DRAW);
    
    //右睫毛们
    bufferIdR3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,bufferIdR3);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(verticesLashR3),gl.STATIC_DRAW);
    
    bufferIdR2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,bufferIdR2);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(verticesLashR2),gl.STATIC_DRAW);
    
    bufferIdR1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,bufferIdR1);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(verticesLashR1),gl.STATIC_DRAW);
    
	//眼睛
	bufferIdE1 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE1 );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesE1), gl.STATIC_DRAW );
	
	//眼睛
	bufferIdE2 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE2 );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesE2), gl.STATIC_DRAW );
	
	//眼白
	bufferIdE3 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE3 );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesE3), gl.STATIC_DRAW );
	
	//眼白
	bufferIdE4 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE4 );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesE4), gl.STATIC_DRAW );
	
	//眼珠
	bufferIdE5 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE5 );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesE5), gl.STATIC_DRAW );
	
	//眼珠
	bufferIdE6 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE6 );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesE6), gl.STATIC_DRAW );
	
	//鼻子
    bufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.bufferData( gl.ARRAY_BUFFER,vertices2, gl.STATIC_DRAW );
    
	//斑点们
	bufferId3 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3 );
	gl.bufferData( gl.ARRAY_BUFFER,vertices3, gl.STATIC_DRAW );
	
	bufferId4 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId4 );
	gl.bufferData( gl.ARRAY_BUFFER,vertices4, gl.STATIC_DRAW );
	
	bufferId5 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId5 );
	gl.bufferData( gl.ARRAY_BUFFER,vertices5, gl.STATIC_DRAW );

	bufferId6 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId6 );
	gl.bufferData( gl.ARRAY_BUFFER,vertices6, gl.STATIC_DRAW );
	
	bufferId7 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId7 );
	gl.bufferData( gl.ARRAY_BUFFER,vertices7, gl.STATIC_DRAW );
	
	bufferId8 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId8 );
	gl.bufferData( gl.ARRAY_BUFFER,vertices8, gl.STATIC_DRAW );

	bufferId9 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId9 );
	gl.bufferData( gl.ARRAY_BUFFER,vertices9, gl.STATIC_DRAW );
	
    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
	
	//脸
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    vPosition = gl.getAttribLocation( program, "vPosition" );
	vColor = gl.getUniformLocation(program,"vColor");
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	gl.uniform4f(vColor, 1.0, 0.95, 0.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);
	
	//左腮红
	gl.bindBuffer( gl.ARRAY_BUFFER, lfbufferId1 );
    vPositionLF1 = gl.getAttribLocation( program, "vPosition" );
	vColorLF1 = gl.getUniformLocation(program,"vColor");
    gl.vertexAttribPointer( vPositionLF1, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionLF1 );
	gl.uniform4f(vColorLF1, 1.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, lf_vertices1.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, lfbufferId2 );
    vPositionLF2 = gl.getAttribLocation( program, "vPosition" );
	vColorLF2 = gl.getUniformLocation(program,"vColor");
    gl.vertexAttribPointer( vPositionLF2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionLF2 );
	gl.uniform4f(vColorLF2, 1.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, lf_vertices2.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, lfbufferId3 );
    vPositionLF3 = gl.getAttribLocation( program, "vPosition" );
	vColorLF3 = gl.getUniformLocation(program,"vColor");
    gl.vertexAttribPointer( vPositionLF3, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionLF3 );
	gl.uniform4f(vColorLF3, 1.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, lf_vertices3.length / 2);
	
	//右腮红
	gl.bindBuffer( gl.ARRAY_BUFFER, fbufferId1 );
    vPositionF1 = gl.getAttribLocation( program, "vPosition" );
	vColorF1 = gl.getUniformLocation(program,"vColor");
    gl.vertexAttribPointer( vPositionF1, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionF1 );
	gl.uniform4f(vColorF1, 1.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, fvertices1.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, fbufferId2 );
    vPositionF2 = gl.getAttribLocation( program, "vPosition" );
	vColorF2 = gl.getUniformLocation(program,"vColor");
    gl.vertexAttribPointer( vPositionF2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionF2 );
	gl.uniform4f(vColorF2, 1.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, fvertices1.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, fbufferId3 );
    vPositionF3 = gl.getAttribLocation( program, "vPosition" );
	vColorF3 = gl.getUniformLocation(program,"vColor");
    gl.vertexAttribPointer( vPositionF3, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionF3 );
	gl.uniform4f(vColorF3, 1.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, fvertices3.length / 2);
	
	//嘴
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdM );
	vPositionM = gl.getAttribLocation( program, "vPosition" );
	vColorM = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionM, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionM );
	gl.uniform4f(vColorM, 0.53, 0.0, 0.11, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 15);
	
	//左牙
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdT1 );
	vPositionT1 = gl.getAttribLocation( program, "vPosition" );
	vColorT = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionT1, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionT1 );
	gl.uniform4f(vColorT, 1.0, 1.0, 1.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
	
	//右牙
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdT2 );
	vPositionT2 = gl.getAttribLocation( program, "vPosition" );
	vColorT = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionT2, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionT2 );
	gl.uniform4f(vColorT, 1.0, 1.0, 1.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
	
	//舌头
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdS );
	vPositionS = gl.getAttribLocation( program, "vPosition" );
	vColorS = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionS, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionS );
	gl.uniform4f(vColorS, 1.00, 0.68, 0.71, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);
	
	
	//右睫毛
	gl.bindBuffer(gl.ARRAY_BUFFER,bufferIdR1);
	vPositionR1 = gl.getAttribLocation( program, "vPosition" );
	vColorR1 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionR1, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionR1 );
	gl.uniform4f(vColorR1, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.LINES, 0, verticesLashR1.length / 2);
	
	gl.bindBuffer(gl.ARRAY_BUFFER,bufferIdR2);
	vPositionR2 = gl.getAttribLocation( program, "vPosition" );
	vColorR2 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionR2, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionR2 );
	gl.uniform4f(vColorR2, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.LINES, 0, verticesLashR2.length / 2);
	
	gl.bindBuffer(gl.ARRAY_BUFFER,bufferIdR3);
	vPositionR3 = gl.getAttribLocation( program, "vPosition" );
	vColorR3 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionR3, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionR3 );
	gl.uniform4f(vColorR3, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.LINES, 0, verticesLashR3.length / 2);
	
	//左睫毛
	gl.bindBuffer(gl.ARRAY_BUFFER,bufferIdL1);
	vPositionL1 = gl.getAttribLocation( program, "vPosition" );
	vColorL1 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionL1, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionL1 );
	gl.uniform4f(vColorL1, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.LINES, 0, verticesLashL1.length / 2);
	
	gl.bindBuffer(gl.ARRAY_BUFFER,bufferIdL2);
	vPositionL2 = gl.getAttribLocation( program, "vPosition" );
	vColorL2 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionL2, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionL2 );
	gl.uniform4f(vColorL2, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.LINES, 0, verticesLashL2.length / 2);
	
	gl.bindBuffer(gl.ARRAY_BUFFER,bufferIdL3);
	vPositionL3 = gl.getAttribLocation( program, "vPosition" );
	vColorL3 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionL3, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionL3 );
	gl.uniform4f(vColorL3, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.LINES, 0, verticesLashL3.length / 2);
	
	//眼睛右
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE2 );
	vPositionE2 = gl.getAttribLocation( program, "vPosition" );
	vColorE2 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionE2, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionE2 );
	gl.uniform4f(vColorE2, 1.0, 1.0, 1.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, verticesE2.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE2 );
	vPositionE2 = gl.getAttribLocation( program, "vPosition" );
	vColorE2 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionE2, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionE2 );
	gl.uniform4f(vColorE2, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.LINE_STRIP, 0, verticesE2.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE4 );
	vPositionE4 = gl.getAttribLocation( program, "vPosition" );
	vColorE4 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionE4, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionE4 );
	gl.uniform4f(vColorE4, 0.0, 0.66, 0.95, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, verticesE4.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE4 );
	vPositionE4 = gl.getAttribLocation( program, "vPosition" );
	vColorE4 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionE4, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionE4 );
	gl.uniform4f(vColorE2, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.LINE_STRIP, 0, verticesE4.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE5 );
	vPositionE5 = gl.getAttribLocation( program, "vPosition" );
	vColorE5 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionE5, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionE5 );
	gl.uniform4f(vColorE5, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, verticesE5.length / 2);
	
	
	//眼睛左
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE1 );
	vPositionE1 = gl.getAttribLocation( program, "vPosition" );
	vColorE1 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionE1, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionE1 );
	gl.uniform4f(vColorE1, 1.0, 1.0, 1.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, verticesE1.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE1 );
	vPositionE1 = gl.getAttribLocation( program, "vPosition" );
	vColorE1 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionE1, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionE1 );
	gl.uniform4f(vColorE1, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.LINE_STRIP, 0, verticesE1.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE3 );
	vPositionE3 = gl.getAttribLocation( program, "vPosition" );
	vColorE3 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionE3, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionE3 );
	gl.uniform4f(vColorE3, 0.0, 0.66, 0.95, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, verticesE3.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE3 );
	vPositionE3 = gl.getAttribLocation( program, "vPosition" );
	vColorE3 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionE3, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionE3 );
	gl.uniform4f(vColorE2, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.LINE_STRIP, 0, verticesE3.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdE6 );
	vPositionE6 = gl.getAttribLocation( program, "vPosition" );
	vColorE6 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPositionE6, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionE6 );
	gl.uniform4f(vColorE6, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, verticesE6.length / 2);
    
	//鼻子
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
	vPosition2 = gl.getAttribLocation( program, "vPosition" );
	vColor2 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition2 );
	gl.uniform4f(vColor2, 1.0, 0.95, 0.0, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices2.length / 2);
	
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    vPosition2 = gl.getAttribLocation( program, "vPosition" );
	vColor2 = gl.getUniformLocation(program,"vColor");
    gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition2 );
	gl.uniform4f(vColor2, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.LINE_STRIP, 0, vertices2.length / 2);
	
	//斑点
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3 );
	vPosition3 = gl.getAttribLocation( program, "vPosition" );
	vColor3 = gl.getUniformLocation(program,"vColor");
	gl.vertexAttribPointer( vPosition3, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition3 );
	gl.uniform4f(vColor3, 0.8, 0.77, 0.1, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices3.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId4 );
	vPosition4 = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition4, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition4 );
	gl.uniform4f(vColor3, 0.8, 0.77, 0.1, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices4.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId5 );
	vPosition5 = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition5, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition5 );
	gl.uniform4f(vColor3, 0.8, 0.77, 0.1, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices5.length / 2);
	
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId6 );
    vPosition6 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition6, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vPosition6 );
    gl.uniform4f(vColor3, 0.8, 0.77, 0.1, 1.0);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices6.length / 2);
    
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId7 );
    vPosition7 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition7, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vPosition7 );
    gl.uniform4f(vColor3, 0.8, 0.77, 0.1, 1.0);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices7.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId8 );
	vPosition8 = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition8, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition8 );
	gl.uniform4f(vColor3, 0.8, 0.77, 0.1, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices8.length / 2);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId9 );
	vPosition9 = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition9, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition9 );
	gl.uniform4f(vColor3, 0.8, 0.77, 0.1, 1.0);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices9.length / 2);
    
}
