
public class Ticket {
	int id=1;
	/*Ticket(int m){
		place=m;
	}
	错误一：在sale加锁，票是乱的 不是按照顺序卖出  有很多个锁对station加锁而非对于票加锁
    public synchronized void sale() {
    	while(id<=200) {
        		System.out.println("售票点"+place+"正在售出火车票No."+id);
        		id++;
    	}
      	System.out.println("售票点"+place+"售罄");
	}*/
	public synchronized boolean sell(String name) {
		if(id<=200) {
			System.out.println(name+"售出No."+id);
			id++;
			return true;
		}
		else {
			System.out.println("售票点 票售罄");
			return false;
		}
	}
}
