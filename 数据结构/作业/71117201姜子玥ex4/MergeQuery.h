#pragma once
#include<iostream>
class MergeQuery {
public:
	MergeQuery(const int& vNum);
	~MergeQuery();
	int query(const int& v)const;
	void merge(int, int);
private:
	int vertexNum;
	int* component;
};