#pragma once
#ifndef SPARSEMATRIX_H
#define SPARSEMATRIX_H
#include"MatrixTerm.h"
class SparseMatrix {
public:
	SparseMatrix();
	SparseMatrix(int r, int c, int t);
	SparseMatrix FastTranspos();
	void NewTerm(const int theRow, const int theCol, const int theValue);
	void print();
private:
	int rows;
	int cols;
	int terms;
	int capacity;//rows表示行数  cols表示列数
	MatrixTerm *smArray;
	
};
#endif // !SPARSEMATRIX_H
