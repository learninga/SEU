
public class RunnabelThread implements Runnable{
public void run() {
	//System.out.println("I am a Runnable Thread");
	try {
		Thread.sleep(60000);
	} catch (InterruptedException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
}
}
