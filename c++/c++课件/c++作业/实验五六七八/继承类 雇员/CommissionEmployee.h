#pragma once
#ifndef COMMISSION_H
#define COMMISSION_H
#include<string>
#include"Employee.h"
using namespace std;
class CommissionEmployee :public Employee
{
public:
	CommissionEmployee(const string&, const string&, const string&, Date, double = 0.0, double = 0.0);
	void setCommissionRate(double);
	double getCommissionRate()const;
	void setGrossSales(double);
	double getGrossSales()const;
	virtual double earnings()const;
	virtual void print()const;
private:
	double grossSales;
	double commissionRates;

};
#endif