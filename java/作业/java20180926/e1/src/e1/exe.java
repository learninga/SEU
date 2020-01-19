package e1;

import java.util.Scanner;

public class exe {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in);
		System.out.println("请输入身高（m)");
		double height=sc.nextDouble();
		System.out.println("请输入体重（kg）");
		int weight=sc.nextInt();
		final double BMI=weight/(height*height);
		System.out.println(BMI);
		if(BMI<18.5){
			System.out.println("偏瘦");
		}
		else if(BMI<25.0){
			System.out.println("正常");
		}
		else if(BMI<30.0){
			System.out.println("超重");
		}
		else {
			System.out.println("过重");
		}
}
}
