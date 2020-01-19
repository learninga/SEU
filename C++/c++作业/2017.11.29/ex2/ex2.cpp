#include<iostream>
#include<string>
using std::string;
using std::cin; using std::cout; using std::endl;
int main()
{
	string s[9] = {"ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN","EIGHT","NINE"};
	string t[9]={"TEN","TWENTY","THIRTY","FORTY","FIFTY","SIXTY","SEVENTY","EIGHTY","NINTY" };
	cout << "Enter  the  check  amount(0.00 to 99.99)" << endl;
	double num = 0;
	cin >> num;
	int f1 = num;//令整数部分为f1
	int i = f1 % 10, m = f1 - i*10;
	double x = num - f1;//令小数部分为x
	double a = x * 100;//令小数部分乘了100的数为a
	if (f1 < 10) {
		cout << "The  check  amount in  words is:" << endl;
		cout << s[i-1] << "  " << "and" <<"  "<< a << "/100" << endl;
	}
	else {
		if(f1!=10){
            cout << "The  check  amount in  words is:" << endl;
			cout << t[i - 1] << '-' << s[m - 1] <<"  "<< "and" << "  " << a << "/100" << endl;
		}
		else{
			cout<<"The  check  amount  in  words  is "<<endl;
			cout<<"TEN"<<endl;
		}
		

	}
	return 0;
}

