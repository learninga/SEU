#pragma once
#ifndef CHAINNODE_H
#define CHAINNODE_H
class lChainNode {
	friend class lChain;
	friend class lChainIterator;
private:
	int data;
	lChainNode *link;
public:
	lChainNode(int element = 0, lChainNode* next = 0)
	{
		data = element; link = next;
	}
};
#endif