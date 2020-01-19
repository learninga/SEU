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
	//���캯��
	ThreadedTree(ThreadedNode<T> *p) {
		if (p)root = p;
		else cout << "This tree is empty." << endl;
	}
	//������ nΪ�������Ľڵ����
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
	//�������Ӳ���
	void InsertLeft(ThreadedNode<T>*l, ThreadedNode<T> *s) {
		l->leftChild = s->leftChild;
		l->LeftThread = s->LeftThread;
		l->rightChild = s;
		l->rightThread = true;
		s->leftChild = l;
		s->LeftThread = false;
		if (!l->LeftThread) {
			ThreadedNode<T> *temp = inorderPre(l);//inorderPre�õ�s���������ǰ���ڵ�
			temp->rightChild = l;
		}
	}
	//�õ����������ǰ���ڵ�
	ThreadedTree<T>* inorderPre(ThreadedNode<T>* p) {
		ThreadedNode<T>*q = p->leftChild;
		if (p->LeftThread == false) {
			while (q->rightThread == false)
				q = q->rightChild;
		}
		return q;
	}
	//��������������������Բ��뺯���Ƿ�ɹ�
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
