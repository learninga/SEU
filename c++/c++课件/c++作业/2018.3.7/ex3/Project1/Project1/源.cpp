#include<iostream>
#include"Time.h"
using namespace std;
int main()
{
	int a = 0, b = 0, c = 0, num = 0;
	cin >> a >> b >> c >> num;
	for (int i = 0; i <= num; i++)
	{
		Time t(a, b, c + i);
		t.tick();
	}
}