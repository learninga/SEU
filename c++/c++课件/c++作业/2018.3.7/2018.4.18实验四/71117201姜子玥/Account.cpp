#include <iostream>
using std::cout;
using std::endl;

#include "Account.h" 
Account::Account(double initialBalance)
{
	if (initialBalance >= 0.0)
		balance = initialBalance;
	else 
	{
		cout << "Error: Initial balance cannot be negative." << endl;
		balance = 0.0;
	} 
} 
void Account::credit(double amount)
{
	balance = balance + amount; 
} 
bool Account::debit(double amount)
{
	if (amount > balance) 
	{
		cout << "Debit amount exceeded account balance." << endl;
		return false;
	} 
	else 
	{
		balance = balance - amount;
		return true;
	} 
}
void Account::setBalance(double newBalance)
{
	balance = newBalance;
} 
double Account::getBalance()
{
	return balance;
}