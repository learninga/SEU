package homework2.ATM;

public class SilverUser extends Account {
	public SilverUser(String accountName, double moneyVal) {
		super(accountName,moneyVal);
		}
	//���˻���ȡ�����
	public void withdraw(double num) {
		super.withdraw(num);
	}

}
