#pragma once
#ifndef COMPLEX_H
#define COMPLEX_H
#include<iostream>
using namespace std;
class  Complex {
	friend ostream &operator <<(ostream&,Complex&);
	friend istream &operator>>(istream&,Complex&);
public: 
	Complex(double real=0.0,double imag=0.0);
	Complex operator+(const Complex&)const;
	Complex operator-(const Complex&)const;
	Complex operator*(const Complex&)const;
	bool operator!=(const Complex&)const;
	bool operator==(const Complex&)const;
private:
	double realpart;
	double imaginary;
};
#endif