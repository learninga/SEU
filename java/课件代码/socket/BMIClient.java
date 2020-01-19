package experiment.socket;

import java.net.*;
import java.util.*;
import java.io.*;

public class BMIClient {
	public static void main(String args[]) {
		Scanner s = new Scanner(System.in);
		System.out.println("Please Input height:");
		String line = s.nextLine().trim();
		float height = Float.parseFloat(line);
		System.out.println("Please Input weight:");
		line = s.nextLine().trim();
		float weight = Float.parseFloat(line);
		Socket skt = null;
		try {
			skt = new Socket("www.seu.edu.cn",9000);
			//skt = new Socket(InetAddress.getLocalHost(),9000);
			BufferedReader br = new BufferedReader(new InputStreamReader(skt.getInputStream()));
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(skt.getOutputStream()));
			bw.write(height + "\r\n");
			bw.write(weight + "\r\n");
			bw.flush();
			line = br.readLine();
			System.out.println(line);
		} catch (IOException e) {
			System.out.println(e);
		} finally {
			if (skt != null) { 
				try { skt.close(); } catch (Exception e) {System.out.println(e);}
			}
		}
	}
}
