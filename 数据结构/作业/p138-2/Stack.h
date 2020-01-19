#pragma once
#include<iostream>
#ifndef STACK_H
#define STACK_H
class Stack {
public:
	Stack(int);
	int Top();
	bool isEmpty()const;//�ж�stack�Ƿ�Ϊ��
	void Pop();
	void OnePo();
	void Possible();
	bool isSame(int);//�ж�Possibility��ǰ���Ƿ�����ͬ��permutation
private:
	int *stack;//���洹ֱ�Ĺ��
	int top;
	int capacity;
	int **Possibility;//���Դ�����ܵĽ��
	int *Left, *Right,*Temp;//Temp��ʱ����һ������
	int leftPos, rightPos,possibilityPos,row;
};
#endif