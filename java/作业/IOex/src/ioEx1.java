import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
//�ֽڵķ���
public class ioEx1 {
	public static void main(String [] args) {
		try {
			 String[][] test = {{"ѧ��","����","�ɼ�"},{"71108501","����","80.0"},
					   {"71108502","����","79.5"},{"71108503","����","91.0"},{"71108504","����","60.0"},
					   {"71108505","����","18.6"}};
			File file = new File("test.txt");
			if(!file.exists()) {
				file.createNewFile();
			}
			FileOutputStream fos = new FileOutputStream(file);
			for(int i=1;i<6;i++) {
				for(int j=0;j<3;j++) {
					fos.write(test[0][j].getBytes());
					fos.write("  ".getBytes());
					fos.write(test[i][j].getBytes());
					fos.write("    ".getBytes());
				}
				String s="\r\n";
				fos.write(s.getBytes());
		}
			fos.close();
			BufferedReader bf = new BufferedReader(new FileReader(file));
			String temp=null;
			int line=0;
			 while ((temp = bf.readLine()) != null) {
				 System.out.println(temp);
	             line++;
			 }
			bf.close();	
		}
	   catch(IOException e) {
		   System.out.println(e);
	   }
	}
   
}
