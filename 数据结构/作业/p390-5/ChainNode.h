#pragma once
template<class T>
class ChainNode {
private:
	T data;
	ChainNode<T>* next;
public:
	ChainNode<T>* operator=(ChainNode<T>* p) {
		ChainNode<T>*n;
		n->data = p->data;
		n->next = p->next;
	}
	ChainNode<T>* getLink()const {
		return next;
	}
	void setLink(ChainNode<T>*p) {
		next = p;
	}
	T get_data()const {
		return dta;
	}
};