#include<iostream>
#include"Polynomial.h"
#include"Term.h"
using namespace std;
int main() {
	Polynomial a,b;
	//ʵ�������������
	a.Input();
	a.Output();
	b.Input();
	//������ֵ����
	cout << "Please cin the value of the first polynomial"<<endl;
	int x;
	cin >> x;
	cout << "The  value  of  this  polynomial  at  " << x << "  is  " << a.value(x)<<endl;
	//���Լӷ�����
	Polynomial c;
	c = a.Add(b);
	c.Output();
	//���Գ˷�����
	Polynomial d;
	d = a.Multiply(b);
	d.Output();
	




	system("pause");

}