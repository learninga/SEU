#pragma once
#ifndef CUBE_H
#define CUBE_H
#include "ThreeD.h"
class Cube:public ThreeD {
public:
	Cube(double,double,double);
	~Cube();
	virtual double  getArea()const;
	virtual double  getVolume()const;
private:
	double length;
	double width;
	double height;
};
#endif