
public class E1Thread extends Thread {
    public void run() {
    	System.out.println("I an a Thread");
    }
    /*public static */void main(/*String args[]*/) {
    	//Thread t=new E1Thread();
    	//t.start();
    	Thread t2=new Thread (new RunnabelThread());
    	t2.start();
    	Thread main=currentThread();
    	try {
			Thread.sleep(5000);
			main.interrupt();
			main.join();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    }
}
