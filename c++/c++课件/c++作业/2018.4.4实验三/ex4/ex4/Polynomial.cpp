#include<iostream>
#include"Polynomial.h"
using namespace std;
Polynomial::Polynomial() {
	for (int i = 0; i != 100; i++) {
		exponents[i] = i;
	}
	for (int i = 0; i != 100; i++)coefficients[i] = 0;
}
Polynomial Polynomial::operator+(const Polynomial&p) const {
	Polynomial m;
	int i = 0;
	for (; i != 100; i++) {
		if (exponents[i] != 0 || p.exponents[i]!=0) {
			int a = coefficients[i] + p.coefficients[i];
			m.setCoefficient(a, i);
		}
		else continue;
	}
	return m;

	
}
Polynomial Polynomial::operator-(const Polynomial&p) const {
	/*Polynomial m;
	int i = 0;
	for (; i != 100; i++) {
		if (exponents[i] != 0||p.exponents[i] != 0) {
			int a = coefficients[i] - p.coefficients[i];
			m.setCoefficient(a, i);
		}
		else continue;
	}
	return m;*/
	Polynomial temp;
	bool exponentExists;
	int s;
	temp.coefficients[0] = coefficients[0] - p.coefficients[0];
	for (s = 1; (s < 100) && (exponents[s] != 0); s++)
	{
		temp.coefficients[s] = coefficients[s];
		temp.exponents[s] = exponents[s];
	} // end for

	for (int x = 1; x < 100; x++)
	{
		exponentExists = false;

		for (int t = 1; (t < 100) && (!exponentExists); t++)

			if (p.exponents[x] == temp.exponents[t])
			{
				temp.coefficients[t] -= p.coefficients[x];
				exponentExists = true;  // exponent found
			} 

		if (!exponentExists)
		{
			temp.exponents[s] = p.exponents[x];
			temp.coefficients[s] -= p.coefficients[x];
			s++;
		} 
	} 
	return temp;
} 
Polynomial Polynomial::operator*(const Polynomial&p) {
	Polynomial m;
	for (int i = 0; i != 100; i++) {
		for (int j = 0; j != 100; j++) 
				m.coefficients[i + j] = p.coefficients[i] * coefficients[i];
	}
	return m;
};
Polynomial Polynomial::operator=(const Polynomial&p) {
	Polynomial m;
	m.numberOfTerms = p.numberOfTerms;
	for (int i = 0; i != 100; i++) {
		if (p.exponents[i] != 0) {
			m.setCoefficient(p.coefficients[i], i);
			m.exponents[i] = p.exponents[i];
		}
		else continue;
	}
	return m;
};
Polynomial& Polynomial::operator+=(const Polynomial&p) {
	*this = *this + p;
	return *this;
};
Polynomial& Polynomial::operator-=(const Polynomial&p) {
	*this = *this - p;
	return *this;
};
Polynomial& Polynomial::operator*=(const Polynomial&p) {
	for (int i = 0; i != 100; i++) {
		for (int j = 0; j != 100; j++)
			coefficients[i + j] = p.coefficients[i] * coefficients[i];
	}
	return *this;

};
void Polynomial::enterTerms() {
	cout << "Enter  number  of  polynomial  terms:  ";
	cin >> numberOfTerms;
	cout << endl;
	for (int i = 1; i <= numberOfTerms; i++) {
		int a = 0,b=0;
		cout << "Enter  coefficient  :  ";
		cin >> a;
		cout << endl;
		cout << "Enter  exponent  :";
		cin >> b;
		cout << endl;
		setCoefficient(a, b);//a表示系数，b表示指数
	}
};
void Polynomial::printPolynomial() const {
	int i = 0;
	for (; i < 100; i++) {
		{
			if (coefficients[i] != 0 && exponents[i] != 0) {
				cout << "+" << coefficients[i] << "x^" << exponents[i];
				continue;
			}
			else {
				if (coefficients[i] != 0 && exponents[i] == 0)
					cout << "+" << coefficients[i];
				else continue;
			}
		}
	}
	cout << endl;
}
int Polynomial::getNumberOfTerms() {
	return numberOfTerms;
};
int	Polynomial::getTermExponent(int m) {
	return exponents[m];
};
int  Polynomial::getTermCoefficient(int m) {
	return coefficients[m];
};
void Polynomial::setCoefficient(int m, int n) {
	coefficients[n] =m;
};
Polynomial::~Polynomial(){

};
void Polynomial::polynomialCombine(Polynomial& p) {
	int i = 0;
	for (; i != 100; i++)
	{
		if (exponents[i] == p.getTermExponent(i))
		{
			coefficients[i] =coefficients[i]+ p.coefficients[i];
		}
		else continue;
	}
};