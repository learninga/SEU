#pragma once
#ifndef CHAINNODE_H
#define CHAINNODE_H
using namespace std;
template<typename T>class ChainNode {
	friend class LinkedQueue;
private:
	ChainNode<T> *link;
	T data;
public:
	ChainNode() {
		data = 0;
		link = 0;
	}
	ChainNode(T e, ChainNode<T> *l) {
		data = e;
		link = l;
	}
};
#endif // !CHAINNODE_H
