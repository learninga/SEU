#pragma once
#ifndef STACK_H
#define STACK_H
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
	void print()
	{
		cout<< ¡°top = ¡° << s.top << endl;
		for (int i = 0; i <= s.top; i++);
		cout << i << ¡°:¡± << s.stack[i] << endl;
	};
private:
	T *stack;
	int top;
	int capacity;
};
#endif
