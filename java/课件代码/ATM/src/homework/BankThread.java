package homework;

public class BankThread extends Thread{
	Account ac;
	BankThread(Account myac){
		ac=myac;
	}
	public void run() {
		//ÿ��20��
		try {
			Thread.sleep(20*1000);
			ac.re_money();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
