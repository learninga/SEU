#include <iostream>
#include"Chain.h"
#include"ChainNode.h"
using namespace std;
int main() {
	//初始化一个链表的链节点  从尾部加入数据
	ChainNode end(6, NULL);
	ChainNode *p = &end;
	ChainNode d(5, p);
	p = &d;
	ChainNode c(4, p);
	p = &c;
	ChainNode b(3, p);
	p = &b;
	ChainNode a(2, p);
	p = &a;
	ChainNode first(1, p);
	p = &first;

	Chain test(p);
	test.print();
	cout << endl;
	ChainNode *x = &b;
	test.Delete(x);
	test.print();
	cout << endl;
	system("pause");
}