#include<iostream>
#include<Windows.h>
#include<ctime>
#include"Sets.h"
using namespace std;
int main() {
	srand((unsigned)time(NULL));
	int capacity = rand();
	int c_1 = 1 + rand() % capacity;
	int c_2 = 1 + rand() % capacity;
	Sets test(capacity);
	Sets test1(c_2);
	int num = 1 + rand() % c_1;
	for (int i = c_1; i>=0; i--) {
		num = 1 + rand() % c_1;
		int position = 1 + rand() % c_1;
		test.set(num, position);
	}
	int num1 = 1 + rand() % c_2;
	for (int i = c_2; i >= 0; i--) {
		num1 = 1 + rand() % c_2;
		int position = 1 + rand() % c_2;
		test1.set(num1, position);
	}
	cout << "--------²âÊÔSimpleFind--------" << endl;
	DWORD start_simpleFind = GetTickCount();
	int time1=test.SimpleFind(num);
	DWORD end_simpleFind = GetTickCount();
	cout << "The time of SimpleFind is " << end_simpleFind - start_simpleFind<<"and the result is "<< time1 << endl;
	cout << "------------²âÊÔCollapsingFind---------" << endl;
	DWORD start_weightedFind = GetTickCount();
	int time2 = test1.CollapsingFind(num1);
	DWORD end_weightUnion = GetTickCount();
	cout << "The time of CollapsingFind is " << end_weightUnion - start_weightedFind << "and the result is" << time2 << endl;
	cout << "------------²âÊÔSimpleUnion---------" << endl;
	int a = test.getTop();
	int b = test1.getTop();
	DWORD start_simpleUnion = GetTickCount();
	test.SimpleUnion(a, b);
	DWORD end_simpleUnion = GetTickCount();
	cout << "The time of SimpleUnion is " << end_simpleUnion - start_simpleUnion << endl;
	cout << "------------²âÊÔWeightedUnion---------" << endl;
	DWORD start_weightedUnion = GetTickCount();
	test.WeightedUnion(a,b);
	DWORD end_weightedUnion = GetTickCount();
	cout << "The time of weightedUinon is " << end_weightedUnion - start_weightedUnion << endl;
	system("pause");
}