#pragma once
#ifndef LOSERTREE_H
#define LOSERTREE_H
template <class T>
class LoserTree {
public:
	void Build(int kValue);
	LoserTree();
private:
	int k;//��ʾleave��record��������С
	T *leave;
	T *loserTree;
	int getKey(int i);
	int getIndex(int i);
};
#endif // !LOSERTREE_H
