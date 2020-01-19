#pragma once
#ifndef CHAIN_H
#define CHAIN_H
#include"ChainNode.h"
#include"ChainIterator.h"
#include<iostream>
#include <vector>
#include <iterator>
using namespace std;
class Chainl {
private:
	ChainNode *first;
public:
	Chainl() { first = 0; };
	Chainl::Chainl(ChainNode *x) {
		first = x;
	}
	ChainIterator* begin() { return &ChainIterator(first); }
	ChainIterator* end() { return &ChainIterator(0); }
	void copyChain() {
		ChainNode *temp = first;
		ChainIterator *be = this->begin();
		ChainIterator *end = this->end();
		int length = 0;
		while (temp) {
			length++;
			temp = temp->link;
		}
		int *array = new int[length];
		copy(be, end, array);
		for (int j = 0; j<length; j++)
			cout << array[j];
		cout << endl;
	}
};
#endif // !CHAIN_H