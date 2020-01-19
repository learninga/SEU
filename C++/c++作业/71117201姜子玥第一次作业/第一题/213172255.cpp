#include<iostream>
int main()
{
	std::cout<<"Input three different integers:"<<std::endl;
	int a=0,b=0,c=0;
	std::cin>>a>>b>>c;
	std::cout<<"Sum is "<<a+b+c<<std::endl;
	std::cout<<"Average is"<<(a+b+c)/3<<std::endl;
	std::cout<<"Product is "<<a*b*c<<std::endl;
	if(a<b)
	{
		if(b<c)
		{std::cout<<"The largest is"<< c<<"The smallest is "<<a<<std::endl;
		}
		else
			if(a<c)
			{std::cout<<"The largest is"<<b<<"The smallest is"<<a<<std::endl;
		    }
			else
				 std::cout<<"The largest is"<<b<<"The smallest is"<<c<<std::endl;

		
	}
	if(a>b)
	{
		if(b>c)
		{std::cout<<"The largest is "<<a<<"The smallest is "<<c<<std::endl;
		}
		else 
			if(a<c)
			{std::cout<<"The largest is"<<c<<"The smallest is"<<b<<std::endl;
		    }
			else
				std::cout<<"The largest is"<<a<<"The smallest is "<<b<<std::endl;
	}
	return 0;


}