#pragma once
#ifndef  CHAINNODE_H
#define CHAINNODE_H
#include "Chain.h"
class ChainNode {
	friend class Chain;
private:
	int data;
	ChainNode *link;
public:
	ChainNode(int element = 0, ChainNode* next = 0)
	{
		data = element; link = next;
	}
};
#endif // ! CHAINNODE_H
