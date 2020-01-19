#include"Graph.h"
#include<iostream>
using namespace std;
int main() {
	Graph g(6);
	g.addEdge(0, 2, 6);
	g.addEdge(0, 1, 2);
	g.addEdge(1, 3, 4);
	g.addEdge(1, 4, 2);
	g.addEdge(1, 2, 7);
	g.addEdge(2, 3, -1);
	g.addEdge(3, 4, -2);

	g.shortestPath();

	system("pause");
}