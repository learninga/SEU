#include<iostream>
#include"Rational.h"
using namespace std;
void Rational::hj(int fz, int fm) {
	int M = 0;
	if (fz>fm)M = fz; else M = fm;
	if (fm != 0 && fm != 1) {
		for (int i = 1; i <= M; i++)
		{
			if (fz%i == 0 && fm%i == 0) { fz = fz / i; fm = fm / i; }
			else continue;
		}
	}
	else {
		if (fm == 1) { fz = fz; fm = 0; }
		else { fz = 0; fm = 0; }
	}
}//实现分数的化简
Rational::Rational() {
	a = 0; b = 1,x=0;
}//构造函数
Rational::Rational(int x, int y) {
	a = x; b = y;
}
Rational  Rational::Add(Rational &fr) {
	Rational myRational;
	myRational.a = a*fr.b + fr.a*b;
	myRational.b = b*fr.b;
	myRational.hj(a, b);
	return myRational;

}//实现分数的相加
Rational Rational::Subtract(Rational &fr) {
	Rational myRational;
	myRational.a = a*fr.b - fr.a*b;
	myRational.b = b*fr.b;
	myRational.hj(a,b);
	return myRational;
}//实现分数相减
Rational Rational::Multiply(Rational &fr) {
	Rational myRational;
	myRational.a = a*fr.a;
	myRational.b = b*fr.b;
	myRational.hj(a,b);
	return myRational;
}//实现分数相乘
Rational Rational::Divide(Rational &fr) {
	Rational myRational;
	myRational.a = a*fr.b;
	myRational.b = b*fr.a;
	myRational.hj(a,b);
	return myRational;
}//实现分数相除
void Rational::Format(Rational &fr) {
	long double q = a, p = b;
	x = q / p;
	cout << x<<endl;
}
void Rational::output(Rational &fr) {
	Rational myRational;
	myRational.hj(a, b);
	cout << a << '/' << b;
}