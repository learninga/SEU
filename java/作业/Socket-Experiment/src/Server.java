import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketImpl;

public class Server {
	public static void main(String[] args) {
       try {
		ServerSocket s=new ServerSocket(38300);
		while(true) {
			Socket so=s.accept();
			result(so);
			so.close();
		}
		
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	}
	
	public static void result(Socket so) {
		try {
			BufferedReader bf = new BufferedReader(new InputStreamReader(so.getInputStream()));
			BufferedReader bn=new BufferedReader(new InputStreamReader(so.getInputStream()));
			int height=bf.read();
			int weight = bn.read();
			double re;
			re=(weight/height)/height;
			if(re<18.5) {
				System.out.println("BMI指数为"+re+"说明偏瘦");
			}
			else if(re<25.0) {
				System.out.println("BMI指数为"+re+"说明正常");
			}
			else if(re<30.0) {
				System.out.println("BMI指数为"+re+"说明超重");
			}
			else {
				System.out.println("BMI指数为"+re+"说明过重");
			}

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

}
}
