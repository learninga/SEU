#include<iostream>
#include"Array.h"
using namespace std;
int main() {
	Array<int,5> a;
	cout << "Enter  5  integer  values  :" << endl;
	int temp1[5] = { 0 };
	for (int i = 0; i < 5; i++) {
		cin >> temp1[i];
	}
	for (int i = 0; i < 5; i++) {
		a[i] = temp1[i];
	}
	cout << "The  values  in  intArray  are:" << endl;
	for (int i = 0; i < 5; i++) {
		cout << a[i] << "  ";
	}
	cout << endl;
	Array<double,4>b;
	double temp2[4] = { 0 };
	cout << "Enter  4  floating  values  :" << endl;
	for (int i = 0; i < 4; i++) {
		cin >> temp2[i];
	}
	for (int i = 0; i < 4; i++) {
		b[i] = temp2[i];
	}
	cout << "The  values  in  doubleArray  are:" << endl;
	for (int i = 0; i < 4; i++) {
		cout << b[i] << "  ";
	}
	cout << endl;
}