package homework2.ATM;

public class GoldUser extends Account {
	double interest;//���˻����е���Ϣ
	public GoldUser(String accountName, double moneyVal) {
		super(accountName,moneyVal);
		interest=0.025;
	}
	//���˻�ȡ�����
	public void withdraw(double num) {
		money=money+0.1*interest*money;
		super.withdraw(num);
	}
}
