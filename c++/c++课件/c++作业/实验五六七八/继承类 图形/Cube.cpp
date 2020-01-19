#include<iostream>
#include"Cube.h"
using namespace std;
Cube::Cube(double l, double w, double h) {
	if (l >= 0 && w >= 0 && h >= 0) {
		length = l;
		width = w;
		height = h;
	}
	else
		throw invalid_argument("Length  width  and  height  must  be  bigger  than  0.");
}
Cube::~Cube() {
	cout << "Destructor  in  Cube  is  called." << endl;
}
double Cube::getArea()const {
	return 2 * (length*width + length*height + width*height);
}
double Cube::getVolume() const {
	return length*width*height;
}