#include<iostream>
#include<string>
using std::string;
using std::cin; using std::cout; using std::endl;
int  main()
{
	string s[10] = { "��", "Ҽ","��","��","��","��","½","��","��","��" };
	cout << "Enter  the  check amount" << endl;
	double num = 0;
	cin >> num;
	int num1 = num / 10, num2 = num - num1 * 10;
	int num3 = (num - (num1 * 10) - num2) * 10, num4 = num * 100 - num1 * 1000 - num2 * 100 - num3 * 10;
	if (num1 == 0)
		cout << s[num2] << "Ԫ" << s[num3] << "��" << s[num4] << "��" << endl;
	else
	{
		cout << s[num1] << "ʰ" << s[num2] << "Ԫ" << s[num3] << "��" << s[num4] << "��" << endl;
	}
	return 0;
}
