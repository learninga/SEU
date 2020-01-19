#include<iostream>
using namespace std;
int power(int a, int b);
int main()
{
	cout << "Enter a base and an exponent:" << endl;
	int base = 0, exponent = 0;
	cin >> base >> exponent;
	cout << base <<"  "<< "raised to the" <<"  "<< exponent <<"  "<< "is"<<"  " << power(base, exponent) << endl;
}
int power(int a, int b)
{
	if (b > 1)
		return a*power(a, b - 1);
	else
		return a;
}