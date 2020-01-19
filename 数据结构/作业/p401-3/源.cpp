#include<iostream>
#include"Chain.h"
using namespace std;
template<typename T>
void  InsertionSort(Chain<T> list, T new_data) {
	ChainNode<T> *e = new ChainNode<T>(new_data,NULL);
	ChainNode<T> *current = list.getFirst();
	ChainNode<T>*pre = current;
	while (current) {
		if (e->getData()<current->getData())
			break;
		pre = current;
		current = current->getlink();
	}
	if (current == NULL) {
		current->setLink(e);
	}
	else {
		pre->setLink(e);
		e->setLink(current);
	}
};
int main() {
	ChainNode<int> end(10, NULL);
	ChainNode<int> *p = &end;
	ChainNode <int>d(9, p);
	p = &d;
	ChainNode<int> c(7, p);
	p = &c;
	ChainNode<int> b(5, p);
	p = &b;
	ChainNode<int> a(3, p);
	p = &a;
	ChainNode <int>first(1, p);
	p = &first;

	Chain<int> test(p);
	test.print();
	InsertionSort(test, 8);
	test.print();
	system("pause");
}
