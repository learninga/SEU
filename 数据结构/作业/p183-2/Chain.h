#pragma once
#ifndef CHAIN_H
#define CHAIN_H
#include"ChainNode.h"
class Chain {
public:
	void Delete(ChainNode *);
	Chain(ChainNode*);
	void print();
private:
	ChainNode *first;
};
#endif // !CHAIN_H
