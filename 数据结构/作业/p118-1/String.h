#pragma once
#ifndef STRING_H
#define STRING_H
class String {
public:
	String(char *,int n);
	void Frequency();
	bool isSame(char);
	int samePos(char);
private:
	char *ch;
	int *fre;
	char *freCh;
	int length;
	int ifend;//用来计数判断ch是否到达终点位置
	int pos;//pos用来表示查找数组里位置
	static int i;//i表示fre数组里的位置
};


#endif