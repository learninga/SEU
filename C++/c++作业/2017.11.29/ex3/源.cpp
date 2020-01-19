#include<iostream>
#include<string>
using std::string;
using std::cin; using std::cout; using std::endl;
int  main()
{
	string s[10] = { "Áã", "Ò¼","·¡","Èş","ËÁ","Îé","Â½","Æâ","°Æ","¾Á" };
	cout << "Enter  the  check amount" << endl;
	double num = 0;
	cin >> num;
	int num1 = num / 10, num2 = num - num1 * 10;
	int num3 = (num - (num1 * 10) - num2) * 10, num4 = num * 100 - num1 * 1000 - num2 * 100 - num3 * 10;
	if (num1 == 0)
		cout << s[num2] << "Ôª" << s[num3] << "½Ç" << s[num4] << "·Ö" << endl;
	else
	{
		cout << s[num1] << "Ê°" << s[num2] << "Ôª" << s[num3] << "½Ç" << s[num4] << "·Ö" << endl;
	}
	return 0;
}
