#include<iostream>
#include"Queue.h"
using namespace std;
struct edgnode//��ʾ�߽��
{
	int adjvex;
	edgnode *next;
};
struct vnode
{
	edgnode *firstedg;
	int v_data;//��ʾ����ı��

};
struct ALGraph {
	vnode* adjlist;
	int vernum, edgnum;
};//�����õ�����λ��
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

//������ȱ���
void BFStransver(ALGraph G) {

	edgnode * p;
	Queue<int>q;
	bool *BFSvisited = new bool[G.vernum];
	for (int i = 0; i<G.vernum; i++)
		BFSvisited[i] = false;
	for (int i = 0; i<G.vernum; i++)
	{
		if (!BFSvisited[i])
		{
			BFSvisited[i] = true;
			cout << G.adjlist[i].v_data << "  ";
			q.Push(i);
			while (!q.isEmpty())
			{
				int count = q.Front();
				q.Pop();
				p = G.adjlist[count].firstedg;
				while (p)
				{
					if (!BFSvisited[p->adjvex])
					{
						BFSvisited[p->adjvex] = true;
						cout << G.adjlist[p->adjvex].v_data << "  ";
						q.Push(p->adjvex);
					}
					p = p->next;
				}
			}
		}
	}
}
int main() {
	ALGraph test;
	creat_graph(test);
	BFStransver(test);
	system("pausu");
}
