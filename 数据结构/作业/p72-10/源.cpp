#include<iostream>
#include<Windows.h>
using namespace std;
int main() {
	DWORD start, end;
	int s[20] = { 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20 };
	int m = 0;
	cout << "Please cin what you want to search.";
	cin >> m;
	int BinarySearch(int s[], int n, int key);
	start = GetTickCount();
	BinarySearch(s, 20, m);
	end = GetTickCount() - start;
	cout << end << endl;
	return 0;
}
int BinarySearch(int a[], int n, int key) {
	int low, high, mid;
	low = 1;
	high = n;
	while (low <= high) {
		mid = (low + high) / 2;
		if (key < a[mid])
			high = mid - 1;
		if (key > a[mid])
			low = mid + 1;
		else
			return mid;
	}
	return 0;
}