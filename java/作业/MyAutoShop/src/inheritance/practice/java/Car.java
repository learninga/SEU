package inheritance.practice.java;

public class Car {
int speed;
double regularPrice;
String color;
public double getSalePrice() {
	return regularPrice;	
}
public Car() {
}
public Car(int speedVal,double priceVal,String colorVal)throws InvalidCarSpeedException,InvalidCarPriceException{
	try {
		if(speedVal>0 && priceVal>0 && colorVal!="  ") {
			speed=speedVal;
			regularPrice=priceVal;
			color=colorVal;
		}
		else if(priceVal>0)
			throw new InvalidCarSpeedException("错误的速度参数： ",speedVal);
		else
			throw new InvalidCarPriceException("错误的价格参数： ",priceVal);
	}
	finally {
		
	}
}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Car[]cars=new Car[6];
		cars[0] = new Truck(100,10000,"Black",3000);
		cars[1] = new Truck(100,10000,"Black",1000);
		cars[2] = new Ford(100,10000,"Black",3000);
		cars[3] = new Ford(100,10000,"Black",5000);
		cars[4] = new Sedan(100,10000,"Black",25);
		cars[5] = new Ford(100,10000,"Black",19);
		for(int i=0;i<cars.length;i++) {
			System.out.println(cars[i].getSalePrice());
		}
	}

}
