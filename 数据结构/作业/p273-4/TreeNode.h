#pragma once
#ifndef TREENODE_H
#define TREENODE_H
class TreeNode {
	friend class Tree;
private:
	int data;
	TreeNode *leftChild;
	TreeNode *rightChild;
public:
	TreeNode(int e = 0, TreeNode *l = nullptr, TreeNode *r = nullptr) {
		data = e;
		leftChild = l;
		rightChild = r;
	}
	


};
#endif // !TREENODE_H
