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
	int validEntry(int x) const//��x��0��100֮��ʱ����1�����򷵻�0
	{
		return (x >= 0 && x <= 100);
	} 
}; 

#endif

