#include<iostream>
#include<ctime>
#include"BST.h"
#include"TreeNode.h"
#include"Pair.h"
using namespace std;
int main() {
	int xunhuan(int n);
	cout << "n=100时 二叉查找树的高度为：" << xunhuan(100) << endl;
	cout << "n=500时 二叉查找树的高度为：" << xunhuan(500) << endl;
	cout << "n=1000时 二叉查找树的高度为：" << xunhuan(1000) << endl;
	cout << "n=2000时 二叉查找树的高度为：" << xunhuan(2000) << endl;
	cout << "n=3000时 二叉查找树的高度为：" << xunhuan(3000) << endl;
	cout << "n=4000时 二叉查找树的高度为：" << xunhuan(4000) << endl;
	cout << "n=5000时 二叉查找树的高度为：" << xunhuan(5000) << endl;
	cout << "n=6000时 二叉查找树的高度为：" << xunhuan(6000) << endl;
	cout << "n=7000时 二叉查找树的高度为：" << xunhuan(7000) << endl;
	cout << "n=8000时 二叉查找树的高度为：" << xunhuan(8000) << endl;
	cout << "n=9000时 二叉查找树的高度为：" << xunhuan(9000) << endl;
	cout << "n=10000时 二叉查找树的高度为：" << xunhuan(10000) << endl;
	system("pause");
}
int xunhuan(int n) {
	{
		srand((unsigned)time(NULL));
		int a = rand();
		TreeNode<int, int> *root = new TreeNode<int, int>(Pair<int, int>(a,a+1));
		BSTree<int, int> temp(root);
		for (int i = 0; i < n - 1; i++) {
			a = rand();
			temp.insert(Pair<int, int>(a, a + 1));
		}
		return temp.getHeight(root);
	}
}