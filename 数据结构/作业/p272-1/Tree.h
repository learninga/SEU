#pragma once
#ifndef TREE_H
#define TREE_H
#include"TreeNode.h"
#include"Stack.h"
class Tree {
private:
	TreeNode *root;
	int num;
public:
	Tree(TreeNode *x) {
		root = x;
		num = 0;
	}
	//非迭代方式求节点个数
	int nonReGetLeaf() {
		int count = 0;
		Stack<TreeNode*> s;
		TreeNode *currentNode = root;
		int j = 0;
		while (1) {
			while (currentNode) {
				if (currentNode->leftChild==NULL && currentNode->rightChild==NULL) {
					count++;
				}
				else{}
				s.Push(currentNode);
				currentNode = currentNode->leftChild;
			}
			if (s.isEmpty()) { break; }
			else {
				currentNode = s.Top();
				s.Pop();
				currentNode = currentNode->rightChild;
			}
		}
		return count;
	}
	//迭代的方式求节点个数
	int getLeave(TreeNode *p) {
		if (p == NULL)
		{
			return 0;
		}

		if (p->leftChild == NULL && p->rightChild == NULL)
		{
			num++;
		}

		getLeave(p->leftChild);
		getLeave(p->rightChild);
		return num;
	}
};
#endif // !TREE_h