#include<iostream>
#include"RationalNumber.h"
using namespace std;
RationalNumber::RationalNumber(int z , int m ) {
	if (fm == 0)cout << "Please  in  input  again.";
	else {
		for (int i = 1; i <= z || i <= m; i++) {
			if (z%i == 0 && m%i == 0) {
				fz = z / i; fm = m / i;
				continue;
			}
			else continue;
		}
		if (m<0) {
			fz = 0 - z; fm = 0 - m;
		}
		else {
			fz = z; fm = m;
		}
	}
}
void RationalNumber::smiplfy() {
	if (fz%fm != 0) {
		for (int i = 1; i <= fz || i <= fm; i++)
			if (fz%i == 0 && fm%i == 0) {
				fz = fz / i; fm = fm / i;
				continue;
			}
			else continue;
			if (fm < 0) {
				fz = 0 - fz; fm = 0 - fm;
			}
	}
	else { 
		fz = fz / fm; fm = 1; 
	}
}
RationalNumber RationalNumber::operator+(const RationalNumber&p) const {
	RationalNumber a;
	a.fz = fz*p.fm + fm*p.fz;
	a.fm = fm*p.fm;
	a.smiplfy();
	return a;
}
RationalNumber RationalNumber::operator-(const RationalNumber&p)const  {
	RationalNumber a;
	a.fz = fz*p.fm - fm*p.fz;
	a.fm = fm*p.fm;
	a.smiplfy();
	return a;
}
RationalNumber RationalNumber::operator*(const RationalNumber&p)const {
	RationalNumber a;
	a.fz = fz*p.fz;
	a.fm = fm*p.fm;
	a.smiplfy();
	return a;
}
RationalNumber RationalNumber::operator/(const RationalNumber&p) const {
	RationalNumber a;
	a.fz = fz*p.fm;
	a.fm = fm*p.fz;
	a.smiplfy();
	return a;
}
bool RationalNumber::operator >(const RationalNumber&p)const {
	int a = fz*p.fm, b = fm*p.fz;
	if (a>b)return true;
	else return false;
}
bool RationalNumber::operator <(const RationalNumber&p) const{
	int a = fz*p.fm, b = fm*p.fz;
	if (a<b)return true;
	else return false;
}
bool RationalNumber::operator >=(const RationalNumber&p)const {
	int a = fz*p.fm, b = fm*p.fz;
	if (a >= b)return true;
	else return false;
}
bool RationalNumber::operator <=(const RationalNumber&p) const{
	int a = fz*p.fm, b = fm*p.fz;
	if (a <= b)return true;
	else return false;
}
bool RationalNumber::operator ==(const RationalNumber&p) const{
	if (fz == p.fz&&fm == p.fm)return true;
	else return false;
}
bool RationalNumber::operator !=(const RationalNumber&p) const{
	if (fz == p.fz&&fm == p.fm)return false;
	else return true;
}
int RationalNumber::getFz() {
	return fz;
}
int RationalNumber::getFm() {
	return fm;
}