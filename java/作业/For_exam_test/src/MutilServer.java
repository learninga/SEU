import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class MutilServer {

	public  void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		int num=0;
		ServerSocket s=new ServerSocket(7777);
		try {
			while(true) {
				if(num<10) {
					Socket socket=s.accept();
					MutilThread thread=new MutilThread(socket);
					thread.start();
					num++;
				}
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally {
			try {
				s.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		
		}
		try {
			Thread.sleep(50*1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}

