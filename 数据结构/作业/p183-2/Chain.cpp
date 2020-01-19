#include"Chain.h"
#include<iostream>
using namespace std;
Chain::Chain(ChainNode *x) {
	first = x;
}
void Chain::Delete(ChainNode *x){
	//给定为头指针
	if (x == first) {
		first = first->link;
	}
	else {
		//为中间指针
		if (x->link != NULL) {
			x->data = x->link->data;
			x->link = x->link->link;
		}
		//为尾指针
		else if (x == first) {
			delete x;
			first = 0;
		}
		else {
			ChainNode *p=first;
			while (p->link != x) {
				p = p->link;
			}
			delete x;
			x = NULL;
			p->link = NULL;
		}
	}
}
void Chain::print() {
	ChainNode *p = first;
	while (p) {
		cout << p->data << "    ";
		p = p->link;
	}
	delete p;
}