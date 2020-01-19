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

	//ѭ���������ж���ͱ�,��ʱ�临�Ӷ�ΪO(n+e)
	for (int j = 0; j < V; j++)
	{
		// �����������ڵĶ���
		list<AdjListNode>::iterator i;
		if (dist[j] != INF)
		{
			for (i = adj[j].begin(); i != adj[j].end(); ++i)
				if (dist[i->getV()] > dist[j] + i->getWeight())
					dist[i->getV()] = dist[j] + i->getWeight();
		}
	}

	// ��ӡ���
	for (int i = 0; i < V; i++) {
		cout << "0 -> " << i << " ";
		(dist[i] == INF) ? cout << "INFITE " : cout << dist[i];
		cout << endl;
	}

}
