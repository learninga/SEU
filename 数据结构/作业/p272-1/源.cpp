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
	//���ú������в���
	//���Եݹ����ڵ㺯��
	cout << test.getLeave(proot)<<endl;
	//���Էǵݹ麯����ڵ㺯��
	cout << test.nonReGetLeaf() << endl;
	system("pause");
}