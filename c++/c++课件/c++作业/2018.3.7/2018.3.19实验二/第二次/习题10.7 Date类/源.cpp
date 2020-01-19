#include<iostream>
#include"Date.h"
using namespace std;
int main() {
	Date test;
	Date test1(256, 1999);
	Date test2(21,5,2000);
	Date test3(1, 9, 2000);
	Date test4("March", 17, 2010);
	test1.print();test2.print(); test3.print();test4.print();
	test1.printDDDYYYY();test2.printDDDYYYY(); test3.printDDDYYYY(); test4.printDDDYYYY();
	test1.printMMDDYY();test2.printMMDDYY(); test3.printMMDDYY(); test4.printMMDDYY();
	test1.printMonthDDYYYY(); test2.printMonthDDYYYY(); test3.printMonthDDYYYY(); test4.printMonthDDYYYY();
	test.print(); test.printDDDYYYY(); test.printMMDDYY(); test.printMonthDDYYYY();
	return 0;
}