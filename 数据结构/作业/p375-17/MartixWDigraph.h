#pragma once
class MartixWDigraph {
public:
	MartixWDigraph(int v = 0);
	void addEdge(int u, int v, int l);
	void AllLengths();
private:
	int** edgesList;
	int vertices;
	int edges;
};
