#pragma once
#ifndef CHAIN_H
#define CHAIN_H
#include"ChainNode.h"
#include"ChainIterator.h"
#include<iostream>
#include <vector>
#include <iterator>
using namespace std;
class lChain {
private:
	lChainNode *first;
public:
	lChain() { first = 0; };
	lChain::lChain(lChainNode *x) {
		first = x;
	}
	lChainIterator begin() { return lChainIterator(first); }
	lChainIterator end() { return lChainIterator(0); }
	//��������ֵ
	void input(int n) {
		cout << "�뿪ʼ��������ֵ" << endl;
		int i = 1; int value = 0;
		cin >> value;
		first->data = value;
		while (i < n) {
			cin >> value;
			lChainNode a(value);
			lChainNode *p = &a;
			first->link = p;
			i++;
		}
	}
	//����ֵ����
	void evalute(int m) {
		int result = 0;
		if (m < 5) { 
			cout << "�޷�������ʽ��ֵ" << endl; 
		}
		else {
			int count = 0;
			lChainIterator ai = this->begin();
			lChainIterator bi = this->end();
			lChainIterator ci = this->begin();
			for (int i = 0; i < 5; i++)
				ci++;
			while (count < m-5) {
				result += ai.current->data * ci.current->data;
				ai++; ci++;
				count++;
			}
			cout << result<<endl;
		}
	}
};
#endif // !CHAIN_H