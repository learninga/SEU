#include"String.h"
#include<iostream>
using namespace std;
String::String(char *a, int n) {
	str = a;
	length = n;
	f = new int[n];
	for (int i = 0; i < n; i++)
		f[i] = 0;
}

int String::Length() {
	return length;
}

void String::Failurefunction()
 { 
     int LengthP = Length();
	 f[0] = -1;
	 for (int j = 1; j< LengthP; j++) // compute f[j]
		 {
		 int i = f[j - 1];
		 while ((*(str + j) != *(str + i + 1)) && (i >= 0)) i = f[i]; // try for m
		 if (*(str + j) == *(str + i + 1))
			 f[j] = i + 1;
		 else f[j] = -1;
		 }
	 for (int i = 0; i < length; i++)
		 cout << f[i]<<"    ";
	 cout << endl;
}