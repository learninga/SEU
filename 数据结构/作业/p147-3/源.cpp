#include<iostream>
#include"Queue.h"
using namespace std;
int main() {
	Queue<int>test(10);
	test.Push(0);
	test.Push(1);
	test.Push(2);
	test.Push(3);
	test.Push(4);
	test.Push(5);
	test.Push(6);
	test.Push(7);
	test.Push(8);
	test.Push(9);
	test.print();
	Queue<int>half;
	half = test.Split();
	half.print();
	test.print();
	system("pause");
	return 0;
}