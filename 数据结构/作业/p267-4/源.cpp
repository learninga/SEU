#include<iostream>
#include"BTreeIterator.h"
#include"Stack.h"
#include"Tree.h"
#include"TreeNode.h"
using namespace std;
int main() {
	TreeNode *pl;
	TreeNode *pr;
	TreeNode left2(1);
	TreeNode right3(2);
	TreeNode left3(3);
	pl = &left2;
	pr = &right3;
	TreeNode left1(4, pl, pr);
	pl = &left3;
	TreeNode right1(5, pl);
	pl = &left1;
	pr = &right1;
	TreeNode root(6, pl, pr);
	TreeNode *proot = &root;
	Iterator iter(proot);
	TreeNode *node = iter.next();
	while (node) {
		cout << node->getData() << "    ";
		node = iter.next();
	}
	cout << endl;
	system("pause");
}