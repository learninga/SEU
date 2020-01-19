#include<iostream>
#include<ctime>
#include<cstdlib>
#include<iomanip>
using namespace std;
int main() {
	srand(time(0));
	long a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, m = 0, j = 0, k = 0;
	for (int i = 1; i <= 36000; i++) {
		int x = rand() % 6 + 1;
		int y = rand() % 6 + 1;
		int sum = x+y;
		switch (sum) {
		case 2:
			a = a + 1; break;
		case 3:
			b = b + 1; break;
		case 4:
			c = c + 1; break;
		case 5:
			d = d + 1; break;
		case 6:
			e = e + 1; break;
		case 7:
			f = f + 1; break;
		case 8:
			g = g + 1; break;
		case 9:
			h = h + 1; break;
		case 10:
			 m=m+ 1; break;
		case 11:
			j = j + 1; break;
		case 12:
			k = k + 1; break;
		}
	}
	long  double  i1 = a / 360, i2 = b / 360, i3 = c / 360, i4 = d / 360, i5 = e / 360, i6 = f / 360, i7 = g / 360,
		i8 = h / 360, i9 = m / 360, i10 = j / 360, i11 = k / 360;
	cout << setw(5) << "Sum" <<"      "<< "Total"<<"      " << "Actual" << endl;
	cout << setw(5) << 2<<"         "<< a <<"        "<< i1 << '%' << endl;
	cout << setw(5) << 3 <<"        "<< b <<"        "<< i2 << '%' << endl;
	cout << setw(5) << 4 <<"        "<< c <<"        "<< i3 << '%' << endl;
	cout << setw(5) << 5 <<"        "<< d <<"        "<< i4 << '%' << endl;
	cout << setw(5) << 6 <<"        "<< e <<"        "<< i5 << '%' << endl;
	cout << setw(5) << 7 <<"        "<< f <<"        "<< i6 << '%' << endl;
	cout << setw(5) << 8 <<"        "<< g <<"        "<< i7 << '%' << endl;
	cout << setw(5) << 9 <<"        "<< h <<"        "<< i8 << '%' << endl;
	cout << setw(5) << 10 <<"        "<< m<<"        "<< i9 << '%' << endl;
	cout << setw(5) << 11 <<"        "<< j <<"        "<< i10 << '%' << endl;
	cout << setw(5) << 12 <<"        "<< k <<"        "<< i11 << '%' << endl;
}