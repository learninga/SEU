package inheritance.practice.java;

public class Ford extends Car {
int manufacturerDiscount;
public double getSalePrice() {
	return  super.getSalePrice()-manufacturerDiscount;
}
public Ford(int speedVal,double priceVal, String colorVal, int discountVal) {
	super(speedVal,priceVal,colorVal);
	if(discountVal>0) {
		manufacturerDiscount=discountVal;
	}
	else
		System.out.println("Please  input  leagel  values.");
}
}
