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
		//�ҵ�key��Ӧ�ڵ��Լ��丸�ڵ�
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
		//�����Ӧ��ΪҶ�ӽڵ�
		if (current->leftChild == nullptr&&current->rightChild == nullptr) {
			if (current == root)
				root = nullptr;
			else if (isLeft)
				parent->leftChild = nullptr;
			else
				parent->rightChild = nullptr;
		}
		//�����ǰ�ڵ�ֻ��һ����ڵ�
		else if (current->rightChild == nullptr&&current->leftChild != nullptr) {
			if (current == root)
				root = root->leftChild;
			else if (isLeft)
				parent->leftChild = current->leftChild;
			else
				parent->rightChild = current->leftChild;
		}
		//�����ǰ�ڵ�ֻ��һ���ҽڵ�
		else if (current->leftChild == nullptr&&current->rightChild != nullptr) {
			if (current == root)
				root = root->rightChild;
			else if (isLeft)
				parent->leftChild = current->rightChild;
			else
				parent->rightChild = current->rightChild;
		}
		//�����ǰ�ڵ������ڵ������ҽڵ�
		else {
			//�õ������滻p�ڵ�Ľڵ�ָ�뼴��������������
			TreeNode<K, E> *replace = current->leftChild;
			while (replace->rightChild) {
				replace = replace->rightChild;
			}
			current = replace;
			remove(replace->data.first);
		}
	}
	//�������remove������û��ɾ��key�Ľڵ�
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
