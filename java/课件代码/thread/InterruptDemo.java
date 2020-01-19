package experiment.thread;

public class InterruptDemo implements Runnable{

	public void run(){
		System.out.println("Thread started");
		while(true){			
			try{
				Thread.sleep(60*1000);
			}catch(InterruptedException e){
				System.out.println("Interupped, and ended");
				return;
			}
		}
	}
	public static void main(String[] args){
		System.out.println("Main started");
		try{
			Thread t = new Thread(new InterruptDemo());
			t.start();
			Thread.sleep(5000);
			t.interrupt();
			t.join();
		}catch(Exception e){}
		System.out.println("Main ended");
	}
}
