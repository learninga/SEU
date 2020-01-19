#pragma once
#ifndef SAVINGS_ACCOUNT_H
#define SAVINGS_ACCOUNT_H
class SavingsAccount
{
public:
	SavingsAccount(double b)
	{
		savingsBalance = (b >= 0.0 ? b : 0.0);
	} 
	void calculateMonthlyInterest(); // calculate interest; add to balance
	void modifyInterestRate(double);
	void printBalance() const;
private:
	double savingsBalance; // the account balance
	static double annualInterestRate; // the interest rate of all accounts
}; // end class SavingsAccount
#endif

