/*
public class TrainThread extends Thread{
	private Ticket ticket;
	TrainThread(int m){
		ticket=new Ticket(m);
	}
   public void run() {
	 ticket.sale();
 }
}
*/
public class TrainThread extends Thread{
	private String name;
	Ticket ticket;
	TrainThread(int stationNo,Ticket tick){
		name=" €∆±µ„"+(stationNo+1);
		ticket=tick;
	}
	public void run() {
		while(ticket.sell(name)) {
			try {
				Thread.sleep(0);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}