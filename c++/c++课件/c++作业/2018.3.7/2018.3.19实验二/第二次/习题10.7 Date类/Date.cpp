#include<iostream>
#include"Date.h"
#include<ctime>
using namespace std;
Date::Date() {
	struct tm *ptr;

	time_t t = time(0);
	ptr = localtime(&t);
	day = ptr->tm_mday;
	month = 1 + ptr->tm_mon;
	year = ptr->tm_year + 1900;

}
Date::Date(int dd,int yy ) {
	year = yy;
	int Month[12] = {1,2,3,4,5,6,7,8,9,10,11,12 };
	int m1 = dd / 30; int m = Month[m1];
	setMonth(m);
	if (yy % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
		switch (m) {
		case 1:setDay(dd); break; case 2:setDay(dd - 31); break;
		case 3:setDay(dd - 60); break; case 4:setDay(dd - 91); break;
		case 5:setDay(dd - 121); break; case 6:setDay(dd - 152); break;
		case 7:setDay(dd - 182); break; case 8:setDay(dd - 213); break;
		case 9:setDay(dd - 244); break; case 10:setDay(dd - 274); break;
		case 11:setDay(dd - 305); break; case 12:setDay(dd - 335); break;
		}
	}
	else {
		switch (m) {
		case 1:setDay(dd); break; case 2:setDay(dd - 31); break;
		case 3:setDay(dd - 59); break; case 4:setDay(dd - 90); break;
		case 5:setDay(dd - 120); break; case 6:setDay(dd - 151); break;
		case 7:setDay(dd - 181); break; case 8:setDay(dd - 212); break;
		case 9:setDay(dd - 243); break; case 10:setDay(dd - 273); break;
		case 11:setDay(dd - 304); break; case 12:setDay(dd - 334); break;
		}
	}
}
Date::Date(int dd, int mm, int yy) {
	year = yy;
	setMonth(mm);
	setDay(dd); 
}
Date::Date(string mm, int dd, int yy) {
	 year = yy;
	static const string month1[13] = { "0","January","Febuary","March","April","May","June","July","August","September","October","November","December" };
	int i = 1;
	for (; i != 13; i++) {
		if (mm == month1[i])break;
		else continue;
	}
	month = i;
	setDay(dd);
}
void Date::setDay(int d) {
    static const int daysPermonth[13] = { 0,31,28,31,30,31,30,31,31,30,31,30,31 };
	if (d > 0 && d <= daysPermonth[month])
		day = d;
	if (month == 2 && d == 29 && (year % 400 == 0 ||( year % 4 == 0 && year % 100 != 0)))day = d;
}
void Date::setMonth(int m) {
	if (m > 0 && m <= 12) month = m;
}
void Date::print() const {
	cout << month << "/" << day << "/" << year << endl;
}
void Date::printDDDYYYY()const {
	static const int num[13] = { 0,0,31,60,91,121,152,182,213,244,274,305,335 };
	if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
		int d1=num[month]+day;
		cout << d1 << "   " << year << endl;
	}
	else {
		int d2 = num[month] - 1 + day;
		cout << d2 << "  " << year << endl;
	}
}
void Date::printMMDDYY()const {
	int y1 = year % 100;
	if (day < 10 && month < 10)
		cout << "0" << month << "/" << "0" << day << "/";
	else {
		if (day < 10 && month >= 10)
			cout << month << "/" << "0" << day << "/";
		else
		{
			if (day >= 10 && month < 10)
				cout << "0" << month << "/" << day << "/";
			else cout << month << "/" << day << "/" << "/";
		}
	}
	if(y1!=0)	cout << y1 << endl;
	else cout << "0" << y1 << endl;
}
void Date::printMonthDDYYYY()const {
	 string month1[13] = { "0","January","Febuary","March","April","May","June","July","August","September","October","November","December" };
	cout << month1[month] << "    " << day << "    " << year << endl;
}
Date::~Date() {
	cout << "Date  object  destructor  for  date  "; print();
}