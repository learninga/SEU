#pragma once
template<class T>
class ChainNode {
private:
	T data;
	ChainNode<T>* next;
public:
	void setLink(ChainNode<T> *p) {
		next = p;
	}
	ChainNode(T d, ChainNode<T> *l) {
		data = d;
		next = l;
	}
	T getData() {
		return data;
	}
	ChainNode<T>* getlink() {
		return next;
	}
};