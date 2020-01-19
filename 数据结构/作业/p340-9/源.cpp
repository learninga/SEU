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
	cin >> v_num >> e_num;//v_num为顶点个数，e_num为边的个数
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
	int num = 1;//num表示边的数量
	Edge temp;
	int v1, v2, ver_num;//输入的顶点值，v1为储存位置
	cin >> v1 >> v2;
	temp.set(v1,v2);
	ver_num=v1 ;//最开始输入时顶点等于v1表示邻接链表第v_num位
	while (num <= e_num) {
		//存入的还是同一顶点值
		if (temp.ver1 == ver_num) {
			if(ever[ver_num]==false) {
				ChainNode *node_temp = new ChainNode(temp.ver2);
				adj_list[ver_num] = node_temp;
				temp_list[ver_num] = node_temp;
				num++;//存入一条边
				cout << "the same v firstly is ok" << endl;
				ever[ver_num] = true;//已经不是空邻接链表
				cin >> v1 >> v2;//继续输入
				temp.set(v1, v2);
				continue;
			}
		else {
			ChainNode *node_temp = new ChainNode(temp.ver2);
			temp_list[ver_num]->setLink(node_temp);
			temp_list[ver_num] = node_temp;
			num++;//存入一条边
			cout << "the same v not first is ok" << endl;
			cout << "Please cin the number of vertices and edges." << endl;
			cin >> v1 >> v2;//继续输入
			temp.set(v1, v2);
			continue;
		}
		}
		//当前为另一顶点
		else {
			    ver_num = temp.ver1;//改到下一条边
				ChainNode *node_temp = new ChainNode(temp.ver2);
				adj_list[ver_num] = node_temp;
				temp_list[ver_num] = node_temp;
				num++;//存入一条边
				cout << "the differen v firstly is ok" << endl;
				ever[ver_num] = true;//已经不是空邻接链表
				cin >> v1 >> v2;//继续输入
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
void print_graph(ALGraph G) {
	cout << "所建立的邻接表如以下所示：" << endl;
	for (int i = 0; i<G.vernum; i++)
	{
		cout << G.adjlist[i].v_data;             //先输出顶点信息
		edgnode * e = G.adjlist[i].firstedg;
		while (e)                              //开始遍历输出每个边表所存储的邻接点的下标
		{
			cout << "-->" << e->adjvex;
			e = e->next;
		}
		cout << endl;
	}
}