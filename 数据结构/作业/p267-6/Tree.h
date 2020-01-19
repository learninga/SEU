#pragma once
#ifndef TREE_H
#define TREE_H
#include"TreeNode.h"
#include"Stack.h"
class Tree {
private:
	TreeNode*root;
public:
	Tree(TreeNode* x) {
		root = x;
	}
	void Preorder() {
		Stack<TreeNode*> s;
		TreeNode *currentNode = root;
		while (1) {
			while (currentNode) {
				cout << currentNode->data<<"  ";
				s.Push(currentNode);
				currentNode = currentNode->leftChild;
			}
			if (s.isEmpty())
				return;
			else {
				currentNode = s.Top();
				s.Pop();
				currentNode = currentNode->rightChild;
			}
		}
		cout << endl;
	}
};
#endif