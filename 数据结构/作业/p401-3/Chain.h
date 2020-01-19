#pragma once
#include<iostream>
#include"ChainNode.h"
using namespace std;
template <class T>
class Chain {
private:
	ChainNode<T>* first;
public:
	ChainNode<T> *getFirst() {
		return first;
	}
	Chain(ChainNode<T> *f) {
		first = f;
	}
	void print() {
		ChainNode <T> *current = first;
		while (current) {
			cout << current->getData() << "        ";
			current = current->getlink();
		}
		cout << endl;
	}
};