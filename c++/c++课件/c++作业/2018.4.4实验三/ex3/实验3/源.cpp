#include<iostream>
#include"RationalNumber.h"
using namespace std;
int main() {
	RationalNumber t1(7, 3), t2(1, 3), r1, r2, r3, r4;
	r1 = t1 + t2;
	r2 = t1 - t2;
	r3 = t1*t2;
	r4 = t1 / t2;
	cout << "7/3  +  1/3  =" << r1.getFz() << "/" << r1.getFm() << endl;
	cout << "7/3  -  1/3  =" << r2.getFz()<< "/" << r2.getFm ()<< endl;
	cout << "7/3  *  1/3  =" << r3.getFz() << "/" << r3.getFm() << endl;
	cout << "7/3  /  1/3  =" << r4.getFz() << "/" << r4.getFm() << endl;
	cout << "7/3  is :" << endl;
	if (t1>t2)cout << ">  1/3  according  to  the  overload  >  operator" << endl;
	else cout << "<=  1/3  according  to  the  overload  >  operator" << endl;
	if (t1<t2)cout << "<  1/3  according  to  the  overload  <  operator" << endl;
	else cout << ">=  1/3  according  to  the  overload  <  operator" << endl;
	if (t1 >= t2)cout << ">= 1/3  according  to  the  overload  >=  operator" << endl;
	else cout << "<  1/3  according  to  the  overload  >=  operator" << endl;
	if (t1 <= t2)cout << "<=  1/3  according  to  the  overload  <=  operator" << endl;
	else cout << ">  1/3  according  to  the  overload  <=  operator" << endl;
	if (t1 == t2)cout << "=  1/3  according  to  the  overload  ==  operator" << endl;
	else cout << "!=  1/3  according  to  the  overload  ==  operator" << endl;
	if (t1 != t2)cout << "!=  1/3  according  to  the  overload  !=  operator" << endl;
	else cout << "=  1/3  according  to  the  overload  !=  operator" << endl;
}