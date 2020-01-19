#pragma once
#ifndef TERM_H
#define TERM_H
class   Term {
	friend class Polynomial;
private:
	float coe;//系数
	int exp;//指数
};
#endif // !TERM_H
