#pragma once
#ifndef TWOD_H
#define TWOD_H
#include"Shape.h"
class TwoD :public Shape{
public:
	TwoD();
	~TwoD();
	virtual double getArea() const=0;
	virtual double getVolume()const {return 0;}
	virtual bool type()const;
};
#endif