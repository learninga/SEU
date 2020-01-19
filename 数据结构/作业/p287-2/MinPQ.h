#pragma once
#ifndef MINPQ_H
#define MINPQ_H
template<class T>
class MinPQ {
public:
	MinPQ() {};
    ~MinPQ(){}
	virtual bool isEmpty() const = 0;
	virtual const T& Top() const = 0;
	virtual void Push(const T&) = 0;
	virtual void Pop() = 0;

};
#endif // !MINPQ
