#pragma once
#ifndef INTEGER_SET_H
#define INTEGER_SET_H

class IntegerSet
{
public:
	IntegerSet()
	{
		emptySet(); 
	} 
	IntegerSet(int[], int); 
	IntegerSet unionOfSets(const IntegerSet&);
	IntegerSet intersectionOfSets(const IntegerSet&);
	void emptySet(); 
	void inputSet(int ); 
	void insertElement(int);
	void deleteElement(int);
	void printSet() const;
	bool isEqualTo(const IntegerSet&) const;
private:
	int set[101]; // range of 0 - 100

				  // determines a valid entry to the set
	int validEntry(int x) const//当x在0到100之间时返回1，否则返回0
	{
		return (x >= 0 && x <= 100);
	} 
}; 

#endif

