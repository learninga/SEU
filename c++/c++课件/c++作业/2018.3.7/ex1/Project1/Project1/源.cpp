#include<iostream>
#include"Complex.h"
using namespace std;
int main()
{
	double a = 0, b = 0, c = 0, d = 0;
	Complex m,n;
	cin >> a >> b >> c >> d;
	Complex c1(a, b), c2(c, d);
	m = c1.Add(c2);
	n = c1.Subtract(c2);
	c1.output(c1);cout << '+';c2.output(c2);cout << '=';m.output(m); cout << endl;//输出加法的等式
	c1.output(c1); cout << '-'; c2.output(c2); cout << '='; n.output(n); cout << endl;//输出减法等式	
}