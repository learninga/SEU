#pragma once
#ifndef MAXPQ_H
#define MAXPQ_H
template<class T>
class MaxPQ {
public:
	MaxPQ() {};
	~MaxPQ() {}
	virtual bool isEmpty() const = 0;
	virtual const T& Top() const = 0;
	virtual void Push_binary(const T&) = 0;
};
#endif // !MAXPQ_H
