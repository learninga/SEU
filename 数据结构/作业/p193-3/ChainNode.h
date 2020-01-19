#pragma once
#ifndef CHAINNODE_H
#define CHAINNODE_H
class ChainNode {
	friend class Chainl;
	friend class ChainIterator;
private:
	int data;
	ChainNode *link;
public:
	ChainNode(int element = 0, ChainNode* next = 0)
	{
		data = element; link = next;
	}
};
#endif