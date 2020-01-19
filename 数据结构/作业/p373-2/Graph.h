#pragma once
#include <list>
#include<iostream>
using namespace std;

// 邻接表节点
class AdjListNode {

private:
	int v;
	int weight;

public:
	AdjListNode(int v, int w) {
		this->v = v;
		weight = w;
	}

	int getV() {
		return v;
	}

	int getWeight() {
		return weight;
	}

};

// 图
class Graph {

private:
	int V;    // 顶点个数
	list<AdjListNode> *adj;

public:
	Graph(int V);
	void addEdge(int u, int v, int weight);
	void shortestPath();
};
