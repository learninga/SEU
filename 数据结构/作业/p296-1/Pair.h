#pragma once
#ifndef PAIR_H
#define PAIR_H
template<class K,class E>
class Pair {
public:
	K first;
	E second;
	Pair(K key=0, E value=0) {
		first = key;
		second = value;
	}
};
#endif // !PAIR_h
