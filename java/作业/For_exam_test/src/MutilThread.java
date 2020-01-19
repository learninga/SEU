import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;

public class MutilThread extends Thread {
private Socket socket;
private BufferedReader in;
private BufferedWriter out;
MutilThread(Socket s){
	socket=s;
	try {
		in=new BufferedReader(new InputStreamReader(socket.getInputStream()));
		out=new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
}
public void run() {
	try {
		System.out.println(in.readLine());
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
}
}
