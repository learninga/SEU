#include<iostream>
#include<string>
#include"Student_data.h"
int  main(){
	std::cout << "��������λͬѧ����Ϣ��ѧ��  ����  �����ɼ�  Ӣ��ɼ�  �����ɼ���" << std::endl;
	Student_data data1, data2, data3;
	std::cin >> data1.ID >> data1.name >> data1.MG >> data1.EG >> data1.PG;
	std::cin >> data2.ID >> data2.name >> data2.MG >> data2.EG >> data2.PG;
	std::cin >> data3.ID >> data3.name >> data3.MG >> data3.EG >> data3.PG;
	double  A1 = 0, A2 =0, A3 = 0, A4 = 0, A5 = 0, A6 = 0;
	A1 = (data1.MG + data1.EG + data1.PG) / 3;
	A2 = (data2.MG + data2.EG + data2.PG) / 3;
	A3 = (data3.MG + data3.EG + data3.PG) / 3;
	A4 = (data1.MG + data2.MG + data3.MG) / 3;
	A5 = (data1.EG + data2.EG + data3.EG) / 3;
	A6 = (data1.PG + data2.PG + data3.PG) / 3;
	std::cout << data1.name << "ƽ����Ϊ" << A1 << std::endl;
	std::cout << data2.name << "ƽ����Ϊ" << A2 << std::endl;
	std::cout << data3.name << "ƽ����Ϊ" << A3 << std::endl;
	std::cout << "����ƽ����Ϊ" << A4 << std::endl;
	std::cout << "Ӣ��ƽ����Ϊ" << A5<< std::endl;
	std::cout << "����ƽ����Ϊ" << A6 << std::endl;
	return  0;
}
