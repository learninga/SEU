import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;

public class IOTest {
public static void main(String args[]) throws IOException {
	/*InputStreamReader in=new InputStreamReader(System.in);
	BufferedReader bf=new BufferedReader(in);
	BufferedWriter w=new  BufferedWriter(new FileWriter(new File("test.txt"),true));
	String bstr=null;
	while((bstr=bf.readLine())!=null) {
				if(bstr.equals("#")) {
					System.exit(0);
				}
				else {
					w.write(bstr);
					w.flush();
				}
			}*/
	//字符流逐个读取会出错
	 BufferedReader br=new BufferedReader(new FileReader(new File("test.txt")));
	 char[] buffer=new char[32];
	 int a=0;
	 while((a=br.read(buffer))>0){
		 System.out.print(new String(buffer,0,a));
	 }
	
	/*FileInputStream fos=new FileInputStream(new File("test.txt"));
	byte[]buffer=new byte[1024];
	int has=0;
	while((has=fos.read(buffer))>0) {
		System.out.print(new String(buffer,0,has));
	}
	FileWriter fiw=new FileWriter(new File("test.txt"),true);
	fiw.write("过过过 ");
	fiw.flush();
	fiw.close();
	FileReader fir=new FileReader(new File("test.txt"));
	char[]buffer=new char[32];
	int hasRead=0;
	while((hasRead=fir.read(buffer))>0) {
		System.out.print(new String(buffer,0,hasRead));
	}
	fir.close();*/
}
}
