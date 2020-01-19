#pragma once
#ifndef QUEUE_H
#define QUEUE_H
template<class T>
class Queue {
private:
	T* queue;
	int front, rear, capacity;
public:
	Queue(int theCapacity = 100) {
		capacity = theCapacity;
		if (capacity < 1) throw "Queue capacity must > 0";
		queue = new T[capacity];
		front = rear = 0;
	}
	bool isEmpty() {
		return front == rear;
	}
	T& Front() {
		if (isEmpty()) throw "Queue is empty.No front element";
		return queue[(front + 1) % capacity];
	}
	T& Rear() {
		if (isEmpty()) throw "Queue is empty.No rear element";
		return queue[rear];
	}
	void Push(const T& item) {
		if ((rear + 1) % capacity == front) {
			cout << "This is illeage" << endl;
		}
		rear = (rear + 1) % capacity;
		queue[rear] = item;
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
	void Pop() {
		if (isEmpty()) throw "Queue is empty.Cannot delete";
		front = (front + 1) % capacity;
		front--;
	}
};
#endif // !QUEUE_H
