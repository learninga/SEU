#include"ChainNode.h"
#include"LinkedQueue.h"
using namespace std;
int main() {
	LinkedQueue<int>test;
	test.Push(1);
	test.Push(2);
	test.Push(3);
	test.print();
	test.Pop();
	test.print();
	system("pause");
}