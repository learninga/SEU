#include<iostream>
#include"LoserTree.h"
using namespace std;
int main() {
	cout << "------------test LoserTree-------------" << endl;
	cout << "Enter the number of loserTree leaves: ";
	int num;
	cin >> num;
	LoserTree testLoser(num);
	testLoser.Build();
	cout<<"The  winner  of  this  loser tree is  "<<testLoser.winner();
	testLoser.printTree();
	system("pause");
}