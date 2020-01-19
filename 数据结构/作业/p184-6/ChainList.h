#pragma once
#ifndef CHAINLIST_H
#define CHAINLIST_H
#include<iostream>
#include "ChainListtNode.h"
template<class T>
class ChainListl {
private:
	ChainListNode<T> *first,*l,*r;
public:
	ChainListl() {
		first = 0;
		l = first;
		r = first;
	}
	ChainListl(ChainListNode<T>*x) {
		first = x;
		l = first;
		r = first;
	}
	//һ�����ڷ�ת�ĺ���ʹ��r����������Ӷ��Ѿ�����ת
	void Reserve(ChainListNode<T>*pl, ChainListNode<T> *pr) {
		l = pl;
		r = pr;
		ChainListNode<T> *previous = 0,*current=first;
		while (current != pr) {
			ChainListNode<T> *a = previous;
			previous = current;
			current = current->link;
			previous->link = a;
		}
		first = previous;
	}
	void ReserveRight(ChainListNode<T>*pl, ChainListNode<T> *pr) {
		//����ҽڵ㲻�����һ���ڵ�
		if (pr->link) {
			r = pr->link;
			l = pr;
			l->link = pl;
		}
		//�ҽڵ������һ���ڵ�
		else {
			l = pr;
			r = 0;
		}
		
	}
	//��������ת�ĺ���
	void ReserveLeft(ChainListNode<T>*pl, ChainListNode<T> *pr) {
		//�����ڵ㲻�����һ���ڵ�
		if (pl->link) {
			l = pl;
			ChainListNode<T> *temp = pl->link;
			pl->link = pr;
			l = temp;
			r = pl;
		}
		//��ڵ������һ���ڵ�
		else {
			r = pl;
			l = 0;
		}
	}
	void rightAll(int n) {
		//�õ��ұ߽ڵ����
		ChainListNode<T> *temp = r;
		int rightNum = 0;
		while (temp->link) { rightNum++; temp = temp->link; }
		//��������ƶ����벻�����ұ߽ڵ����
		if (n <= rightNum) {
			while (n != 0) {
				ReserveRight(l, r);
				n--;
			}
		}
		//�����ڵ����ʱ
		else {
			int i = rightNum;
			while (i != 0) {
				ReserveRight(l, r);
				i--;
			}
		}
	}
	void leftAll(int m) {
		//�õ���߽ڵ����
		ChainListNode<T> *temp = l;
		int leftNum = 0;
		while (temp->link) {
			temp = temp->link;
			leftNum++;
		}
		//��������ƶ����벻������߽ڵ����
		if (m <= leftNum) {
			while (m > 0) {
				ReserveLeft(l, r);
				m--;
			}
		}
		//�����ƶ����볬���ڵ����
		else {
			int i = leftNum;
			while (i != 0) {
				ReserveLeft(l, r);
				i--;
			}
		}
	}
	T getlData() {
		return l->data;
	}
	T getrData() {
		return r->data;
	}
};
#endif // !CHAINLIST_H
