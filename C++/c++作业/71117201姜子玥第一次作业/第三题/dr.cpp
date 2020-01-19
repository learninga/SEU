#include<iostream>
int main()
{
	std::cout<<"Input a five_digit number"<<std::endl;
	int v=0,a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0;
	std::cin>>v;
	a=v%10000;
	b=(v-a)/10000;
	c=a%1000;
	d=(a-c)/1000;
	e=c%100;
	f=(c-e)/100;
	g=e%10;
	h=(e-g)/10;
	std::cout<<b<<"   "<<d<<"   "<<f<<"   "<<h<<"   "<<g<<std::endl;
	return 0;



}