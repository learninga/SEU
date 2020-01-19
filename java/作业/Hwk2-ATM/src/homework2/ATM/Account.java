package homework2.ATM;

public class Account {
	protected String name;
	protected double money;//money表示账户里现在的存款;
	public Account() {};
	public Account(String accountName, double moneyVal) {
		if(accountName!="" &&  moneyVal>0) {
			name = accountName;
			money = moneyVal;
		}
		else
			System.out.println("Please  input  leagel  values.");
	}
	//存款操作
	public void deposit(double num){
		money=money+num;
	}
	//取款操作
	public void withdraw(double num) {
		if(num < money) {
			money=money-num;
		}
		else {
			System.out.println("There  isn't  enough  money  in  your  account");
		}
	}
	//查询操作
	public double inquiry() {
		return money;
	}
	public String getName() {
		return name;
	}
}
