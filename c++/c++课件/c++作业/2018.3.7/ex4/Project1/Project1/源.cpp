#include<iostream>
#include<string>
#include"HugeInt.h"
using namespace std;
int main() {
	char a[10] = { "789546259" };
	char b[10] = { "795364269" };
	char u[10] = { "789546259" };
	char v[10] = { "5" };
	HugeInteger c(a);
	HugeInteger d(b);
	HugeInteger e(u);
	HugeInteger r1, r2;
	bool m = c.isEqualTo(d);
	bool n = c.isGreaterThan(d);
	bool o = c.isEqualTo(e);
	r1 = c.add(d);
	c.output(); cout << "  +  "; d.output(); cout << "  =  "; r1.output(); cout << endl;
	r2 = c.add(v);
	c.output(); cout << "  +  5  "; cout << "  =  "; r2.output(); cout << endl;
	if (o == true) {
		c.output();
		cout << "  is  equal  to  "; e.output(); cout << endl;
	}
	else { c.output(); cout << "  is  not  equal  to  "; e.output(); cout << endl; }
	if (m == true)
	{
		c.output();	cout << "  is equal to  "; d.output(); cout << endl;
	}
	else { c.output(); cout<< "  is  not  equal to  "; d.output(); cout << endl; }
	if (n == true) {
		c.output();
		cout<< "  is  greater  than  "; d.output();
	}
	else {
		c.output();
		cout << "  is  not  greater  than  "; d.output();
}
}