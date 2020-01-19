#include"Graph.h"
#define INF INT_MAX

Graph::Graph(int v) {
	this->V = v;
	adj = new list<AdjListNode>[V];
}

void Graph::addEdge(int u, int v, int weight)
{
	AdjListNode node(v, weight);

	adj[u].push_back(node);
}

void Graph::shortestPath()
{
	int *dist = new int[V];
	fill(dist, dist + V, INF);
	dist[0] = 0;

	//循环遍历所有顶点和边,故时间复杂度为O(n+e)
	for (int j = 0; j < V; j++)
	{
		// 更新所有相邻的顶点
		list<AdjListNode>::iterator i;
		if (dist[j] != INF)
		{
			for (i = adj[j].begin(); i != adj[j].end(); ++i)
				if (dist[i->getV()] > dist[j] + i->getWeight())
					dist[i->getV()] = dist[j] + i->getWeight();
		}
	}

	// 打印结果
	for (int i = 0; i < V; i++) {
		cout << "0 -> " << i << " ";
		(dist[i] == INF) ? cout << "INFITE " : cout << dist[i];
		cout << endl;
	}

}
