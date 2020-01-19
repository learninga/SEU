package experiment.thread;

public class InterruptDemo2 implements Runnable{

	public void run(){
		System.out.println("Thread started");
		while(!Thread.interrupted()){			

				System.out.println("Thread Running");

		}
	}
	public static void main(String[] args){
		System.out.println("Main started");
		try{
			Thread t = new Thread(new InterruptDemo2());
			t.start();
			Thread.sleep(5000);
			t.interrupt();
			t.join();
		}catch(Exception e){}
		System.out.println("Main ended");
	}
}
