package e1;

import java.util.Scanner;

public class exe {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in);
		System.out.println("��������ߣ�m)");
		double height=sc.nextDouble();
		System.out.println("���������أ�kg��");
		int weight=sc.nextInt();
		final double BMI=weight/(height*height);
		System.out.println(BMI);
		if(BMI<18.5){
			System.out.println("ƫ��");
		}
		else if(BMI<25.0){
			System.out.println("����");
		}
		else if(BMI<30.0){
			System.out.println("����");
		}
		else {
			System.out.println("����");
		}
}
}
