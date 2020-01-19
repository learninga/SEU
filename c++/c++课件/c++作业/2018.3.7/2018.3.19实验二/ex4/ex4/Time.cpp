#include<iostream>
#include"Time.h"
using namespace std;
Time::Time(int h1, int m1, int s1) {
	setTime(h1, m1, s1);
}
Time& Time::setTime(int hh, int mm, int ss) {
	setHour(hh); setMinute(mm); setSecond(ss);
	return *this;
}
Time& Time::setHour(int h) {
	totalSeconds = h * 3600;
	return *this;
}
Time& Time::setMinute(int m) {
	totalSeconds += m * 60;
	return *this;
}
Time& Time::setSecond(int s) {
	totalSeconds += s;
	return *this;
}
int Time::getHour()const {
	return totalSeconds / 3600;
}
int Time::getMinute()const {
	int a = getHour();
	int b = totalSeconds / 60 - a * 60;
	return b;
}
int Time::getSecond()const {
	int a = totalSeconds % 60;
	return a;
}
void Time::printUniversal() const{
	cout << getHour() << ":" << getMinute() << ":" << getSecond() << endl;
}
void Time::printStandard()const {
	int a = totalSeconds / 3600;
	if (a <= 12)
		cout << getHour() << ":" << getMinute() << ":" << getSecond() << "AM" << endl;
	else
		cout << getHour() - 12 << ":" << getMinute() << ":" << getSecond() << "PM" << endl;
}