var gl;
	var VERTEX_SHADER_SOURCE =
        'attribute vec4 vPosition;\n' +
        'void main() {\n' +
        '   gl_Position = vPosition;\n' +
        '}\n';
    // fragment shader在这里修改填充颜色
    var FRAGMENT_SHADER_SOURCE =
        'void main() {\n' +
        '   gl_FragColor = vec4(1.0,0.95,0.0,1.0);\n' +
        '}\n';
window.onload=function(){
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext('webgl');
    
    if (!initShaders(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)) {
        alert('Failed to init shaders');
    }
    
    //开始画圆
    var N = 100;
    var vertexData = [0.0, 0.0];
    //设置圆的半径大小
    //开始画脸
//  var r = 1.0;
//  for (var i = 0; i <= N; i++) {
//      var theta = i * 2 * Math.PI / N;
//      var x = r * Math.sin(theta);
//      var y = r * Math.cos(theta);
//      vertexData.push(x, y);
//  }
//  var vertices = new Float32Array(vertexData);
//   var vertexBuffer = gl.createBuffer();
//      if (!vertexBuffer) {
//          console.log('Failed to create buffer object');
//          return -1;
//      }
//      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
//     gl.clear( gl.COLOR_BUFFER_BIT );
//  gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
//  var a_Position = gl.getAttribLocation(gl.program, 'vPosition');
//  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
//  gl.enableVertexAttribArray(a_Position);
//  gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);
//  
    
    
    var N=100;
    //腮红半径
     var r1=0.025;
    
    //右脸腮红
    var faceData1=[0.5,0.5];
    var faceData2=[0.4,0.4];
    var faceData3=[0.6,0.4];
   
   //左脸腮红
   var l_faceData1=[-0.5,0.5];
   var l_faceData2=[-0.4,0.4];
   var l_faceData3=[-0.6,0.4];
   
   
    for (var i = 0; i <= N; i++) {
        var theta = i * 2 * Math.PI / N;
        var x1 = r1 * Math.sin(theta)+0.5;
        var y1 = r1 * Math.cos(theta)+0.5;
        
        var x2 = r1 * Math.sin(theta)+0.4;
        var y2 = r1 * Math.cos(theta)+0.4;
        
        var x3 = r1 * Math.sin(theta)+0.6;
        var y3 = r1 * Math.cos(theta)+0.4;
        
        var x4 = r1 * Math.sin(theta)-0.5;
        var y4 = r1 * Math.cos(theta)+0.5;
        
        var x5 = r1 * Math.sin(theta)-0.4;
        var y5 = r1 * Math.cos(theta)+0.4;
        
        var x6 = r1 * Math.sin(theta)-0.6;
        var y6 = r1 * Math.cos(theta)+0.4;
        
        
        faceData1.push(x1, y1);
        faceData2.push(x2,y2);
        faceData3.push(x3,y3);
        l_faceData1.push(x4, y4);
        l_faceData2.push(x5,y5);
        l_faceData3.push(x6,y6);
        
        
    }
    var vertices1 = new Float32Array(faceData1);
    var vertices2 = new Float32Array(faceData2);
    var vertices3 = new Float32Array(faceData3);
    var l_vertices1 = new Float32Array(l_faceData1);
    var l_vertices2 = new Float32Array(l_faceData2);
    var l_vertices3 = new Float32Array(l_faceData3);
    
    var vertexBuffer1 = gl.createBuffer();
    var vertexBuffer2 = gl.createBuffer();
    var vertexBuffer3 = gl.createBuffer();
    var l_vertexBuffer1 = gl.createBuffer();
    var l_vertexBuffer2 = gl.createBuffer();
    var l_vertexBuffer3 = gl.createBuffer();
    
        if (!vertexBuffer1||!vertexBuffer2||!vertexBuffer3) {
            console.log('Failed to create buffer object');
            return -1;
        }
        //绘制右脸
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, vertices1, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer1);
    var facePosition1 = gl.getAttribLocation(gl.program, 'vPosition');
    gl.vertexAttribPointer(facePosition1, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(facePosition1);
    
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices1.length/2 );
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, vertices2, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer2);
    var facePosition2 = gl.getAttribLocation(gl.program, 'vPosition');
    gl.vertexAttribPointer(facePosition2, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(facePosition2);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices1.length/2 );
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer3);
    gl.bufferData(gl.ARRAY_BUFFER, vertices3, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer3);
    var facePosition3 = gl.getAttribLocation(gl.program, 'vPosition');
    gl.vertexAttribPointer(facePosition3, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(facePosition3);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices1.length/2 );
    
    
    //绘制左脸腮红
    gl.bindBuffer(gl.ARRAY_BUFFER, l_vertexBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, l_vertices1, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,l_vertexBuffer1);
    var l_facePosition1 = gl.getAttribLocation(gl.program, 'vPosition');
    gl.vertexAttribPointer(l_facePosition1, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(l_facePosition1);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, l_vertices1.length/2 );
    
    gl.bindBuffer(gl.ARRAY_BUFFER, l_vertexBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, l_vertices2, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,l_vertexBuffer2);
    var l_facePosition2 = gl.getAttribLocation(gl.program, 'vPosition');
    gl.vertexAttribPointer(l_facePosition2, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(l_facePosition2);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, l_vertices2.length/2 );
    
    gl.bindBuffer(gl.ARRAY_BUFFER, l_vertexBuffer3);
    gl.bufferData(gl.ARRAY_BUFFER, l_vertices3, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,l_vertexBuffer3);
    var l_facePosition3 = gl.getAttribLocation(gl.program, 'vPosition');
    gl.vertexAttribPointer(l_facePosition3, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(l_facePosition3);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, l_vertices3.length/2 );
    

}    