#include<iostream>
#include"Polynomial.h"
#include"Term.h"
using namespace std;
int main() {
	cout << "Please  cin  the  value."<<endl;
	int m = 0;
	cin >> m;
	Polynomial example(3,m);
	//	确定的多项式为2x^3+4x^2+9
	example.AddTerm(2, 3, 0);
	example.AddTerm(4, 2, 1);
	example.AddTerm(9, 0, 2);
	cout<<"the  result  of  this  polynomial  at   "<<m<<"  is  "<<example.result()<<endl;
	system("pause");
}