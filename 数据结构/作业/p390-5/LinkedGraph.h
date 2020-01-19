#pragma once
#include<iostream>
#include"Chain.h"
#include"ChainNode.h"
using namespace std;
struct Pair
{
	int vertex;
	int dur;
};
class LinkedGraph {
private:Chain<Pair> *adjLists;
		int *count, *t, *ee, *le;
		int n;
public:
	LinkedGraph(const int ver) {
		if (ver < 1)
			cout << "Number of vertices must be >0" << endl;
		n = ver;
		adjLists = new Chain<Pair>[n];
		count = new int[n]; t = new int[n];
		ee = new int[n]; le = new int[n];
	}
	int getN()const {
		return n;
	}
	ChainNode<Pair>* getFirst() const {
		ChainNode<Pair> *temp = adjLists[0];
	}
	LinkedGraph operator=(LinkedGraph g) {
		LinkedGraph h(g.n);
		h.adjLists = g.adjLists;
		h.count = g.count;
		h.ee = g.ee;
		h.le = g.le;
		h.t = g.t;
		return h;
	}
	bool isLast() {
		if (n != 1)
			return false;
		else
			return true;
	}
	/*ɾ����pָ����ָ�򶥵��Լ��ö�����ر�*/
	void remove(ChainNode<Pair> *p) {
		ChainNode<Pair> *temp = adjLists[0].getFirst();
		int i = 0;
		for (int j = 0; j < n; j++) {
			//һ����
			while (temp != p) {
				temp = temp->getLink();
				i++;
			}
			//����������
			if (temp != NULL) {
				break;
			}
			else {
				temp = adjLists[j].getFirst();
			}
		}
		//�õ�p�ǵ�j���ĵ�i������
		n--;
		p->setLink(0);
	}
	TopoIterator begin() {
		return TopoIterator(*this);
	}
	TopoIterator end() {
		TopoIterator end = TopoIterator(*this);
		while (!this->isLast()) {
			end++;
		}
		return end;
	}
};