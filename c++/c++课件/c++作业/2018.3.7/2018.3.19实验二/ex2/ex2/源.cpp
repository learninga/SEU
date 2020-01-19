#include<iostream>
#include"SavingsAccount.h"
using namespace std;
int main() {
	SavingsAccount saver1(2000.00), saver2(3000.00);
	saver1.printBalance();
	saver1.calculateMonthlyInterest(); cout << endl;
	saver2.printBalance();
	saver2.calculateMonthlyInterest(); cout << endl;
	saver1.modifyInterestRate(0.04); saver2.modifyInterestRate(0.04);
	saver1.printBalance();
	saver1.calculateMonthlyInterest(); cout << endl;
	saver2.printBalance();
	saver2.calculateMonthlyInterest(); cout << endl;

}