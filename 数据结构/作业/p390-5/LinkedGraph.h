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
	/*删除掉p指针所指向顶点以及该顶点相关边*/
	void remove(ChainNode<Pair> *p) {
		ChainNode<Pair> *temp = adjLists[0].getFirst();
		int i = 0;
		for (int j = 0; j < n; j++) {
			//一条链
			while (temp != p) {
				temp = temp->getLink();
				i++;
			}
			//继续下条链
			if (temp != NULL) {
				break;
			}
			else {
				temp = adjLists[j].getFirst();
			}
		}
		//得到p是第j链的第i个顶点
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