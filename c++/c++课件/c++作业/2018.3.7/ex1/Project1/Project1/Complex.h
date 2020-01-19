#pragma once
#include<iostream>
using namespace std;
#ifndef COMPLEX_H
#define   COMPLEX_H
class  Complex {
public:Complex();
	   Complex(double r, double i);
	  Complex Add(const Complex&v);
	  Complex Subtract(const Complex&v);
	  void output(Complex&v);
private:
	double real, imag;
};
#endif