#pragma once
#ifndef CHAINITERATOR_H
#define CHAINITERATOR_H
#include"ChainNode.h"
class lChainIterator {
	friend class lChain;
private:
	lChainNode *current;
public:
	lChainIterator(lChainNode* startNode = 0)
	{
		current = startNode;
	}
	int& operator *() const { return current->data; }
	int* operator ->() const { return &current->data; }
	lChainIterator& operator ++() // preincrement
	{
		current = current->link;
		return *this;
	}
	lChainIterator& operator ++(int) // postincrement
	{
		lChainIterator old = *this;
		current = current->link;
		return old;
	}
	bool operator !=(const lChainIterator right) const
	{
		return current != right.current;
	}
	bool operator == (const lChainIterator right) const
	{
		return current == right.current;
	}
};
#endif // !CHAINITERATOR_H

