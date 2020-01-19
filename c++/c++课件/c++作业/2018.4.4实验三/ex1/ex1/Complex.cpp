#include<iostream>
#include"Complex.h"
using namespace std;
istream &operator>>(istream&m,Complex&p ) {
	m >> p.realpart;
	m >> p.imaginary;
	return m;
}
ostream &operator<<(ostream&m,Complex&p) {
	m << "(" << p.realpart << "  ,  " << p.imaginary << "  )";
	return m;
}
Complex Complex::operator+(const Complex&p)const {
	return Complex(realpart + p.realpart, imaginary + p.imaginary);
}
Complex Complex::operator-(const Complex&p)const {
	return Complex(realpart - p.realpart, imaginary - p.imaginary);
}
Complex::Complex(double real , double imag ) {
	realpart = real, imaginary = imag;
}
Complex Complex::operator*(const Complex&p)const{
	double m = realpart*p.realpart - imaginary*p.imaginary;
	double n = realpart*p.imaginary - imaginary*p.realpart;
	return Complex(m, n);
}
bool Complex::operator!=(const Complex&p)const {
	if (realpart == p.realpart&&imaginary == p.imaginary)return false;
	else true;
}
bool Complex::operator==(const Complex&p)const {
	if (realpart == p.realpart&&imaginary == p.imaginary)return true;
	else return false;
}