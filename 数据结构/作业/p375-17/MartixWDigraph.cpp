#include<iostream>
#include<iomanip>
#include<stack>
#include"MartixWDigraph.h"
using namespace std;

MartixWDigraph::MartixWDigraph(int v)
{
	if (v < 0)
		throw"vertices cannot < 0";
	vertices = v;
	edgesList = new int*[vertices];
	edges = 0;
	for (int i = 0; i < vertices; i++) {
		edgesList[i] = new int[vertices];
		fill(edgesList[i], edgesList[i] + vertices, 0);
	}
}

void MartixWDigraph::addEdge(int u, int v, int l)
{
	edgesList[u][v] = l;
	edges++;
}

void MartixWDigraph::AllLengths()
{
	int** a = new int*[vertices];
	stack<int>** paths = new stack<int>*[vertices];
	for (int i = 0; i < vertices; i++) {
		a[i] = new int[vertices];
		paths[i] = new stack<int>[vertices];
		fill(a[i], a[i] + vertices, 0);
		for (int j = 0; j < vertices; j++)
		{
			a[i][j] = edgesList[i][j];
			paths[i][j].push(i);
			paths[i][j].push(j);
		}
	}

	for (int k = 0; k < vertices; k++)
		for (int i = 0; i < vertices; i++)
			for (int j = 0; j < vertices; j++) {
				if ((a[i][k] + a[k][j]) < a[i][j] || (!a[i][j] && i != j))
				{
					a[i][j] = a[i][k] + a[k][j];
					paths[i][j].pop();
					paths[i][j].push(k);
					paths[i][j].push(j);
				}
			}

	for (int i = 0; i < vertices; i++) {
		for (int j = 0; j < vertices; j++)
			if (i != j && !a[i][j])
				cout << setw(5) << "¡Þ";
			else
				cout << setw(5) << a[i][j];
		cout << endl;
	}

	cout << endl;
	for (int i = 0; i < vertices; i++) {
		for (int j = 0; j < vertices; j++)
			if (i != j && !a[i][j])
				cout << i << " -> " << j << setw(5) << "¡Þ" << endl << endl;
			else {
				stack<int> temp;
				while (!paths[i][j].empty())
				{
					temp.push(paths[i][j].top());
					paths[i][j].pop();
				}
				cout << i << " -> " << j << " total length " << a[i][j] << endl;
				while (!temp.empty()) {
					int u = temp.top();
					temp.pop();
					int v = temp.top();
					if (temp.size() == 1)
						temp.pop();
					cout << u << " -> " << v << " length " << edgesList[u][v] << endl;
				}
				cout << endl;
			}
			cout << endl;
	}
}