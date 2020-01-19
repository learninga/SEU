#pragma once
#ifndef TIME_H
#define TIME_H
#include <iostream>
using namespace std;
class Time {
public:
	Time(int = 0, int = 0, int = 0);
	void setTime(int, int, int);
	void setHour(int);
	void setMinute(int);
	void setSecond(int);
	int getHour();
	int getMinute();
	int getSecond();
	void tick();
private:
	int hour;
	int minute;
	int second;
};
#endif