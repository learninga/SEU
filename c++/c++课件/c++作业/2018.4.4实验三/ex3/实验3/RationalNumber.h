#pragma once
#ifndef RATIONALNUMBER_H
#define RATIONALNUMBER_H
class RationalNumber {
public:
	RationalNumber(int = 0, int = 1);
	RationalNumber operator+(const RationalNumber&)const;
	RationalNumber operator-(const RationalNumber&)const;
	RationalNumber operator*(const RationalNumber&)const;
	RationalNumber operator/(const RationalNumber&)const;
	bool operator>(const RationalNumber&)const;
	bool operator<(const RationalNumber&)const;
	bool operator>=(const RationalNumber&)const;
	bool operator<=(const RationalNumber&)const;
	bool operator==(const RationalNumber&)const;
	bool operator!=(const RationalNumber&)const;
	void smiplfy();
	int getFz();
	int getFm();
private:
	int fz, fm;

};
#endif
