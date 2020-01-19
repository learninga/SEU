#include<iostream>
#include"IntegerSet.h"
using namespace std;
int main() {
	int a = 0,b=0;
	IntegerSet m, n;
	while (a != -1) {
		cout << "Enter  an  element  (-1  to  end):" ;
		cin >> a;
		m.inputSet(a);//测试input函数
	}
	if (a == -1)cout << "Entry  complete" << endl;
	while (b != -1) {
		cout << "Enter  an  element  (-1  to  end):" ;
		cin >> b;
		n.inputSet(b);//测试input函数
	}
	if (b == -1)cout << "Entry  complete" << endl;
	IntegerSet un, inter;
	un = m.unionOfSets(n);
	inter = m.intersectionOfSets(n);//测试unionOfSets和intersectionOfSets函数
	cout << "Union  of  A  and  B  is:" << endl;
	un.printSet();
	cout << "\n  Intersection  of  A  and  B  is:" << endl;
	inter.printSet();//测试printSet函数
	cout << endl;
	bool x = m.isEqualTo(n);//测试isEqualTo函数
	if (x == true)cout << "Set  A  is  equal  to  set  B" << endl;
	else cout << "Set  A  is  not  equal  to  set  B" << endl;
	int y = 0, z = 0;
	cin >> y ;
	cout << "Inserting  " << y << "  into  setA...." << endl;
	cout << "Set  A  is  now:" << endl;
	m.insertElement(y);//测试insertElement函数功能
	m.printSet();
	cout << "\n  Deleting  " << y << "  from  set  A..." << endl;
	cout << "Set  A  is  now:" << endl;
	m.deleteElement(y);//测试deleteElement函数功能
	m.printSet(); cout << endl;
	int shuzu[10] = { 1,2,3,66,88,99,151,62,54,45 };
	int q = 10;
	IntegerSet test(shuzu,q);
	test.printSet();//测试另一个构造函数功能


}
