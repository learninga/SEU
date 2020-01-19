#include<iostream>
#include"TestException.h"
using namespace std;
TestException::TestException() : runtime_error("constructor  is  called.") {};
void TestException::f() {
	cout << "This  is  in  f().\n" << "m  is  " << m << "  now.  \n";
	m = m * 10;
	g();
	cout << "The  function  of  f()  ends.\n";
}
void TestException::g() {
	cout << "This  is  in  g()\n" << "m  is  " << m << "  now  \n";
	m = m + 1;
	h();
	cout << "The  function  of  g()  ends\n";
}
void TestException::h() {
	cout << "This  is  in  h().\n" << "m  is  " << m << "  now  \n";
	throw  runtime_error("Error  is  in  h().\n");
}