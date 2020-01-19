#include"MergeQuery.h"
using namespace std;
MergeQuery::MergeQuery(const int& vNum) : vertexNum(vNum) {
	component = new int[vNum];
	for (int i = 0; i < vNum; ++i) {
		component[i] = i;
	}
}
int MergeQuery::query(const int& v) const {
	return component[v]; 
}
void MergeQuery::merge(int A, int B) {
	for (int i = 0; i < vertexNum; ++i) {
		if (component[i] == B)
			component[i] = A;
	}
}
MergeQuery::~MergeQuery(){
	if (component != NULL)
		delete[] component;
}