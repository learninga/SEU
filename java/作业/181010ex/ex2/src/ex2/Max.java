package ex2;

import java.util.Scanner;

public class Max {
	int max(int a,int b) {
		if(a>b)  
			return a;
		else if(a<b)
			return b;
		else {
			System.out.println("两个数字相等");
		    return b;
	    }
    }
	double max(double a,double b) {
		if(a>b)  
			return a;
		else if(a<b)
			return b;
		else {
			System.out.println("两个数字相等");
		    return b;
		    }
		
	}
	String max(String a,String b) {
		
		int result=a.compareTo(b);
		if(result>0)
			return a;
		else if(result <0) 
			return b;
		else {
			System.out.println("两个字符串相等");
		return b;
		}
	}
 
public static void main(String[] args) {
	Max result=new Max();
	Scanner sc=new Scanner(System.in);
	Scanner tm=new Scanner(System.in);
	Scanner doubl=new Scanner(System.in);
	Scanner dod=new Scanner(System.in);
	Scanner str=new Scanner(System.in);
	Scanner sr=new Scanner(System.in);
	System.out.println("请输入需要比较的两个值");
	int a,b;
	double c,d;
	String m,n;
	a=sc.nextInt();
	b=tm.nextInt();
	c=doubl.nextDouble();
	d=dod.nextDouble();
	m=str.nextLine();
	n=sr.nextLine();
	System.out.println(result.max(a, b));
	System.out.println(result.max(c,d));
	System.out.println(result.max(m, n));
   }
}



