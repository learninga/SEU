#pragma once
#ifndef CIRCULARLISTWITHHEAD_H
#define CIRCULARLISTWITHHEAD_H
#include"Polynomial.h"
#include"CircularListNode.h"
class CircularListWithHead {
	friend class Polynomial;
private:
	CircularListNode *head;
	static CircularListNode* av;
public:
	friend istream& operator>>(istream &i, CircularListWithHead m);
	friend ostream& operator<<(ostream &o, CircularListWithHead m);
	//初始化函数
	CircularListWithHead() {
		head->exp = -1;
		head->coef = 0;
		head->link = head;
	}
	void set(float c, float e, CircularListNode *p) { p->coef = c; p->exp = e; }
	CircularListNode* getHead()const { return head; }
	CircularListNode* getLink() const{ return head->link; }
	CircularListNode* getEnd()const { 
		CircularListNode *p=head; 
		while (p!= head) {
			if (p->getLink() == head)
				break;
			else
				p = p->link;
		}
		return p;
	}
	void insertAfter(float c ,int e) {
		CircularListNode *temp = head;
		//为了得到尾指针
		while (temp!=head) {
			if (temp->getLink() == head)
				break;
			else 
				temp = temp->link;
		}
		CircularListNode *p_end = new CircularListNode(c, e);
		temp->link = p_end;
		p_end->link = head;
	}
	~CircularListWithHead() {
		CircularListNode *p = head;
		while (p != head) {
			if (p->getLink() == head)
				break;
			else
				p = p->link;
		}
		if (p) {
			CircularListNode *first = p->link;
			p->link = av;
			av = first;
			p = 0;
		}


	}
};
CircularListNode* CircularListWithHead::av = 0;
#endif // CIRCULARLISTWITHHEAD_H
