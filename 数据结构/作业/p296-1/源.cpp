#include<iostream>
#include"BST.h"
#include"Pair.h"
#include"TreeNode.h"
using namespace std;
int main() {
	TreeNode<int,int> *pl;
	TreeNode<int, int> *pr;
	TreeNode<int, int> left2(Pair<int,int>(1,5));
	TreeNode<int, int> right3(Pair<int,int>(3,10));
	TreeNode<int, int> left3(Pair<int,int>(6,1));
	pl = &left2;
	pr = &right3;
	TreeNode<int, int> left1(Pair<int,int>(2,6), pl, pr);
	pl = &left3;
	TreeNode<int, int> right1(Pair<int,int>(5,10), pl);
	pl = &left1;
	pr = &right1;
	TreeNode<int, int> root(Pair<int,int>(4,10), pl, pr);
	TreeNode<int, int> *proot = &root;
	BSTree<int, int> test(proot);
	//测试叶子节点
	test.remove(1);
	if (test.get(1) == true) 
		cout << "remove key=1(叶子节点）  is  failed." << endl;
	else
		cout << "remove key=1 (叶子节点）is  successful." << endl;
	//测试度为1的node
	test.remove(5);
	if (test.get(5) == true)
		cout << "remove key=5(度为1的点）  is  failed." << endl;
	else
		cout << "remove key=5(度为1的点） is  successful." << endl;
	//测试移除度为2的node
	test.remove(2);
	if (test.get(2) == true)
		cout << "remove key=2（度为2）  is  failed." << endl;
	else
		cout << "remove key=2(度为2的点） is  successful." << endl;

	system("pause");
}