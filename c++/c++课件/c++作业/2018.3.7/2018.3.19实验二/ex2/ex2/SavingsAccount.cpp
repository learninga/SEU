#include<iostream>
#include"SavingsAccount.h"
using namespace std;
void SavingsAccount::calculateMonthlyInterest() {
	savingsBalance = savingsBalance*(annualInterestRate / 12) + savingsBalance;
	cout << savingsBalance;
}
void  SavingsAccount::modifyInterestRate(double m) {
	annualInterestRate = m;
}
void SavingsAccount::printBalance() const {
	
	cout << "Initial  Balances  : \n" << "Saver  :  $  " << savingsBalance << endl;
	cout << "Balances  after  1  month's  interests  applied  at  " << annualInterestRate << ":  \n";
	cout << "Saver  :  $";
}
 double SavingsAccount::annualInterestRate = 0.03;