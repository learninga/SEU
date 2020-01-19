#include<iostream>
#include<ctime>
#include"Stack.h" 
using namespace std;
Stack::Stack(int a) :capacity(a) {
	//创建并初始化stack
	if (capacity < 1)
		cout << "Stack  capacity  must  be  >0." << endl;
	stack = new int[capacity];
	for (int i = 0; i < capacity; i++)
		stack[i] = i +1 ;
		//初始化Left和Rigt和Temp数组
		Left = new int[capacity];
		Right = new int[capacity];
		Temp = new int[capacity];
		for (int i = 0; i < capacity; i++)
			Left[i] = 0;
		for (int i = 0; i < capacity; i++)
			Right[i] = 0;
		for (int i = 0; i < capacity; i++)
			Temp[i] = 0;
		//为了创建Possbility的数组row x capacity形式
		 row = 1; int j = 1;
		for (int i = 0; i < capacity; i++) {
			row = row*j;
			j++;
		}
		Possibility = new int*[row];
		for (int i = 0; i < row; i++)
			Possibility[i] = new int[capacity];
		//初始化possibility
		for (int i = 0; i < row; i++) {
			for (int k = 0; k < capacity; k++)
				Possibility[i][k] = 0;
		}
		top = capacity - 2;
		leftPos = 0;
		rightPos = 0;
		//指在每一个排列
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
//得到一个可能的排列
void Stack::OnePo() {
	//当stack非空
	while (isEmpty()!=true) {
		srand((unsigned)time(NULL));
		int direction = rand() % 2;
		//如果为0  栈顶存入左方向的数组中
		if (direction == 0) {
			Left[leftPos] = Top();
			Pop();
			leftPos++;
		}
		//如果为1  栈顶存入右方向的数组中
		else {
			Right[rightPos] = Top();
			Pop();
			rightPos++;
		}
	}
	//当stack空了的时候将一种可能存入Possibility数组中
	//先存入Temp数组中得到一个可能的排列
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
 
//得到所有可能
void Stack::Possible() {
	while (possibilityPos!=row) {
		//得到一个排列
		OnePo();
		//当 当前排列与之前没有相同的
		if (isSame(possibilityPos) == false) {
			//将排列存入Possibility中
			for (int i = 0; i < capacity; i++) {
				Possibility[possibilityPos][i] = Temp[i];
				possibilityPos++;
			}
		}
		//相同时
		else   continue;
	}
	for (int i = 0; i < row; i++) {
		for (int j = 0; j < capacity; j++)
			cout << Possibility[i][j];
		cout << endl;
	}
}
