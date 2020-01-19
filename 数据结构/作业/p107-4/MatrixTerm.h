#pragma once
#include<iostream>
#ifndef MATRIXTERM_H
#define MATRIXTERM_H
class MatrixTerm {
	friend class SparseMatrix;
public:
	MatrixTerm();
private:
	int row, col, value;
};
#endif // !MATRIXTERM_H

