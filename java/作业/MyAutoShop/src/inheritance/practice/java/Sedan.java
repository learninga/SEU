package inheritance.practice.java;

public class Sedan extends Car{
private int len;
public Sedan(int speedVal,double priceVal,String colorVal, int lenVal) {
	super(speedVal,priceVal,colorVal);
	if(lenVal>0)
		len=lenVal;
	else
		System.out.println("Please  input  leagel  values.");
}
public double getSalePrice() {
	if(len>20)
		return  super.getSalePrice()*0.85;
	else
		return  super.getSalePrice();
}
}
