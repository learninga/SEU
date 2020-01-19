#include<iostream>
using namespace std;
int Num[100] = { 0,1,2,3,4,5,6,7,8,9 };
int main()
{
	void Add(int);
	void Delete(int);
	void Sort(int);
	void Quit(int);
	cout << " Menu: A(dd) D(elete) S(ort) Q(uit),Please select one :" << endl;
	char x; cin >> x;
	if (x != 'Q') {
		int n = 0; cin >> n;
		if (x == 'A') {
			 Add(n);
		}
		else
		{
			if (x == 'D') {
				 Delete(n);
			}
			else {
				if (x == 'S') {
					Sort(n);
				}
			}
		}
	}
	else return 0;
}

	void Add(int m) {
		cout << "数据已经增加" << endl;
	cout << "0,1,2,3,4,5,6,7,8,9" << m << endl;
}
	void Delete(int m) {
		if (m <= 9 && m >= 0) {
			int i = 0;
			while (Num[i] != m) {
				++i;
			}
			if (i < 10) {
				for (int j = i; j <= 10; j++)
					Num[j] = Num[j + 1];
				for (int j = 0; j <= 8; j++)
					cout << Num[j];
			}
			else  cout << "0,1,2,3,4,5,6,7,8" << endl;
		}
		else cout << "Error" << endl;
	}
	void Sort(int m) {
		if (m <= 9 && m >= 0)
		{
			int i = 0;
			while (Num[i] < m) {
				i++;
			}
			if (i != 10)
			{
				for (int j = 11; j>=i+1;j--)
					Num[j] = Num[j - 1];
				Num[i + 1] = m;
				for (int t = 0; t <= 10; t++)
					cout << Num[t];
			}
			else
				cout << "0,1,2,3,4,5,6,7,8,9,9" << endl;
		}
		else
			cout << "Error" << endl;
	}