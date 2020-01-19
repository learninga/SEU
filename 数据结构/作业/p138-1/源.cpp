#include<iostream>
#include"Stack.h"
using namespace std;
int main() {
	int num = 0;
	cout << "Please  enter  the  num  of  the  the  stack." << endl;
	cin >> num;
	Stack<int> test(num);
	for (int i = 0; i < num; i++) {
		int a = 0;
		cin >> a;
		test.Push(a);
	}
	//²âÊÔÁËOutputº¯Êı
	test.Output();
	cout << endl;

	//²âÊÔSplitº¯Êı
	Stack<int> a(num / 2);
	a = test.Split();
	a.Output();
	test.Output();
	cout << endl;

	//²âÊÔCombineº¯Êı
	test.Combine(a);
	test.Output();
	cout << endl;
	system("pause");
}