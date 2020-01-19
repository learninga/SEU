#include<iostream>
#include<ctime>
#include"Stack.h" 
using namespace std;
Stack::Stack(int a) :capacity(a) {
	//��������ʼ��stack
	if (capacity < 1)
		cout << "Stack  capacity  must  be  >0." << endl;
	stack = new int[capacity];
	for (int i = 0; i < capacity; i++)
		stack[i] = i +1 ;
		//��ʼ��Left��Rigt��Temp����
		Left = new int[capacity];
		Right = new int[capacity];
		Temp = new int[capacity];
		for (int i = 0; i < capacity; i++)
			Left[i] = 0;
		for (int i = 0; i < capacity; i++)
			Right[i] = 0;
		for (int i = 0; i < capacity; i++)
			Temp[i] = 0;
		//Ϊ�˴���Possbility������row x capacity��ʽ
		 row = 1; int j = 1;
		for (int i = 0; i < capacity; i++) {
			row = row*j;
			j++;
		}
		Possibility = new int*[row];
		for (int i = 0; i < row; i++)
			Possibility[i] = new int[capacity];
		//��ʼ��possibility
		for (int i = 0; i < row; i++) {
			for (int k = 0; k < capacity; k++)
				Possibility[i][k] = 0;
		}
		top = capacity - 2;
		leftPos = 0;
		rightPos = 0;
		//ָ��ÿһ������
		possibilityPos = 0;
}
bool Stack::isEmpty()const {
	if (top == -1) return true;
	else return false;
}
int Stack::Top() {
	if (isEmpty())
		cout << "the  stack  is  empty." << endl;
	return stack[top];
}
void Stack::Pop() {
	if (isEmpty())
		cout << "The  Stack  is  empty.Cannot  delete." << endl;
	top--;
}
bool Stack::isSame(int pos) {
	for (int i = 0; i < pos; i++) {
		for (int j = 0; j < capacity; j++) {
			if (Possibility[i][j] != Temp[j])
				return false;
		}
	}
	return true;
}
//�õ�һ�����ܵ�����
void Stack::OnePo() {
	//��stack�ǿ�
	while (isEmpty()!=true) {
		srand((unsigned)time(NULL));
		int direction = rand() % 2;
		//���Ϊ0  ջ�����������������
		if (direction == 0) {
			Left[leftPos] = Top();
			Pop();
			leftPos++;
		}
		//���Ϊ1  ջ�������ҷ����������
		else {
			Right[rightPos] = Top();
			Pop();
			rightPos++;
		}
	}
	//��stack���˵�ʱ��һ�ֿ��ܴ���Possibility������
	//�ȴ���Temp�����еõ�һ�����ܵ�����
	int TempPos = 0;
	for (int i = 0; i < capacity; i++) {
		if (Left[i] != 0) {
			Temp[TempPos] = Left[i];
			TempPos++;
		}
		else break;
	}
	for (int i = 0; i < capacity; i++) {
		if (Right[i] != 0) {
			Temp[TempPos] = Right[i];
			TempPos++;
		}
		else
			break;
	}
}
 
//�õ����п���
void Stack::Possible() {
	while (possibilityPos!=row) {
		//�õ�һ������
		OnePo();
		//�� ��ǰ������֮ǰû����ͬ��
		if (isSame(possibilityPos) == false) {
			//�����д���Possibility��
			for (int i = 0; i < capacity; i++) {
				Possibility[possibilityPos][i] = Temp[i];
				possibilityPos++;
			}
		}
		//��ͬʱ
		else   continue;
	}
	for (int i = 0; i < row; i++) {
		for (int j = 0; j < capacity; j++)
			cout << Possibility[i][j];
		cout << endl;
	}
}
