#include<iostream>
#include<string>
using  std::string;
using std::cin; using std::endl; using std::cout;
int main()
{
	string a;
	string b;
	cout << "Please  enter  two words" << endl;
	cin >> a >> b;
	const int i1 = a.size();const int i2 = b.size();
	char cal1[100000];
	char cal2[100000];
	for (int i = 1; i != i1; ++i)
		cal1[i] = a[i];
	for (int i = 1; i != i2; ++i)
		cal2[i] = b[i];
	if (a == b) {
		cout << 0 << endl;
	}
	else { 
		int i=0;
		while (cal1[i] == cal2[i]) {
			i=i+1;
		}
	    int  ret = cal1[i] - cal2[i];
		cout << ret << endl;
	}
	return 0;


}