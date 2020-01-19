#pragma once
#ifndef QUEUE_H
#define QUEUE_H
#include<iostream>
template<class T>
class Queue {
	public:
		Queue(int queueCapacity = 10) :capacity(queueCapacity){
			if (capacity < 1)cout << "Queue  capacity  must  be  >1." << endl;
			queue = new T[capacity];
			front = 0;
			rear = 0;
		};
		bool isEmpty() const {
				return front == rear;
		};
		T& Front()const {
			if (isEmpty())cout << "Queue  is  empty.No  front  element." << endl;
			return queue[(front + 1) % capacity];
		};
		T& Rear()const {
			if (isEmpty())cout << "Queue  is  empty.No  rear  element." << endl;
			return queue[rear];
		};
		void Push(const T&item) {
			if ((rear + 1) % capacity == front) {

			}
			rear = (rear + 1) % capacity;
			queue[rear] = item;
		};
		void Pop() {
			if (isEmpty()) {
				cout << "Queue  is  empty.Cannot  delete." << endl;
			}
			front = (front + 1) % capacity;
			queue[front].~T();
		};

		Queue& Split() {
			int newCapacity = capacity / 2;
			Queue halfQueue(newCapacity);//half为一半奇数的queue
			Queue remainQueue(newCapacity);//remain为the second
			for(int i=0;i<capacity;i++) {
				if (i % 2 == 0) {
					halfQueue.Push(Front());
					Pop();
				}
				else {
					remainQueue.Push(Front());
					Pop();
				}
			}
			remainQueue.print();
			return halfQueue;
		};
		void print() {
			for (int i = 0; i < capacity; i++)
				cout << queue[i] << "     ";
			cout << endl;
		}
private:
	T* queue;
	int front,rear,capacity;
};
#endif // !QUEUE_H
