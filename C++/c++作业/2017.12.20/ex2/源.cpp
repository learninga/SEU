#include<iostream>
using namespace std;
bool perfect(int n);
int main()
{
	cout << "Prefect  integres  between  1  and  1000:" << endl;
	for (int i = 1; i <= 1000; i++)
	{
		int s = perfect(i);
		if (s == 1)
		{
			cout << i << "="<<"1";
			for (int j = 1; j < i; j++)
			{
				if (i%j == 0)
				{
					cout << "+" << j;
				}
			}
 			cout << endl;
		}
		else
		{
			continue;
		}
	}
}
bool perfect(int n)
{
	int sum = 0;
	for (int i = 1; i < n; i++)
	{
		if (n%i == 0)
			sum = sum + i;
	}
	if (sum == n)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}