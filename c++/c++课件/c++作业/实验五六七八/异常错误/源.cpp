#include<iostream>
#include<stdexcept>
#include"TestException.h"
#pragma warning(disable:4290)
using namespace std;
int main()
{
	TestException a;
	try {
		cout << "Let's  have  a  test.\n";
		a.f();
		cout << "The  test  doesn't  end.\n";
	}
	catch (runtime_error &error) {
		cout << "In  main:" << error.what();
	}
	return 0;


}