#include<iostream>
#include"HourlyEmployee.h"
using namespace std;
HourlyEmployee::HourlyEmployee(const string&first, const string&last, const string&ssn, Date birth, double wage, double worked)
	:Employee(first, last, ssn, birth)
{
	setHwage(wage);
	setHworked(worked);

}
void HourlyEmployee::setHwage(double wage) {
	if (wage>0.0)
		hwage = wage;
	else
		throw invalid_argument("hourly  wage  must  be>0.0");

}
double HourlyEmployee::getHwage()const {
	return hwage;
}
void  HourlyEmployee::setHworked(double worked) {
	if (worked >= 0)
		hworked = worked;
	else
		throw invalid_argument("hours  worked  must  be  >0.0");

}
double HourlyEmployee::getHworked()const {
	return hworked;
}
double HourlyEmployee::earnings()const {
	if (hworked <= 40) {
		return getHwage()*getHworked();
	}
	else {
		return (40 * getHwage()) + ((getHworked() - 40)*getHwage()*1.5);
	}
}
void HourlyEmployee::print()const{
	cout << "hourly  employee:";
	Employee::print();
	cout << "hourly  wage:  " << hwage << ";  hours  worked:  " << hworked;
}