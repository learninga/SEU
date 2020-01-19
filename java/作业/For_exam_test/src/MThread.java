
public class MThread extends Thread{
	private String name;
	MThread(String m){
		name=m;
	}
	public void run() {
		try {
			Thread.sleep(1000);
		}
		catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(name);
	}
}
