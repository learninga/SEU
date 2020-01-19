
public class TrainSale {
	public static void main(String[] args) {
		Thread []sale=new Thread[10];
		Ticket t=new Ticket();
		for(int i=0;i<10;i++) {
			sale[i]=new TrainThread(i,t);
		}
		//ÔËÐÐ
		for(int i=0;i<10;i++) {
				sale[i].start();
			}
		}
		
	}

