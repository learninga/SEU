#pragma once
#ifndef MINHEAP_H
#define MINHEAP_H
#include"MinPQ.h"
template<class T>
class MinHeap :public MinPQ<T> {
private:
	T *heap;
	int heapSize;//表示树中节点的个数
	int capacity;//为数组的大小
public:
	MinHeap(int theCapacity=10) {
		if (theCapacity > 0) {
			capacity = theCapacity;
			heapSize = 0;
			heap = new T[capacity+1];
		}
		else
			cout << "The capacity must be > 0" << endl;
	}
	void creatMinHeap(int n) {
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
	void print() {
		for (int i = 1; i <= heapSize; i++)
			cout << heap[i] << "    ";
		cout << endl;
	}
	bool isEmpty()const {
		return heapSize == 0;
	}
	const T& Top()const {
		return heap[1];
	}
	void Push(const T& e) {
		if (heapSize == capacity) {
			capacity *= 2;
			T*tempary = new T[capacity];
			for (int i = 0; i <= capacity/2; i++)
				tempary[i] = heap[i];
			heap = new T[capacity];
			for (int i = 0; i <= capacity / 2; i++)
				heap[i] = tempary[i];
		}
		int currentNode = heapSize + 1;
		while (currentNode != 1 && heap[currentNode / 2] > e) {
			heap[currentNode] = heap[currentNode / 2];
			currentNode = currentNode / 2;
		}
		heap[currentNode] = e;
		heapSize++;
	}
	void Pop() {
		if (isEmpty()) {
			cout << "This heap is empty." << endl;
		}
		T lastE = heap[heapSize--];
		int currentNode = 1;
		int child = 2;
		while (child <= heapSize) {
			if (child < heapSize&&heap[child] > heap[child + 1])
				child++;
			if (lastE <= heap[child])
				break;
			heap[currentNode] = heap[child];
			currentNode = child;
			child *= 2;
		}
		heap[currentNode] = lastE;
	}
};
#endif // !MINHEAP_H
