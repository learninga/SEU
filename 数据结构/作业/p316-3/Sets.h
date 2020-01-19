#pragma once
#ifndef SETS_H
#define SETS_H
#include<iostream>
using namespace std;
class Sets {
private:
	int *parent;
	int n;
public:
	Sets(int numofElements) {
		if (numofElements < 2)
			cout << "This is illeage." << endl;
		n = numofElements;
		parent = new int[n];
		for (int i = 0; i < n; i++)
			parent[i] = -1;
	}
	int getTop() {
		return parent[0];
	}
	void set(int i, int j) {
		if (i < n&&j < n)
			parent[i] = j;
		else
			cout << "This  is  wrong." << endl;
	}
	void SimpleUnion(int i, int j) {
		parent[i] = j;
	}
	int SimpleFind(int i) {
		while (parent[i] >= 0)
			i = parent[i];
		return i;
	}
	void WeightedUnion(int i, int j) {
		int temp = parent[i] + parent[j];
		if (parent[i] > parent[j]) {
			parent[i] = j;
			parent[j] = temp;
		}
		else {
			parent[j] = i;
			parent[i] = temp;
		}
	}
	int CollapsingFind(int i) {
		int r = i;
		for(;parent[r]>=0;r=parent[r])
			while (i != r) {
				int s = parent[i];
				parent[i] = r;
				i = s;
			}
		return r;
	}
};
#endif // !SETS_H
