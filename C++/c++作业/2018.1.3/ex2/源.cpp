#include<iostream>
using namespace std;
class Date
{
public:
	int Year, Month, Day;
	Date(int year, int month, int day)
	{	};
	void displayDate(int, int, int);
	bool Check(int, int, int);
};
 void Date::displayDate(int year, int month, int day) {
	cout << month << '/' << day << '/' << year;
 };
 bool Date::Check(int year, int month, int day) {
	 if (month == 1 && 3 && 5 && 7 && 8 && 10 && 12) {
		 if (day <= 31) {
			 return 1;
		 }
		 else
			 return 0;
	 }
	 else if (month != 2) {
		 if (day <= 30) {
			 return 1;
		 }
		 else
			 return 0;
	 }
	 if (year % 100 == 0) {
		 if (year % 4 == 0) {
			 return 1;
		 }
		 else
			 return 0;
	 }
	 else
	 {
		 if (year % 4 == 0) {
			 return 1;
		 }
		 else {
			 return 0;
		 }
	 }
 }
	
int main()
{
	cout << "Please enter Year   Month    Day" << endl;
	int a = 0, b = 0, c = 0;
	cin >> a >> b >> c;
	Date result(a,b,c);
	Date n(a, b, c);
	int x = n.Check(a,b,c);
	if (x == 1) {
		cout << "Date is:";
		result.displayDate(a, b, c);
	}
	else
		cout << "Error" << endl;

}