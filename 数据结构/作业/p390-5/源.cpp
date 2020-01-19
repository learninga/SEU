#include<iostream>
#include"LinkedGraph.h"
#include"TopoIterator.h"
using namespace std;
int main() {
	LinkedGraph g(6);
	TopoIterator begin = g.begin();
	TopoIterator end = g.end();
	ChainNode<Pair> *node;
	while (begin != end) {
		node = begin.node();
		cout << node->get_data().vertex << "      ";
		begin++;
	}
	system("pause");
}