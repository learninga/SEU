#pragma once
#ifndef BST_H
#define BST_H
#include"Pair.h"
#include"TreeNode.h"
template<class K,class E>
class BSTree {
private:
	TreeNode<K, E> *root;
public:
	//��ʼ��
	BSTree(TreeNode<K, E>*proot) {
		if (proot == NULL)
			cout << "illeage  input." << endl;
		else
			root = proot;
	}
	//���뺯��
	void insert(const Pair<K,E> &thePair) {
		TreeNode<K, E> *p = root , *pp = 0;
		while (p) {
			pp = p;
			if (thePair.first < p->data.first)
				p = p->leftChild;
			else if (thePair.first > p->data.first)
				p = p->rightChild;
			else {
				p->data.second = thePair.second;
				return;
			}
		}
		p = new TreeNode<K, E>(thePair);
		if (root) {
			if (thePair.first < pp->data.first)
				pp->leftChild = p;
			else
				pp->rightChild = p;
		}
		else
			root = p;
	}
	//�õ�����
	int getHeight(TreeNode<K, E> *proot) {
		if (proot == NULL)
			return 0;
		else {
			int left = getHeight(proot->leftChild);
			int right = getHeight(proot->rightChild);
			return (left > right) ? (left + 1) : (right + 1);
		}
	}
};
#endif // !BST_H

