#pragma once
#ifndef POLYNOMIAL_H
#define POLYNOMIAL_H
#include"Term.h"
class  Polynomial {
public:
	Polynomial(int n,int input);
	void AddTerm(float,int,int);
	int result();
	~Polynomial();
private:
	Term *termArray;
	int capacity;
	int x;
};
#endif