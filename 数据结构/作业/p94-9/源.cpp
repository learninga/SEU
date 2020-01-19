#include<iostream>
#include"Polynomial.h"
#include"Term.h"
using namespace std;
int main() {
	Polynomial a,b;
	//实现输入输出功能
	a.Input();
	a.Output();
	b.Input();
	//测试求值功能
	cout << "Please cin the value of the first polynomial"<<endl;
	int x;
	cin >> x;
	cout << "The  value  of  this  polynomial  at  " << x << "  is  " << a.value(x)<<endl;
	//测试加法功能
	Polynomial c;
	c = a.Add(b);
	c.Output();
	//测试乘法功能
	Polynomial d;
	d = a.Multiply(b);
	d.Output();
	




	system("pause");

}