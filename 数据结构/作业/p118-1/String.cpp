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
//�жϴ���String��posλ�ô���character a�Ƿ���freCh֮ǰ��Ԫ����ͬ
//��ͬʱΪtrue ��ͬΪfalse
bool String::isSame(char a) {
	for (int j = 0; j <= i; j++) {
		if (freCh[j] == a)  return true;
	}
	return false;
}

//��isSame����ֵΪtrueʱ������������õ�λ��
int String::samePos(char a) {
	for (int j = 0; j < i; j++) {
		if (freCh[j] == a) return j;
		else  continue;
	}
}


void String::Frequency() {
	while (ifend!=length) {
		//��ǰ��character��freCh�����е�character����һ��
		if (isSame(ch[pos]) == false) {
			freCh[i] = ch[pos];
			fre[i] += 1;
			i++;
			pos++;
			ifend++;
		}
		//����ͬ��ʱ
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
