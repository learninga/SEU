package e1;

import java.util.Scanner;

public class speed {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
     Scanner sc=new Scanner(System.in);
     System.out.println("�������ؾ���");
     Long distance=sc.nextLong();
     System.out.println("���봫��������");
     Long num=sc.nextLong();
     double time1=distance/200000*num*3600;
     double time2=distance/1000;
     if(time1>time2)
    	 System.out.println("�ɻ���");
     else
    	 System.out.println("���˿�");
    	 
	}

}
