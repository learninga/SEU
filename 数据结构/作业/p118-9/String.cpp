#include<iostream>
#include"String.h"
using namespace std;
String::String(char*c, int m)
	:length(m)
{
	f = new int[length];
	str = c;
}
void String::newfailureFunction()
{
	f[0] = -1;
	int b = -1;
	int j;
	for (j = 1; j < length; j++)
	{
		int n = f[j - 1];
		while (str[j] != str[n + 1] && n >= 0)n = f[n];
		if (str[j] == str[n + 1])f[j] = n + 1;
		else f[j] = -1;
		if (f[j] == -1 && f[j - 1] != -1)for (int k = j - 2; f[k] != -1; k--) { f[k] = -1; }
	}
	for (int k = j - 2; f[k] != -1; k--) { f[k] = -1; }
}
int String::fastFind(String s)
{
	int posP = 0;
	int posS = 0;
	while (posP < s.length&&posS < length)
	{
		if (s.str[posP] == str[posS])
		{
			posP++;
			posS++;
		}
		else if (posP == 0)posS++;
		else posP = s.f[posP - 1] + 1;
		if (posP < s.length)return -1;
		else return posS - s.length;
	}
}
void String::print()
{
	cout << "String: " << str << endl;
	for (int n = 0; n < length; n++)
		cout << f[n] << " ";
	cout << endl;
}