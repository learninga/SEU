import java.io.IOException;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;

public class MutilClient {
	public static void main(String []args) {
		try {
			Socket socket=new Socket(InetAddress.getLocalHost(),7777);
			for(int i=0;i<10;i++) {
				ClientThread thread=new ClientThread(socket);
				thread.start();
			}
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
