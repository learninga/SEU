#pragma once
#include"Chain.h"
#include"ChainNode.h"
#include"LinkedGraph.h"
struct Pair
{
	int vertex;
	int dur;
	Pair operator=(Pair m) {
		Pair n;
		n.vertex = m.vertex;
		n.dur = m.dur;
		return n;
	}
};
class TopoIterator {
	friend class LinkedGraph;
private:
	ChainNode<Pair> *current;
	LinkedGraph mygraph;
public:
	TopoIterator();
	TopoIterator(LinkedGraph g) {
		current = g.getFirst();
		LinkedGraph n(g.getN());
		mygraph = n;
	}
	ChainNode<Pair> *node() {
		return current;
	}
	TopoIterator& operator++() {
		ChainNode<Pair>*pre = current;
		mygraph.remove(current);
		current = pre->getLink();
		return *this;
	}
	TopoIterator& operator++(int n) {
		TopoIterator old = *this;
		ChainNode<Pair>*pre = current;
		mygraph.remove(current);
		current = pre->getLink();
		return old;
	}
	bool operator!=(const TopoIterator right)const {
		return current != right.current;
	}
	bool operator==(const TopoIterator right)const {
		return current == right.current;
	}
};