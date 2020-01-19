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
	//一个用于反转的函数使得r左边所有连接都已经被反转
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
		//如果右节点不是最后一个节点
		if (pr->link) {
			r = pr->link;
			l = pr;
			l->link = pl;
		}
		//右节点是最后一个节点
		else {
			l = pr;
			r = 0;
		}
		
	}
	//用于向左反转的函数
	void ReserveLeft(ChainListNode<T>*pl, ChainListNode<T> *pr) {
		//如果左节点不是最后一个节点
		if (pl->link) {
			l = pl;
			ChainListNode<T> *temp = pl->link;
			pl->link = pr;
			l = temp;
			r = pl;
		}
		//左节点是最后一个节点
		else {
			r = pl;
			l = 0;
		}
	}
	void rightAll(int n) {
		//得到右边节点个数
		ChainListNode<T> *temp = r;
		int rightNum = 0;
		while (temp->link) { rightNum++; temp = temp->link; }
		//如果向右移动距离不超过右边节点个数
		if (n <= rightNum) {
			while (n != 0) {
				ReserveRight(l, r);
				n--;
			}
		}
		//超过节点个数时
		else {
			int i = rightNum;
			while (i != 0) {
				ReserveRight(l, r);
				i--;
			}
		}
	}
	void leftAll(int m) {
		//得到左边节点个数
		ChainListNode<T> *temp = l;
		int leftNum = 0;
		while (temp->link) {
			temp = temp->link;
			leftNum++;
		}
		//如果向左移动距离不超过左边节点个数
		if (m <= leftNum) {
			while (m > 0) {
				ReserveLeft(l, r);
				m--;
			}
		}
		//向左移动距离超过节点个数
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
