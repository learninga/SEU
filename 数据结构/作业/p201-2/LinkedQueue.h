#pragma once
#ifndef LINKEDQUEUE_H
#define LINKEDQUEUE_H
#include"ChainNode.h"
#include"LinkedQueue.h"
#include<iostream>
using namespace std;
template<typename T>class LinkedQueue{
private:
	ChainNode<T> *front;
    ChainNode<T> *rear;
public:
	LinkedQueue() {
		front = 0;
		rear = 0;
	}
	bool isEmpty() {
		return front = rear;
	}
	void Push(const T &e) {
		if (isEmpty()) {
			front = rear = new ChainNode(e, 0);
		}
		else {
			rear = rear->link = new ChainNode(e, 0);
		}
	}
	void Pop() {
		if (isEmpty()) {
			cout << "Queue  is  empty. Cannot  delete." << endl;
		}
		else {
			ChainNode<T>*delNode = front;
			front = front->link;
			delete delNode;
		}
	}
	void print() {
		ChainNode<T> *temp = front;
		while (temp != rear) {
			cout << temp->data;
			temp = temp->link;
		}
		cout << endl;
	}

};
#endif // !LINKEDQUEUE_H
