#include<iostream>
#include<iomanip>
#include<stdexcept>
#include"Time.h"
using namespace std;
Time::Time(int hour, int minute, int second) {
	setTime(hour, minute, second);
}
void Time::setTime(int h,int m, int s) {
	setHour(h);
	setMinute(m);
	setSecond(s);
}
void Time::setHour(int h) {

		hour = h;
}
void Time::setMinute(int m) {
	
		minute = m;
	
}
void Time::setSecond(int s) {
	
		second = s;
	
}
int Time::getHour() {
	if(hour<=12)return hour;
	else return hour - 12;
}
int Time::getMinute() {
	if(minute<=59)	return minute;
	else return minute / 60;
}
int Time::getSecond() {
	if (second < 59)return second;
	else return second % 60;
}
void Time::tick() {
	if (second <= 59) {
		if (minute <= 59) {
			if (hour <= 23)cout << setfill('0') << setw(2) << getHour() << ":" << setw(2) << getMinute() << ":" << setw(2) << getSecond() << (hour < 12 ? "AM" : "PM") << endl;
			else {
				hour = hour % 24;
				cout << setfill('0') << setw(2) << getHour() << ":" << setw(2) << getMinute() << ":" << setw(2) << getSecond() << (hour < 12 ? "AM" : "PM") << endl;
			}
		}
		else {
			if (hour <= 23)cout << setfill('0') << setw(2) << getHour() << ":" << setw(2) << getMinute() << ":" << setw(2) << getSecond() << (hour < 12 ? "AM" : "PM") << endl;
			else {
				hour = hour % 24 + minute / 60;
				minute = minute % 60;
				cout << setfill('0') << setw(2) << getHour() << ":" << setw(2) << getMinute() << ":" << setw(2) << getSecond() << (hour < 12 ? "AM" : "PM") << endl;
			}
		}
	}
	else {
		if (minute <= 59) {
			if (hour <= 23) {
				minute = minute + second / 60;
				hour = hour + minute / 60;
				second = second % 60;
				hour = hour % 24;
				minute = minute % 60;
				cout << setfill('0') << setw(2) << getHour() << ":" << setw(2) << getMinute() << ":" << setw(2) << getSecond() << (hour < 12 ? "AM" : "PM") << endl;
			}
			else {
				hour = hour % 24;
				minute = minute + second / 60;
				hour = hour + minute / 60;
				second = second % 60;
				hour = hour % 24;
				minute = minute % 60;

				cout << setfill('0') << setw(2) << getHour() << ":" << setw(2) << getMinute() << ":" << setw(2) << getSecond() << (hour < 12 ? "AM" : "PM") << endl;
			}
		}
		else {
			if (hour <= 23) {
				minute = minute + second / 60;
				hour = hour + minute / 60;
				minute = minute % 60;
				second = second % 60;
				hour = hour % 24;
			cout << setfill('0') << setw(2) << getHour() << ":" << setw(2) << getMinute() << ":" << setw(2) << getSecond() << (hour < 12 ? "AM" : "PM") << endl;
			}
				
			else {
				minute = minute + second / 60;
				hour = hour + minute / 60;
				minute = minute % 60;
				second = second % 60;
				hour = hour % 24;
				cout << setfill('0') << setw(2) << getHour() << ":" << setw(2) << getMinute() << ":" << setw(2) << getSecond() << (hour < 12 ? "AM" : "PM") << endl;
			}
		}
	}
}
	