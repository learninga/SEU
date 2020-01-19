#include<iostream>
#include"Rational.h"
using namespace std;
int main() {
	int fz1, fm1, fz2, fm2;
	Rational m, n,o,p;
	cin>>fz1 >> fm1 >> fz2 >> fm2;
	Rational c1(fz1, fm1), c2(fz2, fm2);
	c1.hj(fz1, fm1); c2.hj(fz2, fm2);
	m = c1.Add(c2);n = c1.Subtract(c2);
	o = c1.Multiply(c2);p = c1.Divide(c2);
	c1.output(c1); cout << '+'; c2.output(c2); cout << '='; m.output(m); cout << endl;
	m.output(m); cout << '='; m.Format(m);
	c1.output(c1); cout << '-'; c2.output(c2); cout << '='; n.output(n); cout << endl;
	n.output(n); cout << '=';  n.Format(m);
	c1.output(c1); cout << '*'; c2.output(c2); cout << '='; o.output(o); cout << endl;
	o.output(o); cout << '='; o.output(o);
	c1.output(c1); cout << '/'; c2.output(c2); cout << '='; p.output(p); cout << endl;
	p.output(p); cout << '='; p.Format(p);

}