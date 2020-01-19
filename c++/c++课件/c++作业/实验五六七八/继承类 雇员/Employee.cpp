#include<iostream>
#include"Employee.h"
using namespace std;
Employee::Employee(const string&first, const string&last, const string&ssn, Date birth)
	:firstname(first), lastname(last), socialsn(ssn) ,birthDate(birth) {

}
void Employee::setFirstName(const string&first) {
	firstname = first;
}
string Employee::getFirstName()const {
	return firstname;
}
void Employee::setLastName(const string&last) {
	lastname = last;
}
string Employee::getLastName()const {
	return lastname;
}
void Employee::setSSN(const string &ssn) {
	socialsn = ssn;
}
string Employee::getSSN()const {
	return socialsn;
}
void Employee::print()const {
	cout << getFirstName() << "  " << getLastName();
	cout << "\nbirthday:  " << birthDate.getMonth() << "  "<<birthDate.getDate() << ",  " << birthDate.getYear() << endl;
	cout << "social  security  number:  " << getSSN();
}
