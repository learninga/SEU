#include<iostream>
using namespace std;
void square(char a, int row);
void diamond(char a, int row);
void triangle(char a, int row);
int main()
{   int n = 0, size = 0;
	char answer, c;
	do {
		cout << "Choose  the  shape  to  graph" << '\n' << "1 for square" << '\n' << "2 for diamond" << '\n' << "3 for triangle" << endl;
		cin >> n;
		cout << "Enter  a  character  and  size" << endl;
		cin >> c >> size;
		switch (n) {
		case 1:
			square(c, size);
			break;
		case 2:
			diamond(c, size);
			break;
		case 3:
			triangle(c, size);
			break;
		default:cout << "Please cin another number" << endl;
		}
		cout << "Do  you  want  to  continue(y or n)?" << endl;
		cin >> answer;
	} while (answer =='y');
	return 0;
}
void triangle(char a, int row)
{
	for (int i = 1; i <= row; i++)
	{
		for (int j = 1; j <= i * 2 - 1; j++)
			cout << a;
		cout << endl;
	}
}
void square(char a, int row)
{
	for (int i = 1; i <= row; i++)
	{
		for (int j = 1; j <= row; j++)
			cout << a;
		cout << endl;
	}
}
	 void diamond(char a , int row)
	 {
		 if (row / 2 == 0)
		 {
			 cout << "You  cannot cin  like  this." << endl;
		 }
		 else
			 for (int i = 1; i <= row; i++)
			 {
				 if (i <= row / 2 + 1) {
					 for (int j = 1; j <= 2 * i - 1; j++)
						 cout << a;
					 cout << endl;
				 }
				 else
					 for (int j = 1; j <= row*2-i*2+1;j++)
						 cout << a;
				 cout << endl;
			 }
	 }