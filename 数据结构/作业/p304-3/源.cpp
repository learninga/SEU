#include<iostream>
#include"Tree.h"
using namespace std;
int main() {
	TreeNode<int> *p = new TreeNode<int>(1);
	Forest<int> forest(p);
	forest.create_forest();
	Tree<int> test = forest.creat_binaryTree();
	forest.preorder_transForest();
	cout << endl;
	test.preorder_trans();
	system("pause");
}