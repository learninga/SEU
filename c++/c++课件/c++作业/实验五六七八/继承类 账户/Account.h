#pragma once
#ifndef ACCOUNT_H
#define ACCOUNT_H

class Account
{
public:
	Account(double); // constructor initializes balance
	virtual void credit(double); // add an amount to the account balance
	virtual bool debit(double); // subtract an amount from the account balance
	void setBalance(double); // sets the account balance
	double getBalance(); // return the account balance
	virtual  bool type() = 0;
private:
	double balance; // data member that stores the balance
};
#endif
