#include"Kruskal.h"
using namespace std;
int main() {
		int vertexNum, edgeNum;
		cin >> vertexNum >> edgeNum;
		if (vertexNum > 10) {
			cout << "�����������" << endl;
			return -1;
		}
		Kruskal k(vertexNum, edgeNum);
		k.getEdge(); // ����ͼ�����б�
		k.minimalSpanning(); // kruskal��С�������㷨
		k.getTree(); // ������
		system("pause");
		return 0;
}