#include<iostream>
#include"String.h"
using namespace std;
int main() {

	char*a = (char*)"abcdwelovechina";
	String s( a , 15);
	s.newfailureFunction();
	s.print();
	cout << s.fastFind(s);
	system("pause");
}