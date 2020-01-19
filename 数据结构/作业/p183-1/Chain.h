#pragma once
#ifndef CHAIN_H
#define CHAIN_H
#include"ChainNode.h"
class Chain {
public:
	int length();
	Chain(ChainNode*);
private:
	ChainNode *first;
};
#endif // !CHAIN_H
