package ex1;

import java.util.Scanner;

public class Change {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
     System.out.println("请输入一个十六进制数");
     Scanner sc=new Scanner(System.in);
     String sixteen=sc.nextLine();
     System.out.print(Integer.parseInt(sixteen,16));
	}
}
