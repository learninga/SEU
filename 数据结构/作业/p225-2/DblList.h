#pragma once
#ifndef DBLLIST_H
#define DBLLIST_H
#include<iostream>
#include"DblListNode.h"
using namespace std;
class DblList {
private:
	DblListNode *first;
public:
	DblList() {
		first->left = 0;
		first->data = 0;
		first->right = 0;
	}
	DblList(int e) {
		first->data = e;
		first->left = 0;
		first->right = 0;
	}
	//��β������
	void Push(int e) {
		DblListNode *temp = first;
		while (temp->right) {
			temp = temp->right;
		}
		DblListNode *a = NULL;
		a->data = e;
		temp->right = a;
		a->left = temp;
	}
	void Concatenate(DblList &m) {
		DblListNode *temp = first;
		//�õ�*this��β��ָ��
		while (temp->right) {
			temp = temp->right;
		}
		//����*this���ұߺ�m.first�����
		DblListNode *p = m.first;
		while (p->right) {
			int da = p->data;
			this->Push(da);
			p->data = 0;
			p = p->right;
		}
	}
	void print() {
		DblListNode *p = first;
		while (p) {
			cout << p->data;
			p = p->right;
		}
		cout << endl;
	}

};
#endif // !DBLLIST_H

