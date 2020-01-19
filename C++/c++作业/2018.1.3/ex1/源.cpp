#include<iostream>
#include<string>
using namespace std;
class Employee {
	string firstname;
	string lastname;
	int ys;
public:
	void setEmployee(string fna, string lna, int salary) {
		firstname = fna; lastname = lna; ys =salary * 12;
	}
	string getFn() { return firstname; }
	string getLn() { return lastname; }
	int getYs() { return ys; }
};
int main()
{
	Employee one;
	one.setEmployee("Bob", "Jones", 2875);
	cout << "Employee 1: " << one.getFn() << " " << one.getLn() << "; Yearly Salary: " << one.getYs() << endl;
	Employee two;
	two.setEmployee("Susan", "Baker", 3150);
	cout << "Employee 2: " << two.getFn() << " " << two.getLn() << " ;Yearly Salary: " << two.getYs() << endl;
	cout << "Increasing emlpoyee salaries by 10%" << endl;
	cout << "Employee 1: " << one.getFn() << " " << one.getLn() << "; Yearly Salary: " << 1.1*one.getYs() << endl;
	cout << "Employee 2: " << two.getFn() << " " << two.getLn() << " ;Yearly Salary: " << 1.1*two.getYs() << endl;
	return 0;
}