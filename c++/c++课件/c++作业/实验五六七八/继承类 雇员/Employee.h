#pragma once
#ifndef EMPLOYEE_H
#define EMPLOYEE_H
#include<string>
#include"Date.h"
using namespace std;
class Employee {
public:
	Employee(const string&, const string&, const string&, Date);
	void setFirstName(const string&);
	string getFirstName()const;
	void setLastName(const string&);
	string getLastName()const;
	void setSSN(const string&);
	string getSSN()const;
	virtual double earnings()const = 0;
	virtual void print()const;
private:
	string firstname;
	string lastname;
	string socialsn;
	Date birthDate;
};
#endif