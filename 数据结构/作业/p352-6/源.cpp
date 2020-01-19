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
struct ALGraph {
	vnode* adjlist;
	int vernum, edgnum;
};

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
		G.adjlist[i].firstedg = NULL;
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

//DFS修改版输出全部新访问过的顶点
void DFS_modified(ALGraph &G, int i) {
	edgnode *e;
	DFSvisted[i] = true;
	cout << G.adjlist[i].v_data << "    ";
	e = G.adjlist[i].firstedg;
	while (e)
	{
		if (!DFSvisted[e->adjvex])
			DFS_modified(G, e->adjvex);
		e = e->next;
	}
}
//修改版本DFS算法的实现函数
void DFSM_transver(ALGraph &G) {
	DFSvisted = new bool[G.vernum];
	for (int i = 0; i < G.vernum; i++)
		DFSvisted[i] = false;
	for (int i = 0; i < G.vernum; i++) {
		if (!DFSvisted[i])
			DFS_modified(G, i);
	}
}
int main() {
	ALGraph test;
	void creat_graph(ALGraph &G);
	void DFSM_transver(ALGraph &G);
	creat_graph(test);
	DFSM_transver(test);
	system("pause");
}