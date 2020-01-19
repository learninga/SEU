#include<iostream>
using namespace std;
#include"ChainList.h"
#include"ChainListtNode.h"
int main() {
	ChainListNode<int> end(10, NULL);
	ChainListNode<int> *p = &end;
	ChainListNode<int> *left = 0,*right=0;
	ChainListNode<int> i(9, p);
	p = &i;
	ChainListNode<int> h(8, p);
	p = &h;
	ChainListNode<int> g(7, p);
	p = &g;
	ChainListNode<int> f(6, p);
	right = &f;
	p = &f;
	ChainListNode<int> e(5, p);
	p = &e;
	left = p;
	ChainListNode<int> d(4, p);
	p = &d;
	ChainListNode<int> c(3, p);
	p = &c;
	ChainListNode<int> b(2, p);
	p = &b;
	ChainListNode<int> first(1, p);
	p = &first;
	ChainListl<int> test(p);
	test.Reserve(left, right);
	cout << test.getlData() << "       " << test.getrData() << endl;
	test.leftAll(2);
	cout << test.getlData() << "       " << test.getrData() << endl;
	test.rightAll(2);
	cout << test.getlData() << "       " << test.getrData() << endl;
	system("pause");
}