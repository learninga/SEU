#include"Tree.h"
#include"TreeNode.h"
using namespace std;
int main() {
	//初始化构建一个树
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
	//调用函数进行测试
	//测试递归的求节点函数
	cout << test.getLeave(proot)<<endl;
	//测试非递归函数求节点函数
	cout << test.nonReGetLeaf() << endl;
	system("pause");
}