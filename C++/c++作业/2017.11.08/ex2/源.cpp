#include<iostream>
#include<ctype.h>
#include<string>
using namespace std;
string Process(string str)
{
	for (unsigned int i = 0; i < str.length(); i++)
	{
		str[i] = toupper(str[i]);
	}
	for (unsigned int i = 0; i < str.length(); i++)
	{
		if (str[i] == ' ' && (str[i + 2] == ' ' || str[i + 3] == ' '))
		{
			int x = i + 1;
			while (str[x] != ' ')
			{
				str[x] = ' ';
				x++;
			}
		}
		if (str.substr(i, 3) == "FOR" || str.substr(i, 3) == "AND" || str.substr(i, 3) == "THE")
		{
			for (unsigned int x = i; x < i + 3; x++)
			{
				str[x] = ' ';
			}
		}
	}
	return str;
}
void printAbbreviation(string a)
{
	string str = Process(a);
	if (str[0] != ' ')
	{
		cout << str[0];
	}
	for (unsigned int i = 0; i < str.length(); i++)
	{
		if (str[i] == ' ')
		{
			if (str[i + 1] != ' ')
			{
				cout << str[i + 1];
			}
			else
				continue;
		}
		else
			continue;
	}
	cout << endl;
}
void main()
{
	int times = 5;
	cin >> times;
	cin.clear();
	cin.ignore();
	string* a = new string[times];
	for (int i = 0; i < times; i++)
	{
		getline(cin, a[i]);
	}
	for (int i = 0; i < times; i++)
	{
		printAbbreviation(a[i]);
	}

	system("pause");
}