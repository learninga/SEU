#include<iostream>
using namespace std;
int main() {
	char S[10];
	bool exists[10] = {0};
	cout << "Please  cin  a  set  of  n  elements.";
	int i = 0; int m = 0;
	cin >> m;
	void Powerest(char list[], bool exists[],int k,int n);
	cin >> S;
	for(int i=0;i<=m;i++)
	Powerest(S, exists, 0, i);

}
void Powerest(char list[],bool exists[],int k,int m){
	if (k == m - 1) {
		int i = 0;
		exists[k] = 0;
		for (i = 0; i < m - 1; i++)
			if (exists[i])cout << list[i] << "  ";
		if (exists[i])cout << list[i];
		cout << endl;
		exists[k] = 1;
		for (i = 0; i < m - 1; i++)
			if (exists[i])cout << list[i]<<"  ";
		if (exists[i])cout << list[i]<<endl;
	}
	exists[k] = 0;
	Powerest(list, exists, k + 1, m);
	exists[k] = 1;
	Powerest(list, exists, k + 1, m);
}