#include"CheckingAccount.h"
using namespace std;
CheckingAccount::CheckingAccount(double initialBalance, double fee)
	:Account(initialBalance) {
	if (fee >= 0)
		transactionFee = fee;
	else
	{
		cout << "Error: transactionFee  must  be  more  than  0  ." << endl;
		transactionFee = 0.0;
	}
}
void CheckingAccount::credit(double amount) {
	double tempBalance = getBalance();
	double temp = tempBalance + amount - transactionFee;
	setBalance(temp);
	cout << "\n$"<< transactionFee << "  transaction  fee  charged." << endl;
}
bool CheckingAccount::debit(double amount) {
	double tempBalance = getBalance();
	if (amount > tempBalance) {
		cout << "Debit amount exceeded account balance." << endl;
		return false;
	}
	else {
		double temp = tempBalance - amount - transactionFee;
		setBalance(temp);
		cout <<"\n$" << transactionFee << "transaction  fee  charged." << endl;
		return true;
	}
}