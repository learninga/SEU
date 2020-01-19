#pragma once
#ifndef DATE_H
#define DATE_H
#include<string>
#include<iostream>
using namespace std;
class Date {
public:
	Date(string, int , int );
	void setMonth(string);
	void setDay(int);
	void setYear(int);
	int getDate()const;
    string getMonth()const;
	int getYear()const;
private:
	string month;
	int day;
	int year;
};
#endif
