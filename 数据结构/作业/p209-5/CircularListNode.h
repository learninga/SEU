#pragma once
#ifndef CIRCULARLIST_H
#define CIRCULARLIST_H
#include"CircularListWithHead.h"
class CircularListNode {
	friend class CircularListWithHead;
private:
	float coef;//系数
	int exp;//指数
	CircularListNode *link;
public:
	CircularListNode(float c, int ex) { coef = c; exp = ex; }
	CircularListNode* getLink() { return link; }
	float getCo() { return coef; }
	int getEx() { return exp; }
	void setLink(CircularListNode *l) { link = l; }
};
#endif // !CIRCULARLIST_H
