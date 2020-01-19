#pragma once
#ifndef DATE_H
#define DATE_H
#include <string>
using std::string;
class Date
{
public:
	Date(); // default constructor uses <ctime> functions to set date
	Date(int, int); // constructor using ddd yyyy format
	Date(int, int, int); // constructor using dd/mm/yy format
	Date(string, int, int); // constructor using Month dd, yyyy format
	void setDay(int); // set the day
	void setMonth(int); // set the month
	void print() const; // print date in month/day/year format
	void printDDDYYYY() const; // print date in ddd yyyy format
	void printMMDDYY() const; // print date in mm/dd/yy format
	void printMonthDDYYYY() const; // print date in Month dd, yyyy format
	~Date(); // provided to confirm destruction order
private:
	int month; // 1-12 (January-December)
	int day; // 1-31 based on month
	int year; // any year
};
#endif


