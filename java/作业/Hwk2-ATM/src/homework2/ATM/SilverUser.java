package homework2.ATM;

public class SilverUser extends Account {
	public SilverUser(String accountName, double moneyVal) {
		super(accountName,moneyVal);
		}
	//银账户的取款操作
	public void withdraw(double num) {
		super.withdraw(num);
	}

}
