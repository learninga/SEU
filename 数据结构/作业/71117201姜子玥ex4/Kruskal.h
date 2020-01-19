#pragma once
#include<iostream>
#include<algorithm>
#include"MergeQuery.h"
using namespace std;
struct Edge {
	Edge(int vertex1 = 0, int vertex2 = 0, int weight = 0) {
		this->vertex1 = vertex1;
		this->vertex2 = vertex2;
		this->weight = weight;
	}
	int vertex1, vertex2, weight;
};
class Kruskal {
public:
	Kruskal(const int&, const int&);
	~Kruskal();
	void getEdge();
	void minimalSpanning();
	void getTree();
private:
	int vertexNum;
	int edgeNum;
	int* minimalSpanningTree;
	MergeQuery* mq;
	Edge* edges;
};
