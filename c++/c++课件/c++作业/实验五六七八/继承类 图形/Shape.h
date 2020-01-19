#pragma once
#ifndef SHAPE_H
#define SHAPE_H
class Shape {
public:
	Shape();
	~Shape();
	virtual double getArea() const=0;
	virtual bool type()const=0;
	virtual double getVolume()const = 0;
};
#endif