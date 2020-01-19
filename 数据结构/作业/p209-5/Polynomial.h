#pragma once
#include<iostream>
#ifndef POLYNOMIAL_H
#define POLYNOMIAL_H
#include<iostream>
#include"CircularListWithHead.h"
using namespace std;
struct Term{
	float coef;//系数
	float exp;//指数
	Term Set(float c, float e) {
		coef = c;
		exp = e;
	}
};
class Polynomial {
private:
	CircularListWithHead  poly;
public:
	friend istream& operator>>(istream &is, Polynomial x);
	friend ostream& operator<<(ostream &os, Polynomial x);
	Polynomial();
	Polynomial(const Polynomial&a);
	const Polynomial& operator=(const Polynomial&);
	Polynomial operator+(const Polynomial &b);
	Polynomial operator-(const Polynomial &b);
	Polynomial operator*(const Polynomial &);
	float evalute(float x);
	~Polynomial();
};
#endif // !POLYNOMIAL_H
