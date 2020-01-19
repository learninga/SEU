#include<iostream>
#include<string>
#include"HugeInt.h"
using namespace std;
HugeInteger::HugeInteger() {
	for (int i = 0; i != 40; i++)integer[i] = 0;
}
HugeInteger::HugeInteger(const char*p) {
	for (int i = 0; i <= 39; i++) { integer[i] = 0; }
	int a = 0;
	a = strlen(p);
	for (int i = 40 - a, j = 0; i <= 39 && j < a; i++, j++) {
		integer[i] = p[j] - 48;
	}
}

HugeInteger HugeInteger::add(const HugeInteger&b) {
	HugeInteger x;
	for (int j = 0; j <= 39; j++) {
		x.integer[j] = b.integer[j];
	}
	for (int i = 39; i >= 0; i--) {
		if (integer[i] + b.integer[i] >= 10) {
			x.integer[i - 1]++;
			x.integer[i] = integer[i] + x.integer[i] - 10;
		}
		else {
			x.integer[i] = integer[i] + x.integer[i];
		}
	}
	return x;
}
	HugeInteger HugeInteger::add(const char*p) {
		HugeInteger t(p), q;
		q= add(t);
		return q;
	}
bool HugeInteger::isEqualTo(HugeInteger&m){
	int i = 0;
	for (; i != 40; i++) {
		if (integer[i] == m.integer[i])continue;
		else break;
	}
	if (i == 40)return true; else return false;

}
bool HugeInteger::isGreaterThan(HugeInteger&m) {
	int i = 0;
	for (; i != 9;) {
		if (m.integer[i] >= integer[i]) { i = i + 1; continue; }
		else break;
		while (i == 9) { if (m.integer[9] > integer[9])i = 10; else i = 9; }
	}
	if (i == 10) return true;
	else { if (i < 9)return false; else return false; }

}
void  HugeInteger::output() {
	int a = 0;
	for (int i = 0; i <= 39; i++) {
		if (integer[i] > 0 && integer[i] != NULL) { a = i; break; }
		else { continue; }
	}
	for (int j = a; j <= 39; j++) {
		cout << integer[j];
	}
}