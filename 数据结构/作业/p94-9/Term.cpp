#include<iostream>
#include"Polynomial.h"
#include"Term.h"
using namespace std;
Term::Term() {
	//设置所有原来初始值均为0
	coef = 0; exp = 0;
}