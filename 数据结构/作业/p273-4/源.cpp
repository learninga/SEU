#include<iostream>
#include"Tree.h"
#include"TreeNode.h"
using namespace std;
int main() {
	//��ʼ������һ����
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
	Tree test(proot);
	cout << "ɾ������ǰ��" << endl;
	test.Preorder();
	cout << "ɾ���ڵ��" << endl;
	test.deleteAll(proot);
	system("pause");
}