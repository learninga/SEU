#pragma once
#ifndef POLYNOMIAL_H
#define POLYNOMIAL_H
class Polynomial
{
public:
	Polynomial();
	Polynomial operator+( const Polynomial&) const; // addition
	Polynomial operator-(const Polynomial&) const; // subtraction
	Polynomial operator*(const Polynomial&); // multiplication
	Polynomial operator=(const Polynomial&); // assignment
	Polynomial& operator+=(const Polynomial&);
	Polynomial& operator-=(const Polynomial&);
	Polynomial& operator*=(const Polynomial&);
	void enterTerms();
	void printPolynomial() const;
	int getNumberOfTerms(); // user should only be able to retrieve value
	int getTermExponent(int);
	int getTermCoefficient(int);
	void setCoefficient(int, int); // set coefficient of a specific term
	~Polynomial(); // destructor
private:
	int numberOfTerms;//表示多项式的项数
	int exponents[100]; // 表示指数的次数
	int coefficients[100]; // 表示系数
	void polynomialCombine(Polynomial&); //合并同类项
}; // end class Polynomial

#endif
