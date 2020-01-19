#pragma once
#ifndef BTreeIterator
#define BTreeIterator
#include"TreeNode.h"
#include"Stack.h"
class Iterator {
	friend class Tree; 
private:
	Stack<TreeNode*> s;
public:
	Iterator(TreeNode *root) {
		while (root) {
			s.Push(root);
			root = root->getLeftChild();
		}
	}
	TreeNode* next() {
		TreeNode *top(nullptr);
		TreeNode *cur(nullptr);
		if (!s.isEmpty()) {
			top  = s.Top();
			cur = s.Top();
			s.Pop();
			cur = cur->getRightChild();
			while (cur) {
				s.Push(cur);
				cur = cur->getLeftChild();
			}
		}
		return top;
	}

};
#endif // !BTreeIterator
