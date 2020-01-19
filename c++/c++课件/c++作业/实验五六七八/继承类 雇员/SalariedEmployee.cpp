#include<iostream>
#include"SalariedEmployee.h"
using namespace std;
SalariedEmployee::SalariedEmployee(const string&first, const string&last, const string&ssn, Date birth, double salary)
	:Employee(first, last, ssn, birth)
{
	setWeeklySalary(salary);
}
void SalariedEmployee::setWeeklySalary(double salary) {
	if (salary >= 0)
		weeklySalary = salary;
	else
		throw invalid_argument("Weekly salary must be >=0.0");
}
double SalariedEmployee::getWeeklySalary()const {
	return weeklySalary;
}
double SalariedEmployee::earnings()const {
	return getWeeklySalary();
}
void SalariedEmployee::print()const {
	cout << "salaried  employee: ";
	Employee::print();
	cout << "\nweekly  salary:  " << getWeeklySalary();
}

