#pragma once
#ifndef MAXHEAP_H
#define MAXHEAP_H
#include"MaxPQ.h"
template<class T>
class MaxHeap {
private:
	T *heap;
	int heapSize;
	int capacity;
public:
	MaxHeap(int theCapacity = 10) {
		if (theCapacity < 0)
			cout << "The capacity must be > 0" << endl;
		else {
			capacity = theCapacity;
			heap = new T[capacity+1];
			heapSize = 0;
		}
	}
	void creatMaxHeap(int n) {
		if (n <= 1) {
			cout << "The heap size must be over 1" << endl;
		}
		else {
			if (n > capacity)
				capacity *= 2;
			for (int i = 1; i <= n; i++) {
				T value;
				cin >> value;
				heap[i] = value;
				heapSize++;
			}
		}
	}
	bool isEmpy() const {
		return heapSize == 0;
	}
	void print() {
		for (int i = 1; i <= heapSize; i++)
			cout << heap[i] << "   ";
		cout << endl;
	}
	//得到从s到i路径中中间的元素位置
	int Mid(int s, int e) {
		int *pos = new int[100];
		int tem = e;
		int i = 1;
		while (tem > s) {
			pos[i] = tem;
			tem /= 2;
			i++;
		}
		return pos[i / 2];
	}
	
	//利用二分查找的方法找到新的元素应该在的位置
	int getPosition(int start, int end, const T&e) {
		if (start==end/2||start==(end-1)/2)
			return end;
		else if (e > heap[Mid(start,end)])
			getPosition(start,Mid(start,end), e);
		else if (e < heap[Mid(start,end)])
			getPosition(Mid(start,end), end, e);
	}
	
	//元素插入到堆中
	void Push_binary(const T& e) {
		if (heapSize == capacity) {
			capacity *= 2;
			T*tempary = new T[capacity];
			for (int i = 0; i <= capacity / 2; i++)
				tempary[i] = heap[i];
			heap = new T[capacity];
			for (int i = 0; i <= capacity / 2; i++)
				heap[i] = tempary[i];
		}
		heapSize++;
		int currentNode = getPosition(1, heapSize, e);
		T temp = heap[currentNode];
		heap[currentNode] = e;
		heap[heapSize] = temp;
		for (int i = heapSize; i > currentNode; i /= 2) {
			temp = heap[i/2];
			heap[i / 2] = heap[i];
			heap[i] = temp;
		}
	}
};
#endif // !MAXHEAP_H
