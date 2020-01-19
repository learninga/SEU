#pragma once
#ifndef TESTEXCEPTION_H
#define TESTEXCEPTION_H
#include<iostream>
#include<stdexcept>
using namespace std;
class TestException :public runtime_error {
public:
	TestException();
	void f();
	void g();
	void h();
private:
	int m;
};
#endif
