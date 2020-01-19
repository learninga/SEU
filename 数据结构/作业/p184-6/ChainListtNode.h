#pragma once
#ifndef CHAINLISTNODE_H
#define CHAINLISTNODE_H
#include<iostream>
#include"ChainList.h"
template<class X>
class ChainListNode{
public:
	X data;
	ChainListNode<X> *link;
	ChainListNode(X element = 0, ChainListNode<X>*next = 0) {
		data = element; link = next;
	}
};
#endif // !CHAINLISTNODE_H
