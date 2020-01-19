import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.Socket;

public class ClientThread extends Thread{
	public static int count=0;
	private Socket socket;
	private BufferedWriter out;
	ClientThread(Socket s){
		socket=s;
		count++;
		try {
			out=new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void run() {
		try {
			out.write(count+"");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
