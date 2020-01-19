package experiment.thread;

public class Station implements Runnable {
    String name;
    TicketVault vault;
    
    public Station(int id, TicketVault vault){
        name = "Station " + id;
        this.vault = vault;
    }
    
    public void run() {
        while(vault.sell(name)){
            try{
            	Thread.sleep(0);
            	//Thread.currentThread().yield();
            } catch (Exception e){
                e.printStackTrace();
            }
        }
    }
    
    public static void main(String args[]){
        Thread[] stationArray = new Thread[10];
        TicketVault vault = new TicketVault();
        for(int i = 0; i < 10; i++){
            stationArray[i] = new Thread(new Station(i, vault));
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

