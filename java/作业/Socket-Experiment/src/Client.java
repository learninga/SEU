import java.io.BufferedInputStream;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

public class Client {
	static int height;
	static int weight;
	@SuppressWarnings("resource")
	public static void main(String []args){
		try {
			/*得到本机的地址
			   设置ip的方法
			 * 1.getLocalHost
			 * 2.自定义一个数组  自己定义一串数字
			 * 3.
			 * 
			 * */
			InetAddress a= InetAddress.getLocalHost();
			Socket connection = new Socket(a,38300);
			input(connection);

		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	}
	public static void input(Socket sock) {
		System.out.println("请输入身高体重(身高cm，体重kg)");
		File f=new File(".test.txt");
		@SuppressWarnings("resource")
		Scanner s=new Scanner(System.in);
		height=s.nextInt();
		weight=s.nextInt();
		BufferedWriter  w;
		//BufferedWriter wi;
		try {
			w=new BufferedWriter(new OutputStreamWriter(sock.getOutputStream()));
			//wi=new BufferedWriter(new OutputStreamWriter(sock.getOutputStream()));
			w.write(height+"");
			 w.write(weight+"");
			 w.flush();
			 //wi.flush();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
