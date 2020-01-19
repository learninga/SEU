#pragma once
#ifndef STRINF_H
#define STRING_H
class String {
public:
	String(char *init, int m);
	void newfailureFunction();
	int fastFind(String);
	void print();
private:
	char* str;
	int length;
	int *f;
};
#endif // !STRINF_Hd

