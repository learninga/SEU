#include<iostream>
#include"MartixWDigraph.h"
using namespace std;
int main() {
	MartixWDigraph martix(3);
	martix.addEdge(0, 1, 4);
	martix.addEdge(0, 2, 11);
	martix.addEdge(1, 2, 2);
	martix.addEdge(1, 0, 6);
	martix.addEdge(2, 0, 3);

	martix.AllLengths();

	system("pause");
}
