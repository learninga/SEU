package inheritance.practice.java;

public class Truck extends Car {
	int weight;
	public Truck(int speedVal, double priceVal, String colorVal,int weightVal) {
		super(speedVal,priceVal,colorVal);
		if(weightVal>0 ) {
		weight=weightVal;
	}
		else
			System.out.println("Please  input  leagel  values.");
			
}
	public double getSalePrice() {
		if(weight>2000) {
			return super.getSalePrice()*0.9;
		}
		else
			return super.getSalePrice();
	}
	}