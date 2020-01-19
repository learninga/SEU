#include<iostream>
#include<fstream>
#include<iomanip>
#include<cstdlib>
#include<vector>
#include<string>
using namespace std;
int main() {
	int Oct(int);
	string Hex(int);
	ofstream outC("ascii.txt", ios::out);
	if (!outC) {
		cerr << "File  could  not  be  opened." << endl;
		exit(1);
	}
	int dec = 0, oct = 0;
	string hex;
	char asc;
	for (int i = 33; i <= 126; ++i) {
		dec = i; oct = Oct(i); hex = Hex(i);
		asc = (char)i;
		outC << dec << " " << oct << " " << hex << " " << asc << endl;
	}
	ifstream inC("ascii.txt", ios::in);
	if (!inC) {
		cerr << "File  could  not  be  opened" << endl;
		exit(1);
	}
	cout << setw(7) << "Decimal" << setw(9) << "Octal" << setw(15) << "Hexadecimal" << setw(13) << "Charactor" << showbase << '\n';
	while (inC >> dec >> oct >> hex >> asc) {
		cout << setw(7) << dec << setw(9) << oct << setw(15) << hex << setw(13) << asc << endl;
	}
	
}
int Oct(int m) {
	vector<int>vec;
	while (m != 0) {
		vec.push_back(m % 8);
		m = m / 8;
	}
	int j = vec.size();
	int result = 0, temp, n = 0;
	for (int i = 0; i < j; i++) {
		temp = vec[i];
		for (int k = 0; k < i; k++)
			temp = temp * 10;
		result = result + temp;
	}
	return result;
}//将十进制的数转化为八进制的数的函数
string Hex(int n) {
	string str;
	int temp = n / 16;
	int left = n % 16;
	if (temp > 0) {
		str += Hex(temp);
	}
	if (left < 10)str += (left + '0');
	else str += ('A' + left - 10);
	return str;
}//将十进制的数转化为十六进制的数
