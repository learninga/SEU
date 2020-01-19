package experiment.socket;

import java.net.*;
import java.util.*;
public class AddressTest {
	
	public void printIP(){
		try{
			byte[] ip = {(byte)58,(byte)192,(byte)114,(byte)215};
			InetAddress addr = InetAddress.getByAddress(ip);
			System.out.println(addr.getHostAddress());
			addr = InetAddress.getByName("localhost");
			System.out.println(addr.getHostAddress());
			addr = InetAddress.getByName("127.0.0.1");
			System.out.println(addr.getHostAddress());
			addr = InetAddress.getByName("yangwangdeMacBook-Pro.local");
			System.out.println(addr.getHostAddress());
			addr = InetAddress.getByName(null);
			System.out.println(addr.getHostAddress());
			addr = InetAddress.getByName("www.seu.edu.cn");
			System.out.println(addr.getHostAddress());
			addr = InetAddress.getLocalHost();
			System.out.println(addr.getHostAddress());
		}catch(Exception e){
			e.printStackTrace();
		}		
	}
	
	public static void main(String[] args){
		AddressTest test = new AddressTest();
		test.printIP();
		
	}

}


