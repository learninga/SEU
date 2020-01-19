#include<iostream>
int main()
{
	std::cout<<"Enter two integers"<<std::endl;
	int v1=0,v2=0,a=0;
	std::cin>>v1>>v2;
	a=v1%v2;      
	if(a=0)
		{
			std::cout<<v1<<"is a multiple of "<<v2<<std::endl;
		}
		else
			std::cout<<v1<<"is not a multiple of "<<v2<<std::endl;
	return 0;

}