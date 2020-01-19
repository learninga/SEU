import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class ioEx2 {
  public static void translate(String inFileName,String outFileName,int code) {
	  try {
		  File infile=new File(inFileName);
		  File outfile = new File(outFileName);
		  FileInputStream in= new FileInputStream(infile);
		  FileOutputStream out=new FileOutputStream(outfile);
		  int r=in.read();
		  while(r!=-1) {
			  r+=code;
			  out.write(r);
			  r=in.read();
		  }
		  in.close();
		  out.close();
	  }catch(IOException e) {
		  System.out.println(e);
		  
	  }
	 }
  public static void checkFile(String path) {
	  try {
		  File file=new File(path);
		  if(file.isDirectory()) {
			  
		  }
	  }
	  
	  
  }
  public static void main(String args[]) {
	  translate("exp4_test.txt","exp4_out.txt",10);
	  translate("exp4_out.txt","exp4_in.txt",-10);
  }
}
