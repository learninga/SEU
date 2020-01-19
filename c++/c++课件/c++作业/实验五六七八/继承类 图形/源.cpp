#include<iostream>
#include<iomanip>
#include<vector>
#include<typeinfo>
#include"Shape.h"
#include"TwoD.h"
#include"ThreeD.h"
#include"Square.h"
#include"Cube.h"
using namespace std;
int main() {
	cout << fixed << setprecision(2);
	double test(const Shape*);
	vector<Shape*>shape(2);
	shape[0] = new Square(3.0, 4.5);
	shape[1] = new Cube(2.1, 3.0, 5.2);
	for (int i = 0; i < 2; ++i) {
		cout<<"The  area  of  this  shape  is:  "<< shape[i]->getArea() << endl;
		if (shape[i]->type() == true)
			cout << "The  volume  of  this  shape  is:  " << shape[i]->getVolume()<<endl;
		else
			cout << "This  shape  is  a  two  dimesional  shape.\n";
		delete shape[i];
		cout << "\n\n\n";
		
	}
}
double test(const Shape*t) {
	return t->getArea();
}