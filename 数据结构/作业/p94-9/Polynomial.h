#pragma once
#ifndef POLYNOMIAL_H
#define POLYNOMIAL_H
#include"Term.h"
class  Polynomial {
private:
	static Term *termArray;
	static int capacity;
	static int free;
	int start;
	int finish;
public:
	Polynomial();
	void Input();
	void Output();
	Polynomial Add(Polynomial);
	Polynomial Multiply(Polynomial);
	float value(int);
	void NewTerm(float coef, int exp);
	void insertTerm(const Term &);
};
#endif // !POLYNOMIAL_H

