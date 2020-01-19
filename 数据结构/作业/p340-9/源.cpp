#include<iostream>
#include"ChainNode.h"
using namespace std;
struct Edge
{
	int ver1;
	int ver2;
	void set(int m, int n) {
		ver1 = m; ver2 = n;
	}
};
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
int main() {
	void creatGraph();
	void creat_graph(ALGraph &G);
	void print_graph(ALGraph G);
	//creatGraph();
	ALGraph test;
	creat_graph(test);
	print_graph(test);
	system("pause");
}
void creatGraph() {
	void print(ChainNode*);
	cout << "Please cin the number of vertices and edges." << endl;
	int v_num = 0; int e_num = 0;
	cin >> v_num >> e_num;//v_numΪ���������e_numΪ�ߵĸ���
	e_num = e_num * 2;
	ChainNode* (*adj_list) = new ChainNode*[v_num+1];
	ChainNode*(*temp_list) = new ChainNode*[v_num + 1];
	bool *ever = new bool[v_num + 1];
	for (int i = 0; i < v_num + 1; i++)
		ever[i] = false;
	/*for (int i = 0; i < v_num + 1; i++) {
		adj_list[i]->setData(0);
	}*/
	cout << "Please enter the edges one by one(no edge is input twice)" << endl;
	int num = 1;//num��ʾ�ߵ�����
	Edge temp;
	int v1, v2, ver_num;//����Ķ���ֵ��v1Ϊ����λ��
	cin >> v1 >> v2;
	temp.set(v1,v2);
	ver_num=v1 ;//�ʼ����ʱ�������v1��ʾ�ڽ������v_numλ
	while (num <= e_num) {
		//����Ļ���ͬһ����ֵ
		if (temp.ver1 == ver_num) {
			if(ever[ver_num]==false) {
				ChainNode *node_temp = new ChainNode(temp.ver2);
				adj_list[ver_num] = node_temp;
				temp_list[ver_num] = node_temp;
				num++;//����һ����
				cout << "the same v firstly is ok" << endl;
				ever[ver_num] = true;//�Ѿ����ǿ��ڽ�����
				cin >> v1 >> v2;//��������
				temp.set(v1, v2);
				continue;
			}
		else {
			ChainNode *node_temp = new ChainNode(temp.ver2);
			temp_list[ver_num]->setLink(node_temp);
			temp_list[ver_num] = node_temp;
			num++;//����һ����
			cout << "the same v not first is ok" << endl;
			cout << "Please cin the number of vertices and edges." << endl;
			cin >> v1 >> v2;//��������
			temp.set(v1, v2);
			continue;
		}
		}
		//��ǰΪ��һ����
		else {
			    ver_num = temp.ver1;//�ĵ���һ����
				ChainNode *node_temp = new ChainNode(temp.ver2);
				adj_list[ver_num] = node_temp;
				temp_list[ver_num] = node_temp;
				num++;//����һ����
				cout << "the differen v firstly is ok" << endl;
				ever[ver_num] = true;//�Ѿ����ǿ��ڽ�����
				cin >> v1 >> v2;//��������
				temp.set(v1, v2);
				continue;
		}
	}
	//test
	cout << "-----------------------Test----------------------------"<<endl;
	for (int i = 0; i < v_num + 1; i++)
		print(adj_list[i]); 
}
void print(ChainNode *p) {
	ChainNode *temp = p;
	while (temp) {
		if (temp->getData() != 0) {
			cout << temp->getData() << "       ";
			temp = temp->getLink();
		}
		else
			temp = temp->getLink();
	}
	cout << endl;
}
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
void print_graph(ALGraph G) {
	cout << "���������ڽӱ���������ʾ��" << endl;
	for (int i = 0; i<G.vernum; i++)
	{
		cout << G.adjlist[i].v_data;             //�����������Ϣ
		edgnode * e = G.adjlist[i].firstedg;
		while (e)                              //��ʼ�������ÿ���߱����洢���ڽӵ���±�
		{
			cout << "-->" << e->adjvex;
			e = e->next;
		}
		cout << endl;
	}
}