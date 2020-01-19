#include<iostream>
#include"ThreadedNode.h"
#include"ThreadedTree.h"
using namespace std;
int main() {
	ThreadedNode<int> *r1 = new ThreadedNode<int>(7);
	ThreadedNode<int>*l1 = new ThreadedNode<int>(4);
	ThreadedNode<int> *r2 = new ThreadedNode<int>(5,NULL, r1);
	ThreadedNode<int>*l3 = new ThreadedNode<int>(2, l1, r2);
	ThreadedNode<int> *l2 = new ThreadedNode<int>(6);
	ThreadedNode<int> *r3 = new ThreadedNode<int>(3, l2);
	ThreadedNode<int> *root = new ThreadedNode<int>(1,l3,r3);
	ThreadedNode<int> *insert = new ThreadedNode<int>(8);
	ThreadedTree<int> threadedTree(root);
	threadedTree.InThread(root);
	threadedTree.inOrder(root);
	threadedTree.InsertLeft(insert, r1);
	threadedTree.inOrder(root);
	system("pause");
}