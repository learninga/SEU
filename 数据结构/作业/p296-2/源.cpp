#include<iostream>
#include<ctime>
#include"BST.h"
#include"TreeNode.h"
#include"Pair.h"
using namespace std;
int main() {
	int xunhuan(int n);
	cout << "n=100ʱ ����������ĸ߶�Ϊ��" << xunhuan(100) << endl;
	cout << "n=500ʱ ����������ĸ߶�Ϊ��" << xunhuan(500) << endl;
	cout << "n=1000ʱ ����������ĸ߶�Ϊ��" << xunhuan(1000) << endl;
	cout << "n=2000ʱ ����������ĸ߶�Ϊ��" << xunhuan(2000) << endl;
	cout << "n=3000ʱ ����������ĸ߶�Ϊ��" << xunhuan(3000) << endl;
	cout << "n=4000ʱ ����������ĸ߶�Ϊ��" << xunhuan(4000) << endl;
	cout << "n=5000ʱ ����������ĸ߶�Ϊ��" << xunhuan(5000) << endl;
	cout << "n=6000ʱ ����������ĸ߶�Ϊ��" << xunhuan(6000) << endl;
	cout << "n=7000ʱ ����������ĸ߶�Ϊ��" << xunhuan(7000) << endl;
	cout << "n=8000ʱ ����������ĸ߶�Ϊ��" << xunhuan(8000) << endl;
	cout << "n=9000ʱ ����������ĸ߶�Ϊ��" << xunhuan(9000) << endl;
	cout << "n=10000ʱ ����������ĸ߶�Ϊ��" << xunhuan(10000) << endl;
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