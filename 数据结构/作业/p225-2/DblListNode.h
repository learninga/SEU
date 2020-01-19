#pragma once
#ifndef DBLLISTNODE_H
#define DBLLISTNODE_H
#include"DblList.h"
class DblListNode {
	friend class DblList;
private:
	int data;
	DblListNode *left;
	DblListNode *right;
public:
	DblListNode(int d, DblListNode *l, DblListNode *r) {
		data = d;
		left = l;
		right = r;
	}
	DblListNode(int d) {
		data = d;
		left = 0;
		right = 0;
	}
};
#endif // !DBLLISTNODE_H

