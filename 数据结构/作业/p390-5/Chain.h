#pragma once
template <class T> 
class Chain {
private:
	ChainNode<T>*first;
public:
	ChainNode<T>* getFirst() {
		return first;
	}

};