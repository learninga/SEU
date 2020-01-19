#include<iostream>
#include"SparseMatrix.h"
using namespace std;
SparseMatrix::SparseMatrix()
{
	rows = 0;
	cols = 0;
	terms = 0;
	capacity = 100;
}
SparseMatrix::SparseMatrix(int r, int c, int t)
{
	rows = r;
	cols = c;
	terms = t;
	capacity = 100;
	smArray = new MatrixTerm[capacity];
}
void SparseMatrix::NewTerm(const int theRow, const int theCol, const int theValue)
{
	if (terms == capacity)
	{
		capacity *= 2;
		MatrixTerm* temp = new MatrixTerm[capacity];
		copy(smArray, smArray + terms, temp);
		delete[]smArray;
		smArray = temp;
	}
	smArray[terms].row = theRow;
	smArray[terms].col = theCol;
	smArray[terms++].value = theValue;

}
SparseMatrix SparseMatrix::FastTranspos()
{
	SparseMatrix b(cols, rows, terms);
	if (terms > 0)
	{
		int *rowSizeStart = new int[cols * 2];
		fill(rowSizeStart, rowSizeStart + cols, 0);
		for (int i = 0; i < terms; i++)
			rowSizeStart[smArray[i].col]++;

		rowSizeStart[cols] = 0;
		for (int i = cols + 1; i < cols * 2; i++)
			rowSizeStart[i] = rowSizeStart[i - 1] + rowSizeStart[i - 1 - cols];
		for (int i = 0; i < terms; i++)
		{
			int j = rowSizeStart[smArray[i].col + cols];
			b.smArray[j].row = smArray[i].col;
			b.smArray[j].col = smArray[i].row;
			b.smArray[j].value = smArray[i].value;
			rowSizeStart[smArray[i].col + cols]++;
		}
		delete[] rowSizeStart;
	}
	return b;
}
void SparseMatrix::print()
{
	for (int i = 0; i < terms; i++)
		cout << " ÐÐ:" << smArray[i].row << " ÁÐ:" << smArray[i].col << " Öµ£º" << smArray[i].value << endl;
	cout << endl;
}

 