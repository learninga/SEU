#include<iostream>
using namespace std;
bool *DFSvisted;
struct edgnode//表示边结点
{
	int adjvex;
	edgnode *next;
};
struct vnode
{
	edgnode *firstedg;
	int v_data;

};
struct ALGraph{
	vnode* adjlist;
	int vernum, edgnum;
};
int main() {
	ALGraph test;
    void creat_graph(ALGraph &G);
	void DFS_search(ALGraph &G,int d);
	creat_graph(test);
	cout << "请输入需要搜索数" << endl;
	int sear = 0;
	cin >> sear;
	DFS_search(test, sear);
	system("pause");

}
//用来得到所在位置
int local(ALGraph G, int s) {
	for (int i = 0; i < G.vernum; i++) {
		if (G.adjlist[i].v_data == s)
			return i;
	}
	return -1;
}

//建立图的邻接表函数
void creat_graph(ALGraph &G) {
	int i, j, k;
	int v1, v2;
	edgnode *e, *p, *q;
	cout << "请输入顶点数和边数" << endl;
	cin >> G.vernum >> G.edgnum;
	G.adjlist = new vnode[G.vernum];
	cout << "请输入顶点信息" << endl;
	for (i = 0; i < (G.vernum); i++) {
		cout << "第" << i + 1 << "个顶点：" << endl;
		cin >> G.adjlist[i].v_data;
		G.adjlist[i].firstedg= NULL;
	}
	for (k = 0; k<(G.edgnum); k++)
	{
		cout << "请输入边（Vi,Vj）上的顶点信息:" << endl;
		cin >> v1 >> v2;
		i = local(G, v1);
		j = local(G, v2);

		if (G.adjlist[i].firstedg == NULL)
		{
			e = new edgnode;
			e->adjvex = j;
			e->next = NULL;
			G.adjlist[i].firstedg = e;
		}
		else
		{
			p = G.adjlist[i].firstedg;
			while (p->next != NULL)
			{
				p = p->next;
			}
			e = new edgnode;
			e->adjvex = j;
			e->next = NULL;
			p->next = e;
		}
		if (G.adjlist[j].firstedg == NULL)
		{
			e = new edgnode;
			e->adjvex = i;
			e->next = NULL;
			G.adjlist[j].firstedg = e;
		}
		else
		{
			p = G.adjlist[j].firstedg;
			while (p->next != NULL)
			{
				p = p->next;
			}
			e = new edgnode;
			e->adjvex = i;
			e->next = NULL;
			p->next = e;
		}
	}
}

//深度优先搜索算法
bool DFS(ALGraph &G,int i,int d) {
	edgnode *e;
	DFSvisted[i] = true;
	e = G.adjlist[i].firstedg;
	while (e)
	{
		if (!DFSvisted[e->adjvex]&&e->adjvex!=d)
			DFS(G, e->adjvex,d);
		if (!DFSvisted[e->adjvex] && e->adjvex == d)
			return true;
		e = e->next;
	}
	return false;
}
//算法搜索实现函数
void DFS_search(ALGraph &G,int d) {
	DFSvisted = new bool[G.vernum];
	for (int i = 0; i < G.vernum; i++)
		DFSvisted[i] = false;
	for (int i = 0; i < G.vernum; i++) {
		if (!DFSvisted[i]) {
			if (DFS(G, i, d)) {
				cout << d << "  is  in  this  graph  at  " << i << endl;
				break;
			}
			else
				cout << d << "  is  not  in  this  graph" << endl;
		}
	}
}