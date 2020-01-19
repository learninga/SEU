#include<iostream>
#include"MaxPQ.h"
#include"MaxHeap.h"
using namespace std;
int main() {
	MaxHeap<int> maxHeap(20);
	maxHeap.creatMaxHeap(10);
	maxHeap.print();
	int insert = 0;
	cin >> insert;
	maxHeap.Push_binary(insert);
	maxHeap.print();
	system("pause");


}