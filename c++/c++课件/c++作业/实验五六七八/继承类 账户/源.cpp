#include<iostream>
#include<iomanip>
#include<vector>
#include"Account.h"
#include"CheckingAccount.h"
#include"SavingAccount.h"
using namespace std;
int main()
{
	vector<Account*> Account(4);
	Account[0] = new SavingAccount(25.00, 0.10);
	Account[1] =new CheckingAccount(80.00,1.00);
	Account[2] = new SavingAccount(200.00,0.10);
	Account[3] = new CheckingAccount(400.00,0.50);
	for (size_t i = 0; i <= Account.size(); ++i) {
		if (Account[i]->type() == false) {
			cout << "Account  " << i + 1 << "  balance  :  $" << Account[i]->getBalance()<<endl;
			double withdraw = 0, deposit = 0;
			cout << "Enter  an  amount  to  withdraw  from  Account  " << i + 1 << "  :  ";
			cin >> withdraw;
			Account[i]->debit(withdraw);
			cout << "Enter  an  amount  to  depsdit  into  Account  " << i + 1 << "  :  ";
			cin >> deposit;
			Account[i]->credit(deposit);
			cout << "Uptated  Account  " << i + 1 << "  balance  :  $"<<Account[i]->getBalance()<<endl;
		}
		else {
			cout << "Account  " << i + 1 << "  balance  :  $" << Account[i]->getBalance() << endl;
			double withdraw = 0, deposit = 0,amount=0;
			cout << "Enter  an  amount  to  withdraw  from  Account  " << i + 1 << "  :  ";
			cin >> withdraw;
			cout << "Enter  an  amount  to  depsdit  into  Account  " << i + 1 << "  :  ";
			cin >> deposit;
			cout << "Adding  $";
			cin >> amount;
			cout << "  interest  to  Account  " << i + 1 << "( a  SavingAccount )" << endl;
			cout<<"Updated  Account  "<<i+1<<"  balance  :  $";
			Account[i]->credit(amount + deposit - withdraw);
			cout << Account[i]->getBalance()<<endl;
		}
	}
	
}