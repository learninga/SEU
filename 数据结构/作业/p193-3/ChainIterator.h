#pragma once
#ifndef CHAINITERATOR_H
#define CHAINITERATOR_H
#include"ChainNode.h"
class ChainIterator {
private:
	ChainNode *current;
public:
	ChainIterator(ChainNode* startNode = 0)
	{
		current = startNode;
	}
	int& operator *() const { return current->data; }
	int* operator->() const { return &current->data; }
	ChainIterator& operator ++() // preincrement
	{
		current = current->link;
		return *this;
	}
	ChainIterator& operator ++(int) // postincrement
	{
		ChainIterator old = *this;
		current = current->link;
		return old;
	}
	bool operator !=(const ChainIterator right) const
	{
		return current != right.current;
	}
	bool operator == (const ChainIterator right) const
	{
		return current == right.current;
	}
};
#endif // !CHAINITERATOR_H
