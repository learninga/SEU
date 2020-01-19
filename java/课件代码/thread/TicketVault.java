package experiment.thread;

public class TicketVault {
    int numTicket = 200;
    int id = 0;
    
    public synchronized boolean sell(String station){
        if(id >= numTicket){
            return false;
        } else{
            System.out.println(station + " sell " + id + " ticket");
            id++;
            return true;
        }
    }
    
    
}

