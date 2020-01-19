#pragma once
#ifndef SAVINGACCOUNT_H
#define SAVINGACCOUNT_H
#include<iostream>
#include"Account.h"
using namespace std;
class SavingAccount :public Account {
public:
	SavingAccount(double, double);
	double calculateInterest();
	virtual bool type();
private:
	double interestRate;
};
#endif