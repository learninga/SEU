package homework2.ATM;

public class BranzeUser extends Account {
	public BranzeUser(String accountName, double moneyVal) {
		super(accountName,moneyVal);
		}
	//ͭ�˻���ȡ�����
     public void withdraw(double num) {
	  money=money-5;
	  super.withdraw(num);
}   
}
