#include<iostream>
using namespace std;
int  main()
{
	int s1 = 1, s2 = 1, h = 1, num = 0;
	cout << "Side1" << "  " << "Side2" << "  " << "Side3" << endl;
	for (s1=1; s1 <= 500; s1++)
	{
		for (s2=s1; s2 <= 500; s2++)
		{
			for (h=s2; h <= 500; h++)
			{
				if(h<s1+s2&&h*h>(s1-s2)*(s1-s2))
				{if (h*h== s1*s1 + s2*s2)
				{
					cout << s1 << "  " << "  " << s2 << "  " << h << '\n' << endl;
					num = num + 1;
				}
				}
			}
		}
	}
	cout << "A total of" << num << "triples were found" << endl;
}
