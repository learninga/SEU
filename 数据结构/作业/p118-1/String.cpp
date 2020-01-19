#include"String.h"
#include<iostream>
using namespace std;

int String::i = 0;
String::String(char *a,int l) {
	pos = 0; length = l;
	ch = a; 
	ifend = 0;
	fre = new int[l];
	freCh = new char[l];
	for (int j = 0; j < l; j++) {
		fre[j] = 0;
		freCh[j] = 0;
	}
}
//判断处于String的pos位置处的character a是否与freCh之前的元素相同
//相同时为true 不同为false
bool String::isSame(char a) {
	for (int j = 0; j <= i; j++) {
		if (freCh[j] == a)  return true;
	}
	return false;
}

//当isSame返回值为true时调用这个函数得到位置
int String::samePos(char a) {
	for (int j = 0; j < i; j++) {
		if (freCh[j] == a) return j;
		else  continue;
	}
}


void String::Frequency() {
	while (ifend!=length) {
		//当前的character与freCh里所有的character都不一样
		if (isSame(ch[pos]) == false) {
			freCh[i] = ch[pos];
			fre[i] += 1;
			i++;
			pos++;
			ifend++;
		}
		//有相同项时
		else {
			int j = samePos(ch[pos]);
			fre[j] += 1;
			pos++;
			ifend++;
		}
	}
	for (int j = 0; j < i; j++) {
		cout << freCh[j] << "  appears  " << fre[j] << "  times.  " << endl;
	}
}
