#include<iostream>
#include"Kruskal.h"
using namespace std;
bool operator<(const Edge& e1, const Edge& e2) {
	return e1.weight < e2.weight;
}
Kruskal::Kruskal(const int& vertexNum, const int& edgeNum) {
	this->vertexNum = vertexNum;
	this->edgeNum = edgeNum;
	mq = new MergeQuery(vertexNum);
	edges = new Edge[edgeNum];
	minimalSpanningTree = new int[vertexNum - 1];
}
Kruskal::~Kruskal() {
	if (mq != NULL)
		delete mq;
	if (edges != NULL)
		delete[] edges;
}
void Kruskal:: getEdge() {
	for (int i = 0; i < edgeNum; ++i) {
		cout << "请依次输入边的两个顶点以及边的权重值" << endl;
		cin >> edges[i].vertex1 >> edges[i].vertex2 >> edges[i].weight;
	}
}
void Kruskal::minimalSpanning() {
	sort(edges, edges + edgeNum);
	int treeEdgeNum = 0;
	for (int i = 0; i < edgeNum; ++i) {
		int A = mq->query(edges[i].vertex1);
		int B = mq->query(edges[i].vertex2);
		if (A != B) {
			mq->merge(A, B);
			minimalSpanningTree[treeEdgeNum++] = i;
		}
	}
}
void Kruskal::getTree() {
	int weightSum = 0;
	cout << "最小生成树: (v1, v2, weight)" << endl;
	for (int i = 0; i < vertexNum - 1; ++i) {
		weightSum += edges[minimalSpanningTree[i]].weight;
		cout << edges[minimalSpanningTree[i]].vertex1 << ' '
			<< edges[minimalSpanningTree[i]].vertex2 << ' '
			<< edges[minimalSpanningTree[i]].weight << endl;
	}
	cout << "最小生成树边权值总和为: " << weightSum << endl;
}