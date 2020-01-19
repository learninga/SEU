#include<iostream>
#include"Polynomial.h"
#include"CircularListNode.h"
#include"CircularListWithHead.h"
using namespace std;
int main() {
	Polynomial a;
	cin >> a;
	cout << a << endl;
	Polynomial b;
	cin >> b;
	cout << b << endl;
	Polynomial c = a + b;
	cout << c << endl;
	Polynomial d = a - b;
	cout << d << endl;
	cout << c.evalute(1) << endl;
	cout << d.evalute(2) << endl;
	Polynomial e = a*b;
	cout << e << endl;
}