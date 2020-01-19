#pragma once
#ifndef  CHAINNODE_H
#define CHAINNODE_H
class ChainNode {
private:
	int data;
	ChainNode *link;
public:
	ChainNode(int element = 0) {
		data = element;
		link = 0;
	}
	void setLink(ChainNode *next) {
		link = next;
	}
	void setData(int d) {
		data = d;
	}
	int getData() {
		return data;
	}
	ChainNode* getLink() {
		return link;
	}
};
#endif // ! CHAINNODE_H