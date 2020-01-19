#include<iostream>
#include<string>
#include<vector>
using std::string; using std::cin; using std::cout; using std::endl; using std::vector;
int main()
{
	cout << "Enter integers(9999 to the end)" << endl;    
	int word;
	double sum = 0;
	vector<double>num;
	while (cin >> word) {
		if (word == 9999) {
			break;
		}
		else {
			num.push_back(word);
		}
	}
	const int i = num.size();
	if (i ==0)
	{
		cout << "no number" << endl;
	}
	else
	{
		for (double a = 0; a != i; ++a)
			sum += num[a];
		double ave = sum / i;
		cout << "The average is:" << ave << endl;
	}
	return 0;

}