#include<iostream>
#include"Polynomial.h"
#include"Term.h"
using namespace std;
int Polynomial::capacity = 100;
Term *Polynomial::termArray = new Term[100];
int Polynomial::free = 0;
Polynomial::Polynomial() {
	int i = 0;
	for (; i < 100; i++) {
		if (termArray[i].coef == 0 && termArray[i].exp == 0)
			free = i;
		break;
	}//确定free的值
	if (i == 100)
		cout << "The  array  is  full." << endl;
}

//输入多项式函数
void Polynomial::Input() {
	cout << "Please cin  the number of the  terms  of  this polynomial" << endl;
	int num = 0; 
	cin >> num;
	cout << "Please  cin  the  coeficients  and  expoents  of  this  polynomial(first cosfficients next expornts)" <<num<< endl;
	for (int i = free; i < num+free; i++) {
		cin >> termArray[i].coef;
		cin >> termArray[i].exp;
	}
	start = free;
	finish = free + num - 1;
	free = free + num;
	cout << start << "   " << finish << "   " << free << endl;
}

//输出多项式
void Polynomial::Output() {
	int num =finish -start + 1;
	cout << "This  polynomial  is";
	for (int i = start; i <= finish; i++) {
		if (termArray[i].exp != 0 && i != finish)
			cout << termArray[i].coef << "x^" << termArray[i].exp << "  +  ";
		else if (termArray[i].exp == 0)
			cout << termArray[i].coef << endl;
		else
			cout << termArray[finish].coef << "x^" << termArray[finish].exp << endl;
	}
}


Polynomial Polynomial::Add(Polynomial a) {
	Polynomial c;
	int n = finish - start + 1;//n表示本多项式的项数
	int m = a.finish - a.start + 1;//m表示a的项数
		Term *temp = new Term[m + n];
		int i = 0, ai = 0;
		while (i < n || ai < m) {
			//如果两项指数相同
			if (termArray[start + i].exp == termArray[a.start + ai].exp) {
				temp[i].coef = termArray[start + i].coef + termArray[a.start + i].coef;
				temp[i].exp = termArray[start + i].exp;
				i++;
				ai++;
			}
			//如果本项的指数小于a的指数
			else if (termArray[start + i].exp < termArray[a.start + ai].exp) {
				temp[i].coef = termArray[a.start + ai].coef;
				temp[i].exp = termArray[a.start + ai].exp;
				ai++;
			}
			//如果本项指数较大
			else
			{
				temp[i].coef = termArray[start + i].coef;
				temp[i].exp = termArray[start + i].exp;
				i++;
			}
			//将剩余项加入temp中
			for (; i < n; i++) {
				temp[i].coef = termArray[start + i].coef;
				temp[i].exp = termArray[start + i].exp;
			}
			for (; ai < m; ai++) {
				temp[ai].coef = termArray[start + ai].coef;
				temp[ai].exp = termArray[start + ai].exp;
			}
			//如果存储空间足够
			if (m + n <= capacity - free + 1) {
				c.start = free;
				c.finish = free + m + n - 1;
				free = free + m + n;
				for (int j = 0; j <m+n; j++) {
					termArray[c.start+j].coef = temp[j].coef;
					termArray[j+c.start].exp = temp[j].exp;
				}
			}
			//如果空间不足
			else {
				capacity *= capacity;
				c.start = free;
				c.finish = free + m + n - 1;
				free = free + m + n;
				for (int j = 0; j <m + n; j++) {
					termArray[c.start + j].coef = temp[j].coef;
					termArray[j + c.start].exp = temp[j].exp;
				}
			}
			return c;
	}
}

float Polynomial::value(int x) {
	float tempsum = 1;
	float sum = 0;
	for (int i = 0; i < capacity; i++) {
		//次数为termArray[i].exp  系数为termArray[i].coe
		if (termArray[i].exp == 0) {
			tempsum = termArray[i].coef;
			sum += tempsum;
		}
		else
		{
			for (int j = 0; j < termArray[i].exp; j++) {
				tempsum = tempsum*x;
			}
			tempsum = termArray[i].coef*tempsum;
			sum += tempsum;
			tempsum = 1;//重置tempsum的值
		}
	}
	return sum;
}

Polynomial Polynomial::Multiply(Polynomial b) {
	Polynomial c;
	int terms = finish - start + 1;
	int bterms = b.finish - b.start + 1;
	for (int i = 0; i<terms; i++) {
		for (int j = 0; j<bterms; j++) {
			float coef = termArray[i].coef*b.termArray[j].coef;
			int exp = termArray[i].exp + b.termArray[j].exp;
			c.NewTerm(coef, exp);
		}
	}
	return c;
}
void Polynomial::NewTerm(float coef, int exp)
{
	int terms = finish - start + 1;
	if (terms == capacity) {
		capacity *= 2;
		Term *tmp = new Term[capacity];
		copy(termArray, termArray + terms, tmp);
		delete[] termArray;
		termArray = tmp;
	}
	Term ATerm;
	ATerm.coef = coef; ATerm.exp = exp;
	insertTerm(ATerm);
}
void Polynomial::insertTerm(const Term & term)
{
	int i=0,terms=finish-start+1;
	for (i = 0; i<terms && term.exp<termArray[i].exp; i++) {
	}
	if (term.exp == termArray[i].exp) {
		termArray[i].coef += term.coef;
		if (!termArray[i].coef) {
			for (int j = i; j<terms - 1; j++)
				termArray[j] = termArray[j + 1];
			terms--;
		}
	}
	else {
		for (int j = terms - 1; j >= i; j--)
			termArray[j + 1] = termArray[j];
		termArray[i] = term;
		terms++;
	}
}