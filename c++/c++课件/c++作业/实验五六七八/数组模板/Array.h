#pragma once
#ifndef ARRAY_H
#define ARRAY_H
template <typename T,int size>
class Array {
public:
	Array() {
		a = new T[size];
		if (!a) {
			cout << "动态空间申请失败" << endl;
		}
		for (int i = 0; i < size; i++) {
			a[i] = 0;
		}
	};
	~Array(){
		delete[]a;
	}
	T &operator[](int i) {
		if (i<0 || i>size - 1) {
			cout << "这个数越界了，退出程序";
		}
		return a[i];
	}
private:
	T *a;
};
#endif