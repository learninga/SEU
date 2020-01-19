#pragma once
#ifndef BST_H
#define BST_H
#include"Pair.h"
#include"TreeNode.h"
template<class K,class E>
class BSTree {
private:
	TreeNode<K,E>*root;
public:
	BSTree(TreeNode<K,E>*proot) {
		if (proot == NULL)
			cout << "illeage  input." << endl;
		else
			root = proot;
	}
	void remove(K key) {
		TreeNode<K, E> *current = root, *parent = root;
		bool isLeft = true;
		//找到key对应节点以及其父节点
		while (current->data.first != key) {
			if (key < current->data.first) {
				isLeft = true;
				parent = current;
				current = current->leftChild;
			}
			else if (key > current->data.first) {
				isLeft = false;
				parent = current;
				current = current->rightChild;
			}
			else if (current == nullptr)
				return ;
		}
		//如果对应的为叶子节点
		if (current->leftChild == nullptr&&current->rightChild == nullptr) {
			if (current == root)
				root = nullptr;
			else if (isLeft)
				parent->leftChild = nullptr;
			else
				parent->rightChild = nullptr;
		}
		//如果当前节点只有一个左节点
		else if (current->rightChild == nullptr&&current->leftChild != nullptr) {
			if (current == root)
				root = root->leftChild;
			else if (isLeft)
				parent->leftChild = current->leftChild;
			else
				parent->rightChild = current->leftChild;
		}
		//如果当前节点只有一个右节点
		else if (current->leftChild == nullptr&&current->rightChild != nullptr) {
			if (current == root)
				root = root->rightChild;
			else if (isLeft)
				parent->leftChild = current->rightChild;
			else
				parent->rightChild = current->rightChild;
		}
		//如果当前节点既有左节点又有右节点
		else {
			//得到可以替换p节点的节点指针即左子树当中最大的
			TreeNode<K, E> *replace = current->leftChild;
			while (replace->rightChild) {
				replace = replace->rightChild;
			}
			current = replace;
			remove(replace->data.first);
		}
	}
	//用来检测remove函数有没有删掉key的节点
	bool get(K key) {
		TreeNode<K, E> *current = root;
		while (current) {
			if (key < current->data.first)
				current = current->leftChild;
			else if (key > current->data.first)
				current = current->rightChild;
			else if (key == current->data.first)
				return true;
		}
		return false;
	}

};
#endif // !BST_H
