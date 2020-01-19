#include<iostream>
#include"SavingAccount.h"
using namespace std;
SavingAccount::SavingAccount(double initialBalance, double rate)
	:Account(initialBalance)
{
	if (rate >= 0)
		interestRate = rate;
	else
	{
		cout << "Error: Interest Rate cannot be negative." << endl;
		interestRate = 0.0;
	}

}
double SavingAccount::calculateInterest() {
	double a = getBalance();
	return interestRate*a;
}
bool SavingAccount::type() {
	return true;
}