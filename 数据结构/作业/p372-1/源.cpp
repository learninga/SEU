#include<iostream>
#include"Tree.h"
using namespace std;
int main() {
	TreeNode *root=new TreeNode(1);
	TreeNode *a = new TreeNode(2);
	TreeNode *b = new TreeNode(3);
	TreeNode *c = new TreeNode(4);
	TreeNode*d = new TreeNode(5);
	TreeNode * e = new TreeNode(6);
	root->add_edge(7, a, 4, b);
	a->add_edge(2, c, 5, d);
	d->add_edge( 0,nullptr, 6, d);
	Tree t(root,6);
	t.shorest_path();
	system("pause");
}