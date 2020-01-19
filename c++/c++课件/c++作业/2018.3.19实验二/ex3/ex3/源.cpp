#include<iostream>
#include"IntegerSet.h"
using namespace std;
int main() {
	int a = 0,b=0;
	IntegerSet m, n;
	while (a != -1) {
		cout << "Enter  an  element  (-1  to  end):" ;
		cin >> a;
		m.inputSet(a);//����input����
	}
	if (a == -1)cout << "Entry  complete" << endl;
	while (b != -1) {
		cout << "Enter  an  element  (-1  to  end):" ;
		cin >> b;
		n.inputSet(b);//����input����
	}
	if (b == -1)cout << "Entry  complete" << endl;
	IntegerSet un, inter;
	un = m.unionOfSets(n);
	inter = m.intersectionOfSets(n);//����unionOfSets��intersectionOfSets����
	cout << "Union  of  A  and  B  is:" << endl;
	un.printSet();
	cout << "\n  Intersection  of  A  and  B  is:" << endl;
	inter.printSet();//����printSet����
	cout << endl;
	bool x = m.isEqualTo(n);//����isEqualTo����
	if (x == true)cout << "Set  A  is  equal  to  set  B" << endl;
	else cout << "Set  A  is  not  equal  to  set  B" << endl;
	int y = 0, z = 0;
	cin >> y ;
	cout << "Inserting  " << y << "  into  setA...." << endl;
	cout << "Set  A  is  now:" << endl;
	m.insertElement(y);//����insertElement��������
	m.printSet();
	cout << "\n  Deleting  " << y << "  from  set  A..." << endl;
	cout << "Set  A  is  now:" << endl;
	m.deleteElement(y);//����deleteElement��������
	m.printSet(); cout << endl;
	int shuzu[10] = { 1,2,3,66,88,99,151,62,54,45 };
	int q = 10;
	IntegerSet test(shuzu,q);
	test.printSet();//������һ�����캯������


}
