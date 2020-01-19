#pragma once
#ifndef THREADEDNODE_H
#define THREADEDNODE_H
template<class T>
class ThreadedNode {
public:
	bool LeftThread;
	bool rightThread;
	T data;
	ThreadedNode *leftChild;
	ThreadedNode *rightChild;
	ThreadedNode(T e, ThreadedNode<T> *l = nullptr, ThreadedNode<T>* r = nullptr) {
		data = e;
		leftChild = l;
		rightChild = r;
		LeftThread = false;//初始化默认左右均为子孩子而非线索
		rightThread = false;
	}
};
#endif

