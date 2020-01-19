#pragma once
#ifndef RATIONAL_H
#define RATIONL_H
class Rational {
public:
	Rational();
	Rational(int x,int y);
	void hj(int fz, int fm);
	Rational Add(Rational &fr);
	Rational Subtract(Rational &fr);
	Rational Multiply(Rational &fr);
	Rational Divide(Rational &fr);
	void Format(Rational &fr);
	void output(Rational &fr);
private:
	int a, b;//a代表分子，b代表分母
	long double x;
};
#endif
