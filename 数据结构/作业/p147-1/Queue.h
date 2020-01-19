#pragma once
#ifndef QUEUE_H
#define QUEUE_H
#include<iostream>
using namespace std;
template<class T>
class Queue {
public:
	Queue(int queueCapacity = 10) :capacity(queueCapacity) {
		if (capacity < 1)cout << "Queue  capacity  must  be  >1." << endl;
		queue = new T[capacity];
		front = 0;
		rear = 0;
		lastOp = "Pop";
	};
	bool isEmpty()const {
		if (front == rear) {
			if (lastOp == "Push")
				return false;
			else
				return true;
		}
		else
			return true;
	};
	T& Front() const {
		if (isEmpty())cout << "Queue  is  empty.No  front  element." << endl;
		return queue[(front + 1) % capacity];
	};
	T& Rear()const {
		if (isEmpty())cout << "Queue  is  empty.No  rear  element." << endl;
		return queue[rear];
	};

	void Push(const T& item) {
		if ((rear + 1) % capacity == front) {
			Double();
		}
		rear = (rear + 1) % capacity;
		queue[rear] = item;
		lastOp = "Push";
	};

	void Pop() {
		if (isEmpty()) {
			cout << "Queue  is  empty.Cannot  delete." << endl;
		}
		front = (front + 1) % capacity;
		queue[front].~T();
		lastOp = "Pop";
	};
	void Double() {
		T* newQueue = new T[2 * capacity];
		int start = (front + 1) % capacity;
		if (start < 2)
			copy(queue + start, queue + start + capacity - 1, newQueue);
		else
		{ 
			copy(queue + start, queue + capacity, newQueue);
			copy(queue, queue + rear + 1, newQueue + capacity - start);
		}
		front = 2 * capacity - 1; rear = capacity - 2; capacity *= 2;
		delete[] queue;
		queue = newQueue;
	}
	string getLastOp() const {
		return lastOp;
	}
private:
	T* queue;
	int front, rear, capacity;
    string lastOp;
};
#endif
