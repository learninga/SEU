
public class Ticket {
	int id=1;
	/*Ticket(int m){
		place=m;
	}
	����һ����sale������Ʊ���ҵ� ���ǰ���˳������  �кܶ������station�������Ƕ���Ʊ����
    public synchronized void sale() {
    	while(id<=200) {
        		System.out.println("��Ʊ��"+place+"�����۳���ƱNo."+id);
        		id++;
    	}
      	System.out.println("��Ʊ��"+place+"����");
	}*/
	public synchronized boolean sell(String name) {
		if(id<=200) {
			System.out.println(name+"�۳�No."+id);
			id++;
			return true;
		}
		else {
			System.out.println("��Ʊ�� Ʊ����");
			return false;
		}
	}
}
