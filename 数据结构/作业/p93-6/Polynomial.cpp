#include<iostream>
#include"Polynomial.h"
using namespace std;
void Polynomial::AddTerm(float co,int ex ,int i) {
	if (i <= capacity)
	{
		termArray[i].coe = co;
		termArray[i].exp = ex;
	}
	else
		cout << "The term is beyond you design.";
}
Polynomial::Polynomial(int n,int input) {
	termArray = new Term[n];
	capacity = n;
	x = input;
}
Polynomial::~Polynomial() {
	delete termArray;
}
int Polynomial::result() {
	int tempsum = 1;
	int sum = 0;
	for (int i = 0; i < capacity; i++) {
	//����ΪtermArray[i].exp  ϵ��ΪtermArray[i].coe
		if (termArray[i].exp == 0) {
			tempsum = termArray[i].coe;
			sum += tempsum;
		}
		else
		{
			for (int j = 0; j < termArray[i].exp; j++) {
				tempsum = tempsum*x;
			}
			tempsum = termArray[i].coe*tempsum;
			sum += tempsum;
			tempsum = 1;//����tempsum��ֵ
		}
	}
	return sum;
}