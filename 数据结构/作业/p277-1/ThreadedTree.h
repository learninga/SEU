#pragma once
#ifndef THREADEDTREE_H
#define THREADEDTREE_H
#include"ThreadedNode.h"
using namespace std;
template <class T>
class ThreadedTree {
private:
	ThreadedNode<T> *root;
public:
	//构造函数
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
	//插入左孩子操作
	void InsertLeft(ThreadedNode<T>*l, ThreadedNode<T> *s) {
		l->leftChild = s->leftChild;
		l->LeftThread = s->LeftThread;
		l->rightChild = s;
		l->rightThread = true;
		s->leftChild = l;
		s->LeftThread = false;
		if (!l->LeftThread) {
			ThreadedNode<T> *temp = inorderPre(l);//inorderPre得到s中序遍历的前驱节点
			temp->rightChild = l;
		}
	}
	//得到中序遍历的前驱节点
	ThreadedTree<T>* inorderPre(ThreadedNode<T>* p) {
		ThreadedNode<T>*q = p->leftChild;
		if (p->LeftThread == false) {
			while (q->rightThread == false)
				q = q->rightChild;
		}
		return q;
	}
	//中序序遍历函数用来测试插入函数是否成功
	void inOrder(ThreadedNode<T> *p) {
		ThreadedNode<T> *current = p;
		while (current) {
			while (current->LeftThread == false)
				current = current->leftChild;
			cout << current->data << "   ";
			while (current->rightThread == true && current->rightChild != NULL) {
				current = current->rightChild;
				cout << current->data << "   ";
			}
			current = current->rightChild;
		}
	}
};

#endif // DEBUG
