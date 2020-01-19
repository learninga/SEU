#pragma once
#ifndef STACK_H
#define STACK_H
#include<iostream>
using namespace std;
template<class T>
class Stack {
private:
	T *stack;
	int capacity;
	int top;
public:
	Stack(int Scapacity = 10) {
		if (Scapacity >= 1) {
			capacity = Scapacity;
			stack = new T[capacity];
			top = -1;
		}
		else {
			cout << "Stack must be >-1";
		}
	}
	void Pop() {
		if (isEmpty()) {
			cout << "Stack is empty." << endl;
		}
		else  top--;
	}
	bool isEmpty() {
		return top == -1;
	}
	T& Top() {
		if (isEmpty()) {
			cout << "Stack is Empty." << endl;
		}
		else
			return stack[top];
	}
	void Push(const T& x) {
		stack[++top] = x;

	}
};
#endif