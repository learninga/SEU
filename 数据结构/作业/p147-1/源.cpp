#include<iostream>
#include"Queue.h"
using namespace std;
int main() {
	Queue<int> test(10);
	int a = 0;
	for (int i = 0; i < 8; i++)
	{
		cin >> a;
		test.Push(a);
	}
	if (test.getLastOp() == "Push") {
		cout << "pushok"<<endl;
	}
	test.Pop();
	if (test.getLastOp() == "Pop") {
		cout << "popok" << endl;
	}
	system("pause");
}
