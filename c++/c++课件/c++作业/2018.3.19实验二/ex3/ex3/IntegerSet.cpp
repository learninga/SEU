#include<iostream>
#include"IntegerSet.h"
using namespace std;
void IntegerSet::emptySet() {
	for (int i = 0; i != 101; i++)set[i] = 0;
};
void IntegerSet::inputSet(int m) {
	int n = validEntry(m); 
	if (n ==1)
		set[m] = 1;	
	else cout << "Invalid  Element"<<endl;
}
IntegerSet::IntegerSet(int a[],int m){
	for (int i = 0; i != m; i++) {
		int b = validEntry(a[i]);
		int m = a[i];
		if (b == 1)set[m] = 1; else set[m] = 0;
		continue;
	}
}
IntegerSet IntegerSet::unionOfSets(const IntegerSet& m) {
	IntegerSet n;
	for (int i = 0; i != 101; i++) {
		if (set[i] == 0 && m.set[i] == 0)n.set[i] = 0;
		else n.set[i] = 1;
	}
	return n;
};
IntegerSet IntegerSet::intersectionOfSets(const IntegerSet&m) {
	IntegerSet n;
	for (int i = 0; i != 101; i++)
	{
		if (set[i] == 1 && m.set[i] == 1)n.set[i] = 1;
		else n.set[i] = 0;
	}
	return n;
};
void IntegerSet::insertElement(int k) {
	int a = validEntry(k);
	if (a == 1)set[k] = 1;
}
void IntegerSet::deleteElement(int m) {
	int a = validEntry(m);
	if (a == 1)set[m] = 0;
}
void IntegerSet::printSet()const {
	cout << "(  ";
	for (int i = 0; i != 101; i++) {
		if (set[i] == 1)cout << i << "  ";
	}
	cout << ")";
}
bool IntegerSet::isEqualTo(const IntegerSet&m)const {
	int i = 0;
	for (; i != 101; i++) {
		if (set[i] == m.set[i])continue;
		else break;
	}
	if (i == 101)return true;
	else return false;
}