#pragma once
#include<iostream>
#include"Account.h"
using namespace std;
class CheckingAccount:public Account
{
public:
	CheckingAccount(double, double);
	void credit(double); 
	bool debit(double);
private:
	double transactionFee;
};
