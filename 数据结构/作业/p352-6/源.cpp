#include<iostream>
using namespace std;
bool *DFSvisted;
struct edgnode//��ʾ�߽��
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

//�����õ�����λ��
int local(ALGraph G, int s) {
	for (int i = 0; i < G.vernum; i++) {
		if (G.adjlist[i].v_data == s)
			return i;
	}
	return -1;
}

//����ͼ���ڽӱ���
void creat_graph(ALGraph &G) {
	int i, j, k;
	int v1, v2;
	edgnode *e, *p, *q;
	cout << "�����붥�����ͱ���" << endl;
	cin >> G.vernum >> G.edgnum;
	G.adjlist = new vnode[G.vernum];
	cout << "�����붥����Ϣ" << endl;
	for (i = 0; i < (G.vernum); i++) {
		cout << "��" << i + 1 << "�����㣺" << endl;
		cin >> G.adjlist[i].v_data;
		G.adjlist[i].firstedg = NULL;
	}
	for (k = 0; k<(G.edgnum); k++)
	{
		cout << "������ߣ�Vi,Vj���ϵĶ�����Ϣ:" << endl;
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

//DFS�޸İ����ȫ���·��ʹ��Ķ���
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
//�޸İ汾DFS�㷨��ʵ�ֺ���
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