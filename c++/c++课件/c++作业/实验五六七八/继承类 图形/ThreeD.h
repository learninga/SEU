#pragma once
#ifndef THREED_H
#define THREED_H
#include "Shape.h"
class ThreeD :public Shape {
public:
	ThreeD();
	~ThreeD();
	virtual double getArea() const=0;
	virtual double getVolume()const=0;
	virtual bool type()const;
};
#endif