#pragma once
#ifndef STACK_H
#define STACK_H
#include"Stack.cpp"
template <class T>
class Stack {
public:
	Stack(int stackCapacity = 10) :capacity(stackCapacity)
	{
		if (capacity < 1)
			cout << "Stack  capacity  must  be  >0." << endl;
		stack = new T[capacity];
		for (int i = 0; i < capacity; i++)
			stack[i] = 0;
		top = -1;
	};
	bool isEmpty() const {
		return top == -1;
	};
	T& Top()const {
		if (isEmpty())
			cout << "Stack  is  Empty." << endl;
		return stack[top];
	};
	void Push(const T& x) {
		if (top == capacity - 1) {
			cout << "The  Stack  is  full.Please  don't  push  one." << endl;
		}
		stack[++top] = x;
	};
	void Pop() {
		if (isEmpty())
			cout << "The  Stack  is  empty.Cannot  delete." << endl;
		stack[top--];
	};
	//新加入功能
	void Output() {
		int j = 0;
		for (; j-1 < top; j++)
			cout << stack[j]<<"     ";
		cout << endl;
	};
	Stack<T> Split() {
		if (capacity % 2 == 0) {
			Stack<T> a(capacity / 2);
			while (a.getTop() < a.getCapacity()-1) {
				a.Push(Top());
				Pop();
			}
			return a;
		}
		else
		{
			Stack<T> a(capacity + 1 / 2);
			while (a.getTop() < a.getCapacity()-1) {
				a.Push(Top());
				Pop();
			}
			return a;
		}
	};
	void Combine(Stack a) {
		capacity = capacity + a.getCapacity();
		while (a.getTop()>-1) {
			Push(a.Top());
			a.Pop();
		}
	};
	//为了得到私有数据成员的值
	int getTop() const {
		return top;
	};
	int getCapacity()const {
		return capacity;
	};
private:
	T *stack;
	int top;
	int capacity;
};
#endif

