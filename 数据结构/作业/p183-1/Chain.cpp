#include"Chain.h"
using namespace std;
int Chain::length() {
	int nodeNum = 0;
	ChainNode *temp = first;
	while (temp) {
		nodeNum++;
		temp = temp->link;
	}
	return nodeNum;
}
Chain::Chain(ChainNode *x) {
	first = x;
}