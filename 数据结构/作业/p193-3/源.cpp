#include<iostream>
#include"Chain.h"
#include"ChainIterator.h"
#include"ChainNode.h"
using namespace std;
int main() {
	//初始化一个链表的链节点  从尾部加入数据
	ChainNode end(5, NULL);
	ChainNode *p = &end;
	ChainNode d(4, p);
	p = &d;
	ChainNode c(3, p);
	p = &c;
	ChainNode b(2, p);
	p = &b;
	ChainNode first(1, p);
	p = &first;

	//构建链
	Chainl test(p);
	test.copyChain();
	system("pause");
}