#pragma once
#ifndef HOURLYEMPLOYEE_H
#define HOURLYEMPLOYEE_H
#include"Employee.h"
using namespace std;
class HourlyEmployee :public Employee {
public:
	HourlyEmployee(const string&, const string&, const string &, Date, double, double);
	void  setHwage(double);
	double getHwage()const;
	void setHworked(double);
	double getHworked()const;
	virtual double earnings()const;
	virtual void print()const;
private:
	double hwage;
	double hworked;

};
#endif