#pragma once
#include<iostream>
#ifndef STACK_H
#define STACK_H
class Stack {
public:
	Stack(int);
	int Top();
	bool isEmpty()const;//判断stack是否为空
	void Pop();
	void OnePo();
	void Possible();
	bool isSame(int);//判断Possibility的前面是否有相同的permutation
private:
	int *stack;//储存垂直的轨道
	int top;
	int capacity;
	int **Possibility;//用以储存可能的结果
	int *Left, *Right,*Temp;//Temp暂时储存一个排列
	int leftPos, rightPos,possibilityPos,row;
};
#endif