#include<iostream>
#include"MatrixTerm.h"
#include"SparseMatrix.h"
using namespace std;
int main() {
	SparseMatrix p(3, 3, 0);
	p.NewTerm(0, 1, 2);
	p.NewTerm(2, 1, 3);
	cout << "原矩阵：" << endl;
	p.print();
	SparseMatrix q = p.FastTranspos();
	cout << "快速转置矩阵：" << endl;
	q.print();
	system("pause");
}