#pragma once
#ifndef TREENODE_H
#define TREENODE_H
class TreeNode {
	friend class Tree;
	friend class Iterator;
private:
	int data;
	TreeNode *leftChild;
	TreeNode *rightChild;
public:
	TreeNode(int e, TreeNode*l=NULL, TreeNode *r=NULL) {
		data = e;
		leftChild = l;
		rightChild = r;
	}
	TreeNode* getLeftChild() {
		return leftChild;
	}
	TreeNode* getRightChild() {
		return rightChild;
	}
	int getData() {
		return data;
	}

};
#endif // !TREENODE_H

