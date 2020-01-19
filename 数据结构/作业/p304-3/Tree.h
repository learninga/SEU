#pragma once
#ifndef TREE_H
#define TREE_H
#include<iostream>
using namespace std;
template<class T>
class TreeNode {
public:
	T data;
	TreeNode<T>*child;//森林中表示孩子  二叉树中表示左孩子
	TreeNode<T> *brother;//森林中为兄弟 二叉树中表示右孩子
public:
	TreeNode(T d = 0, TreeNode<T> *c = nullptr, TreeNode<T>*b = nullptr) {
		data = d;
		child = c;
		brother = b;
	}
	void set_child(TreeNode<T>*c) {
		this->child = c;
	}
	void set_brother(TreeNode<T> *b) {
		this->brother = b;
	}

};
template<class T>
class Tree {
private:
	TreeNode<T> *root;
public:
	Tree(TreeNode<T> *proot) {
		root = proot;
	}
	void preorder_trans() {
		preorder_trans(root);
	}
	void preorder_trans(TreeNode<T>*p) {
		if (p == NULL) return;
		cout << p->data << "   ";
		preorder_trans(p->child);
		preorder_trans(p->brother);
	}
};
template<class T>
class Forest {
private:
	TreeNode<T> *first;
public:
	Forest(TreeNode<T> *p) {
		first = p;
	}
	void create_forest() {
		cout << "构建森林，1代表构建孩子，2代表构建森林中的其他树，3代表结束" << endl;
		TreeNode<T> *current = first;
		int instruction = 0;
		cin >> instruction;
		while (instruction != 3) {
			cout << "输入节点值" << endl;
			T value;
			cin >> value;
		if (instruction == 1) {
			TreeNode<T> *child = new TreeNode<T>(value);
			current->set_child(child);
			current = current->child;
			cout << "构建森林，1代表构建孩子，2代表构建森林中的其他树，3代表结束" << endl;
			cin >> instruction;
		}
		else if (instruction == 2) {
			TreeNode<T> *brother = new TreeNode<T>(value);
			current->set_brother(brother);
			current = current->brother;
			cout << "构建森林，1代表构建孩子，2代表构建森林中的其他树，3代表结束" << endl;
			cin >> instruction;
		}
	}
		return;
	}
	Tree<T> creat_binaryTree() {
		TreeNode<T> *current_forest = first;
		TreeNode<T> *cu_binarytree = current_forest;
		Tree<T> tree(cu_binarytree);
		while (current_forest) {
			cu_binarytree = current_forest;
			if (current_forest->child&&current_forest->brother) {
				cu_binarytree->child = current_forest->child;
				cu_binarytree->brother = current_forest->brother;
				current_forest = current_forest->child;
				continue;
			}
			else if (current_forest->child&&!current_forest->brother) {
				cu_binarytree->child = current_forest->child;
				cu_binarytree->brother = nullptr;
				current_forest = current_forest->child;
				continue;
			}
			else if (!current_forest->child&&current_forest->brother) {
				cu_binarytree->child = nullptr;
				cu_binarytree->brother = current_forest->brother;
				current_forest = current_forest->brother;
			}
			else if (!current_forest->child && !current_forest->brother) {
				break;
			}
		}
		return tree;
	}
	void preorder_transForest() {
		preorder_transForest(first);
	}
	void preorder_transForest(TreeNode<T> *p) {
		if (p==nullptr)
			return;
		cout << p->data << "    ";
		preorder_transForest(p->child);
		preorder_transForest(p->brother);
	}
};


#endif // !TREE_H
