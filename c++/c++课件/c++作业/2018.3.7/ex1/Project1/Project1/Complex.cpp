#include"Complex.h"
using namespace std;
Complex::Complex(){
	real = imag = 0;
}
Complex::Complex(double r, double i) {
	real = r; imag = i;
}
Complex Complex::Add(const Complex&v) {
	Complex result;
	result.real = real + v.real;
	result.imag = imag + v.imag;
	return result;
}
Complex Complex::Subtract(const Complex&v){
	Complex result;
	result.real = real - v.real;
	result.imag = real - v.imag;
	return result;
}
void Complex::output(Complex&v) {
	cout << '(' << v.real << ',' << v.imag << ')';
}