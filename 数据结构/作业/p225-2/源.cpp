#include"DblList.h"
#include"DblListNode.h"
using namespace std;
int main() {
	DblList a(1);
	a.print();
	a.Push(2);
	a.Push(3);
	DblList b(4);
	b.Push(5);
	a.print();
	b.print();
	a.Concatenate(b);
	a.print();
	system("pause");
}