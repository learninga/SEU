#pragma once
#include<cstdio>
#ifndef TREE_H
#define TREE_H
#include"TreeNode.h"
#include"Stack.h"
class Tree {
private:
	TreeNode *root;
public:
	Tree(TreeNode*x) {
		root = x;
	}
	void Preorder() {
		Stack<TreeNode*> s;
		TreeNode *currentNode = root;
		if (!currentNode) {
			cout << "Õâ¸öÊ÷Îª¿Õ" << endl;
		}
		else {
			while (1) {
				while (currentNode) {
					cout << currentNode->data << "  ";
					s.Push(currentNode);
					currentNode = currentNode->leftChild;
				}
				if (s.isEmpty())
					break;
				else {
					currentNode = s.Top();
					s.Pop();
					currentNode = currentNode->rightChild;
				}
			}
			cout << endl;
		}
	}
	void deleteAll(TreeNode *proot) {
		if (proot == NULL)
			return;
		deleteAll(proot->leftChild);
		deleteAll(proot->rightChild);
		delete proot;
		cout << "This  node  has  been  deleted." << endl;
	}
};
#endif // !TREE_H
