package homework2.ATM;

public class BranzeUser extends Account {
	public BranzeUser(String accountName, double moneyVal) {
		super(accountName,moneyVal);
		}
	//铜账户的取款操作
     public void withdraw(double num) {
	  money=money-5;
	  super.withdraw(num);
}   
}
