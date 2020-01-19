#include<iostream>
#include<string>
#include"Date.h"
using namespace std;
Date::Date(string m, int d, int y) {
	setYear(y); setMonth(m); setDay(d);
}
void Date::setYear(int Y) {
	if (Y > 0)year = Y;
	else throw  invalid_argument("Year  must  be  above 0 ");
}
void Date::setMonth(string M) {
	if (M == "January" || M == "Febuary" || M == "March" || M == "April" || M == "May" || M == "June"||M=="August"||M=="September"||M=="October"||M=="November"||M=="December")
		month = M;
	else throw  invalid_argument("Month  must  between  January  between  December");
}
void Date::setDay(int D) {
	if (month == "January" || month == "March" || month == "May" || month == "August" || month == "October" || month == "December") {
		if (D >= 1 && D <= 31)day = D;
		else throw  invalid_argument("day  must  between  1  and  31");
	}
	if (month== "April" || month == "June" || month == "September" || month == "November") {
		if (D >= 1 && D <= 30) day = D;
		else throw  invalid_argument("day  must  between  1  and  30");
	}
	if (month == "Febuary") {
		if (year % 4 == 0 || year % 400 == 0) {
			if (D >= 1 && D <= 29)day = D;
			else throw  invalid_argument("day  must  between  1  and  29");
		}
		else
		{
			if (D >= 1 && D <= 28)day = D;
			else throw  invalid_argument("day  must  between  1  and  28");
		}
	}
}
string Date::getMonth()const {
	return month;
}
int Date::getDate()const {
	return day;
}
int Date::getYear()const {
	return year;
}