package homework2.ATM;

public class Account {
	protected String name;
	protected double money;//money��ʾ�˻������ڵĴ��;
	public Account() {};
	public Account(String accountName, double moneyVal) {
		if(accountName!="" &&  moneyVal>0) {
			name = accountName;
			money = moneyVal;
		}
		else
			System.out.println("Please  input  leagel  values.");
	}
	//������
	public void deposit(double num){
		money=money+num;
	}
	//ȡ�����
	public void withdraw(double num) {
		if(num < money) {
			money=money-num;
		}
		else {
			System.out.println("There  isn't  enough  money  in  your  account");
		}
	}
	//��ѯ����
	public double inquiry() {
		return money;
	}
	public String getName() {
		return name;
	}
}
