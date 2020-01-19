#pragma once
#ifndef BSTREE_H
#define BSTREE_H
#include"ThreadedTree.h"
template<class T>
class BSTree {
private:
	ThreadedNode<T>*root;
public:
	BSTree(ThreadedNode<T>* proot) {
		root = proot;
		}



};
#endif // !BSTREE_H
