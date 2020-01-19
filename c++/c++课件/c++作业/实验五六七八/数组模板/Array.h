#pragma once
#ifndef ARRAY_H
#define ARRAY_H
template <typename T,int size>
class Array {
public:
	Array() {
		a = new T[size];
		if (!a) {
			cout << "��̬�ռ�����ʧ��" << endl;
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
			cout << "�����Խ���ˣ��˳�����";
		}
		return a[i];
	}
private:
	T *a;
};
#endif