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
	int ifend;//���������ж�ch�Ƿ񵽴��յ�λ��
	int pos;//pos������ʾ����������λ��
	static int i;//i��ʾfre�������λ��
};


#endif