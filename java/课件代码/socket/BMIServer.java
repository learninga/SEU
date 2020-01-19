package experiment.socket;
import java.net.*;
import java.util.*;
import java.io.*;

public class BMIServer {
	public static void main(String args[]) {
		ServerSocket s = null;
		Socket skt = null;
		try {
			s = new ServerSocket(9000,5);
			skt = s.accept();
			BufferedReader br = new BufferedReader(new InputStreamReader(skt.getInputStream()));
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(skt.getOutputStream()));
			String line = br.readLine().trim();
			System.out.println("height " + line);
			float height = Float.parseFloat(line);
			line = br.readLine().trim();
			System.out.println("weight " + line);
			float weight = Float.parseFloat(line);
			float bmi = weight / (height*height);
			bw.write(bmi+"\r\n");
			bw.flush();
		} catch (IOException e) {
			System.out.println(e);
		} finally {
			if (skt != null) { 
				try { skt.close(); } catch (Exception e) {System.out.println(e);}
			}
			if (s != null) { 
				try { s.close(); } catch (Exception e) {System.out.println(e);}
			}
		}
	}
}
