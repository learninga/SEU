#include <iostream>
#include<cmath>
using namespace std;
class Hugeinteger {
public:
	Hugeinteger(const char*p) {

		for (int n = 0; n < 40; n++) { a[n] = 0; }
		int n = 0;
		for (; *p != NULL; n++, p++);
		n--;
		p--;
		int m = 0;
		for (; n >= 0; n--, m++)
		{
			a[m] = atoi(p);
			p--;
		}
		m--;
		for (; m >= 0; m--)
		{
			int nn = pow(10.0, m);
			a[m] = a[m] / nn;
		}

	}
	int get(int j)const { return a[j]; }
	int add(const Hugeinteger c);
	int substract(const Hugeinteger c);
	void Hugeinteger::out();
	bool isEqualTo(Hugeinteger&c);
	bool isGreaterThan(Hugeinteger&c);

private:
	int a[40];
};

void print(int i[], int sz)
{
	int n = sz;
	for (; i[n] == 0; n--);
	for (; n >= 0; n--)cout << i[n];
}
void Hugeinteger::out()
{
	int n = 39;
	for (; a[n] == 0; n--);
	for (; n >= 0; n--)cout << a[n];
}
int Hugeinteger::add(const Hugeinteger c) {
	int A[40] = { 0 };
	for (int i = 0; i < 40; i++) {
		A[i] = a[i] + c.get(i);
	}
	for (int i = 0; i <40; i++) {
		if (A[i] > 10) {
			A[i] = A[i] - 10;
			A[i + 1]++;
		}
	}
	print(A, 39);

	return 0;
}
int Hugeinteger::substract(const Hugeinteger c) {
	int Aa[40] = { 0 };
	for (int i = 0; i < 40; i++) {
		Aa[i] = a[i] - c.get(i);
	}
	for (int i = 0; i<40; i++) {
		if (Aa[i]<0) {
			Aa[i] += 10;
			Aa[i + 1]--;
		}
	}
	print(Aa, 39);
	return 0;
}
bool Hugeinteger::isEqualTo(Hugeinteger&c)
{
	for (int i = 0; i<40; i++)
	{
		if (a[i] != c.get(i))
		{
			return false;
		}
	}
	return true;
}
bool Hugeinteger::isGreaterThan(Hugeinteger&c) {
	for (int i = 39; i > 0; i--) {
		if (a[i] > c.get(i)) { return true; }
		if (a[i] < c.get(i)) { return false; }
	}
}
int main() {
	char a[10] = { "765432100" };
	char b[10] = { "789234562" };
	char p[10] = { "5" };
	Hugeinteger c(a);
	Hugeinteger d(b);
	Hugeinteger o(p);
	cout << "765432100+789234562=";
	c.add(d);
	cout << endl;
	cout << "765432100-5=";
	c.substract(o);
	cout << endl;
	bool m = c.isGreaterThan(d);
	bool n = c.isEqualTo(c);
	bool j = c.isEqualTo(d);
	if (m == true) {
		c.out();
		cout << "大于";

		d.out();
		cout << endl;
	}
	else {
		d.out();
		cout << "大于";
		c.out();
		cout << endl;
	}
	if (n == true) {
		c.out();
		cout << "等于";
		c.out();
		cout << endl;
	}
	if (j != true) {
		c.out();
		cout << "不等于";
		d.out();
		cout << endl;
	}
	system("pause");
	return 0;
}