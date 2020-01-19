var gl;
var program;
var bufferId;
var vPostion;


window.onload=function(){
	var canvas = document.getElementById("canvas");
	gl = WebGLUtils.setupWebGL( canvas );
	gl.viewport( 0, 0, canvas.width, canvas.height );
	
//	 if (!gl) {
//      alert('Failed to init shaders');
// }
	 
	 alert("okkk");
	 //载入数据到GPU
	var N = 100;
    var vertexData = [0.0, 0.0];
    var r = 0.5;
    for (var i = 0; i <= N; i++) {
        var theta = i * 2 * Math.PI / N;
        var x = r * Math.sin(theta);
        var y = r * Math.cos(theta);
        vertexData.push(x, y);
    }
    var vertices = new Float32Array(vertexData);
    
    program=initShaders(gl,"vertexshader","fragment-shader");
	gl.useProgram(program);
    
	 bufferId=gl.createBuffer();
	 gl.bindBuffer(gl.ARRAY_BUFFER,bufferId);
	 gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
	 
//  gl.clearColor(0.0, 0.0, 0.0, 1.0);
//  gl.clear(gl.COLOR_BUFFER_BIT);
//  gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);

    //render();
}
function render(){
	vPostion=gl.getAttribLocation(program,"vPostion");
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	gl.enableVertexAttribArray(vPostion);
	
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	//gl.bindBuffer(gl.ARRAY_BUFFER,bufferId);
    gl.drawArrays(gl.TRIANGLE_FAN,0,vertices,length/2);
}


