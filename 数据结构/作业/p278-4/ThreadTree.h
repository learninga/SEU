#pragma once
#pragma once
#ifndef THREADEDTREE_H
#define THREADEDTREE_H
#include "Stack.h"
#include"ThreadedNode.h"
template <class T>
class ThreadedTree {
private:
	ThreadedNode<T> *root;
public:
	ThreadedTree(ThreadedNode<T> *p) {
		if (p)root = p;
		else cout << "This tree is empty." << endl;
	}
	//线索化 n为线索树的节点个数
	void InThread(ThreadedNode<T> *proot) {
		ThreadedNode<T> *pre = root;
		if (proot) {
			InThread(proot->leftChild);
			if (!proot->leftChild) {
				proot->LeftThread = true;
				proot->leftChild = pre;
			}
			if (!proot->rightChild) {
				proot->rightThread = false;
				proot->rightChild = pre;
			}
			pre = proot;
			InThread(proot->rightChild);
		}
	}
	//使用栈的情况
	void preorderTrans() {
		Stack<ThreadedNode<T>*> s;
		ThreadedNode<T> *current = root;
		while (current->rightChild) {
			//一直访问到最左边的节点
			while(!current->LeftThread) {
				cout << current->data << "   ";
				s.Push(current);
				current = current->leftChild;
				continue;
			}
			if (s.isEmpty())
				return;
			else {
				current = s.Top();
				s.Pop();
				current = current->rightChild;
				if (current == s.Top()) {
					s.Pop();
					current = current->rightChild;
				}
				else
					continue;
			}
		}
	}
};
#endif


