#include<iostream>
#include<string>
using std::string;
using std::cin; using std::cout; using std::endl;
int main()
{
	string digt1;
	cin >> digt1;
	const int num = digt1.size();
	char digt[100000] = {};
	for (int i = 0; i <= num; ++i)
		digt[i] = digt1[i];
	for (int i = 0; i <= num; ++i)
	{
		if (digt[i]>='a'&&digt[i]<='z')
			digt[i] = digt[i]-32;
	}
	int i = 0, n1 = num - 1, a = num % 2;
	while (digt[i] == digt[n1])
	{
		i = i + 1;
		n1 = n1 - 1;
	}
	if (n1==-1&&i==num)
	{
		cout << "Yes" << endl;
	}
	else
	{
		cout << "No" << endl;
	}
	return 0;
}