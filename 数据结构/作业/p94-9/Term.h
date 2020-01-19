#pragma once
#ifndef TERM_H
#define TERM_H
#include"Polynomial.h"
class  Term {
		friend class Polynomial;
public: Term();
private:
		float coef;//系数
		int exp;  //指数
 };
#endif // !TERM_H
