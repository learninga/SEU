package inheritance.practice.java;

public class InvalidCarSpeedException extends InvalidCarException {

	private int speed;
	public InvalidCarSpeedException(String msg,int speedVal) {
		super(msg);
		speed=speedVal;
	}
	public int getInvalidCarSpeedException() {
		return speed;
	}
}
