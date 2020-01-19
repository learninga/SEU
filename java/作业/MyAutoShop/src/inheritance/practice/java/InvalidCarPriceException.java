package inheritance.practice.java;

public class InvalidCarPriceException extends InvalidCarException {

	private double price;
	public InvalidCarPriceException(String msg,double priceVal) {
		super(msg);
		price=priceVal;
	}
	public double getInvalidCarPriceException() {
		return price;
	}
}
