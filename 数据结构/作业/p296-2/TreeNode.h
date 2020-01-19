#pragma once
#ifndef TREENODE_H
#define TREENODE_H
#include"Pair.h"
template<class K,class E>
class TreeNode {
public:
	Pair<K, E> data;
	TreeNode<K, E> *leftChild;
	TreeNode<K, E> *rightChild;
	TreeNode(Pair<K, E> e, TreeNode<K, E> *l = nullptr, TreeNode<K, E> * r = nullptr) {
		data = e;
		leftChild = l;
		rightChild = r;
	}


};
#endif // !TREENODE_H
