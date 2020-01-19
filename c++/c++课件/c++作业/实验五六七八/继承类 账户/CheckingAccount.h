#pragma once
#ifndef CHECKINGACCOUNT_H
#define CHECKINGACCOUNT_H
#include<iostream>
#include"Account.h"
using namespace std;
class CheckingAccount :public Account
{
public:
	CheckingAccount(double, double);
	void credit(double);
	virtual bool debit(double);
	virtual bool type();
private:
	double transactionFee;
};

#endif