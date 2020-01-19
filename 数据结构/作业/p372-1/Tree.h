#pragma once
#include"TreeNode.h"
#ifndef TREE_H
#define TREE_H
class Tree {
private:
	TreeNode *root;
	int n;//表示树的节点个数
public:
	Tree(TreeNode *p, int num) { root = p; n = num; };
    void shorest_path();
};
#endif // !TREE_H
