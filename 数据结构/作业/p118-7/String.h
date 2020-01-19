#pragma once
#ifndef STRING_H
#define STRING_H
class String {
public:
	String(char*, int);
	void Failurefunction();
	int Length();
private:
	int *f;
	char *str;
	int length;
};
#endif // !STRING_H

