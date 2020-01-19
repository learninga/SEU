#include<iostream>
#include"MinHeap.h"
#include"MinPQ.h"
using namespace std;
int main() {
	MinHeap<int> minHeap;
	minHeap.creatMinHeap(8);
	minHeap.print();
	cout<<minHeap.Top()<<endl;
	minHeap.Pop();
	minHeap.print();
	int insert = 0;
	cin >> insert;
	minHeap.Push(insert);
	minHeap.print();
	system("pause");
}