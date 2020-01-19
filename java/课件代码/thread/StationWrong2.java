package experiment.thread;

public class StationWrong2 implements Runnable{
    String name;
    static Integer tickets=0;
    
    public StationWrong2(int id){
        name = "Station " + id;
    }
    
    public boolean sell() {
    	synchronized(tickets) {
    	if (tickets < 200) {
    		System.out.println(name + " sell ticket " + tickets++);
    		return true;
    	}
    	return false;
    	}
    }
    public void run() {
        while(sell()){}
        System.out.println(name + "sold out");
    }
    
    public static void main(String args[]){
        Thread[] stationArray = new Thread[10];
        
        for(int i = 0; i < 10; i++){
            stationArray[i] = new Thread(new StationWrong2(i));
        }
        for(int i = 0; i< 10; i++){
            stationArray[i].start();
        }
        try {
            for(int i = 0; i< 10; i++){
                stationArray[i].join();
            }
            System.out.println("Sold Out!");
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
