#pragma once
#ifndef WINNERTREE_H
#define WINNERTREE_H
template<class T>
class WinnerTree {
private:
	int k;
	T* leave;
	T *winnerTree;
public:
	WinnerTree(int kValue);
	void Build();
	T getWinner()const ;
};
#endif // !WINNERTREE_H
