#include <iostream>
#include"Square.h"
using namespace std;
Square::Square(double l, double w) {
	if (l >= 0 && w >= 0)
	{
		length = l;
		width = w;
	}
	else
		throw invalid_argument("Length  and  width  must  be  bigger  than  0");
}
Square::~Square() {
	cout << "Destructor  in  Square  is  called." << endl;
}
double  Square::getArea()const{
	return length*width;
}