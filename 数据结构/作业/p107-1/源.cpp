#include<iostream>
#include<time.h>
using namespace std;
int main() {
	clock_t startTime, endTime;
	int m=0, n=0;//m表示行数  n表示列数
	cout << "Please enter the size of the array" << endl;
	cin >> m >> n;
	int **testArray;
	testArray = new int*[m];
	//动态创建数组
	for (int i = 0; i < m; i++)
		testArray[i] = new int[n];
	//设置数组里的数值
	cout << "Please  enter  the  number  of  this  array" << endl;
	for (int i = 0; i < m; i++) {
		for (int j = 0; j < n; j++) {
			int x = 0;
			cin >> x;
			testArray[i][j] = x;
		}
	}
	cout << "Please enter the postion of the num  you want to search" << endl;
	int x = 0, y = 0;
	cin >> x >> y;
	while (x >= m && y >= n) {
		cout << "It  is  beyond  the  size.\n  Please  enetr  again" << endl;
		cin >> x >> y;
	}
	cout << "Please  cin  the  value  " << endl;
	int change = 0;
	cin >> change;
	startTime = clock();
	int find = testArray[x][y];
	cout << find << endl;
	testArray[x][y] = change;
	endTime = clock();
	float time = endTime - startTime;
	cout << "Total  time  is : " << time << endl;
	system("pause");
}