#include<iostream>
#include"ThreeD.h"
using namespace std;
ThreeD::ThreeD() {
	cout << "Constructor  in  ThreeD  is  called." << endl;
}
ThreeD::~ThreeD() {
	cout << "Destructor  in  ThreeD  is  called." << endl;
}
bool ThreeD::type() const {
	return true;
}