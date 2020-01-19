package homework2.ATM;

public class GoldUser extends Account {
	double interest;//金账户才有的利息
	public GoldUser(String accountName, double moneyVal) {
		super(accountName,moneyVal);
		interest=0.025;
	}
	//金账户取款操作
	public void withdraw(double num) {
		money=money+0.1*interest*money;
		super.withdraw(num);
	}
}
