#include<iostream>
#include<iomanip>
#include<vector>
#include<typeinfo>
#include<windows.h>
#include"Date.h"
#include"Employee.h"
#include"SalariedEmployee.h"
#include"CommissionEmployee.h"
#include"BasePlusCommission.h"
#include"HourlyEmployee.h"
using namespace std;
int main() {
	cout << fixed << setprecision(2);
	vector<Employee*>employees(3);
	vector<Date*>e(4);
	Date e1("June", 15, 1944);
	Date e2("May", 29, 1960);
	Date e3("September", 8, 1954);
	Date e4("March", 2, 1965);
	e[0] = &e1; e[1] = &e2; e[2] = &e3; e[3] = &e4;
	employees[0] = new SalariedEmployee("John", "Smith", "111-11-1111", e1, 800.00);
	employees[1] = new HourlyEmployee("Karen", "Price", "222-22-2222", e2, 16.75, 40.00);
	employees[2] = new CommissionEmployee("Sue", "Jones", "333-33-3333", e3, 10000.00, 0.06);
	cout << "Employee  processed  polymorphically  via  dynamic  binding:\n\n";
	SYSTEMTIME systm;        
	GetLocalTime(&systm);
	int nowMonth = systm.wMonth; string m;
	switch (nowMonth) {
	case 1:  m = "January"; break;case 2: m = "Febuary"; break;
	case 3:  m = "Martch"; break;case 4: m = "April"; break;
	case 5:   m = "May"; break;case 6: m = "June"; break;
	case 7: m = "July"; break;case 8: m ="August"; break;
	case 9: m = "September"; break;case 10: m = "October"; break;
	case 11: m = "November"; break;case 12: m = "December"; break;

	}
	for (size_t i = 0; i < employees.size(); ++i)
	{
		employees[i]->print();
		if (e[i]->getMonth() == m) {
			cout << "\nHAPPY  BIRTHDAY!!!";
			cout << "\nearned  $ " << employees[i]->earnings() + 100 << "\n\n";
		}
		else
			cout << "\nearned  $" << employees[i]->earnings() << "\n\n";

	}
	BasePlusCommission Base("Bob", "Lewis", "444-44-4444", e4, 5000.00, 0.04, 300.00);
	Employee *ptr = &Base;
	ptr->print();
	if (e[3]->getMonth() == m) {
		cout << "\nHAPPY  BIRTHDAY!!!";
		cout << "\nearned  $ " << ptr->earnings() + 100 << "\n\n";
	}
	else
		cout << "\nearned  $" << ptr->earnings() << "\n\n";
	for (size_t j = 0; j <= employees.size(); ++j) {
		cout << "deleting  object  of  " << typeid(*employees[j]).name() << endl;
		delete employees[j];
	}
}
