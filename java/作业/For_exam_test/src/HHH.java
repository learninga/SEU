
public class HHH {
	public static void main(String []args) {
		// TODO Auto-generated method stub
		Thread []thread=new Thread[4];
		thread[0]=new MThread("ThreadOne");
		thread[1]=new MThread("ThreadTwo");
		thread[2]=new MThread("ThreadThree");
		thread[3]=new MThread("ThreadFour");
		for(int i=0;i<4;i++)
			thread[i].start();
	}
}

