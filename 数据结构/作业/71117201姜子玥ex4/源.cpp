#include"Kruskal.h"
using namespace std;
int main() {
		int vertexNum, edgeNum;
		cin >> vertexNum >> edgeNum;
		if (vertexNum > 10) {
			cout << "结点数量过多" << endl;
			return -1;
		}
		Kruskal k(vertexNum, edgeNum);
		k.getEdge(); // 输入图的所有边
		k.minimalSpanning(); // kruskal最小生成树算法
		k.getTree(); // 输出结果
		system("pause");
		return 0;
}