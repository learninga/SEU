#include<iostream>
#include"Chainl.h"
#include"ChainIterator.h"
#include"ChainNode.h"
using namespace std;
int main() {
	//��ʼ��һ����������ڵ�  ��β����������
	lChainNode end(10, NULL);
	lChainNode *p = &end;
	lChainNode i(9, p);
	p = &i;
	lChainNode h(8, p);
	p = &h;
	lChainNode g(7, p);
	p = &g;
	lChainNode f(6, p);
	p = &f;
	lChainNode e(5, p);
	p = &e;
	lChainNode d(4, p);
	p = &d;
	lChainNode c(3, p);
	p = &c;
	lChainNode b(2, p);
	p = &b;
	lChainNode first(1, p);
	p = &first;

	//������
	lChain test(p);
	test.evalute(10);
	system("pause");
}