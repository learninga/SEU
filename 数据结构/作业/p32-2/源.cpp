#include<iostream>
using namespace std;
int main() {
	void myArray(bool b[], int k, int n);
	cout << "Please  cin  a  number";
	int n;
	bool b[1000000];
	cin >> n;
	myArray(b, 0, n);
}
void myArray(bool b[], int k, int n) {
	if (k == n) {
		for (int i = 0; i < n; i++)cout << b[i];
		cout << "  ";
	}
	else {
		b[k] = false; myArray(b, k + 1, n);
		b[k] = true; myArray(b, k + 1, n);
	}
}
	
