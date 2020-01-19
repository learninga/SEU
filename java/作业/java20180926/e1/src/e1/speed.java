package e1;

import java.util.Scanner;

public class speed {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
     Scanner sc=new Scanner(System.in);
     System.out.println("输入两地距离");
     Long distance=sc.nextLong();
     System.out.println("输入传输数据量");
     Long num=sc.nextLong();
     double time1=distance/200000*num*3600;
     double time2=distance/1000;
     if(time1>time2)
    	 System.out.println("飞机快");
     else
    	 System.out.println("光纤快");
    	 
	}

}
