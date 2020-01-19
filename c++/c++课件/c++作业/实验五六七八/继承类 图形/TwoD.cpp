#include<iostream>
#include "TwoD.h"
using namespace std;
TwoD::TwoD() {
	cout << "Constructor  in  TwoD  is  called." << endl;
}
TwoD::~TwoD() {
	cout << "Destructor  in  TwoD  is  called." << endl;
}
bool TwoD::type()const {
	return false;
}