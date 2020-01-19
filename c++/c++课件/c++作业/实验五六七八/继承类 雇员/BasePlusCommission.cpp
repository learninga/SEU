#include<iostream>
#include"BasePlusCommission.h"
using namespace std;
BasePlusCommission::BasePlusCommission(const string&first, const string&last, const string&ssn, Date birth, double
	sales, double rate, double salary)
	:CommissionEmployee(first, last, ssn, birth, sales, rate)
{
	setBaseSalary(salary);

}
void BasePlusCommission::setBaseSalary(double salary) {
	if (salary >= 0.0)
		baseSalary = salary;
	else
		throw invalid_argument("Salary  must  be  >=0.0");

}
double BasePlusCommission::getBaseSalary()const {
	return baseSalary;
}
double BasePlusCommission::earnings()const {
	return getBaseSalary() + CommissionEmployee::earnings();
}
void BasePlusCommission::print()const {
	cout << "base-salaried";
	CommissionEmployee::print();
	cout << ";base  salary:  " << getBaseSalary();
}