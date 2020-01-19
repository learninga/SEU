#include<iostream>
using namespace std;
int main() {
	int n = 0, m = 0;
	int compare(int *a, int aLength, int*b, int bLength);
	cout << "Please  cin  the  length  of  Arraya  and  Arrayb" << endl;
	cin >> n >> m;
	int *a = new int[n];
	int  *b = new int[m];
	for (int i = 0; i < n; i++)
		cin >> a[i];
	for (int i = 0; i < m; i++)
		cin >> b[i];
	int result = compare(a, n, b, m);
	switch (result)
	{
	case 0: cout << "a==b"; break;
	case 1:cout << "a>b"; break;
	case-1: cout << "a<b"; break;
	default:
		break;
	}
}
int compare(int *a,int aLength, int *b,int bLength) {
	int length = (aLength < bLength) ? aLength : bLength;
	for (int i = 0; i < length; i++) {
		if (a[i] < b[i])return -1;
		else if (a[i] == b[i]) return 0;
		else return 1;
	}
}