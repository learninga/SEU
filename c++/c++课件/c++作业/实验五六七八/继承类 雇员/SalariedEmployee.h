#pragma once
#ifndef SALARIED_H
#define SALARIED_H
#include<string>
#include"Employee.h"
using namespace std;
class SalariedEmployee :public Employee
{
public:
	SalariedEmployee(const string &, const string &, const string&, Date, double = 0.0);
	void setWeeklySalary(double);
	double getWeeklySalary()const;
	virtual double earnings()const;
	virtual void print()const;
private:
	double weeklySalary;
};
#endif