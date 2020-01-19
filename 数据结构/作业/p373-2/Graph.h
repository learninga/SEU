#pragma once
#include <list>
#include<iostream>
using namespace std;

// �ڽӱ�ڵ�
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

// ͼ
class Graph {

private:
	int V;    // �������
	list<AdjListNode> *adj;

public:
	Graph(int V);
	void addEdge(int u, int v, int weight);
	void shortestPath();
};
