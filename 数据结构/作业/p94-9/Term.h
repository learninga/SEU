#pragma once
#ifndef TERM_H
#define TERM_H
#include"Polynomial.h"
class  Term {
		friend class Polynomial;
public: Term();
private:
		float coef;//ϵ��
		int exp;  //ָ��
 };
#endif // !TERM_H
