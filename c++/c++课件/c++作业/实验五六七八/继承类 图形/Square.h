#pragma once
#ifndef SQUARE_H
#define SQUARE_H
#include"TwoD.h"
class Square :public TwoD {
public:
	Square(double,double);
	~Square();
	virtual double getArea()const;
private:
	double length;
	double width;



};
#endif
