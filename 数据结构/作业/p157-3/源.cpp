#include<iostream>
#include"Stack.h"
using namespace std;
int main() {
	enum directions { N, NE, E, SE, S, SW, W, NW };
	struct offsets
	{
		int a, b;
	};
	offsets move[8];
	move[N].a = -1; move[N].b = 0;
	move[NE].a = -1; move[NE].b = 1;
	move[E].a = 0; move[E].b = 1;
	move[SE].a = 1; move[SE].b = 1;
	move[S].a = 1; move[S].b = 0;
	move[SW].a = 1; move[SW].b = -1;
	move[W].a = 0; move[NE].b = -1;
	move[NW].a = -1; move[NW].b = -1;
	struct Items {
		int x, y, dir;
	};
	//写一个迷宫
	int maze[11][11] = { 0 };
	int m = 11, p = 9;
	for (int i = 0; i < 11; i++) {
		maze[0][i] = 1;
		maze[10][i] = 1;
	}	//写边界
	for (int i = 0; i < 11; i++)
	{
		maze[2][i] = 1;
		maze[6][i] = 1;
	}
	for (int i = 1; i < 10; i++) {
		maze[4][i] = 1;
		maze[8][i] = 1;
	}
	maze[1][1] = 1;
	maze[3][1] = 1;
	maze[5][1] = 1;
	maze[4][10] = 1;
	maze[7][1] = 1;
	maze[7][10] = 1;
	maze[9][1] = 1;
	//mark为标记数组
	int mark[11][9] = { 0 };
	mark[1][1] = 1;
	Stack<Items> stack(m*p);
	Items temp;
	temp.x = 1;
	temp.y = 1;
	temp.dir = E;
	stack.Push(temp);

	//寻找路径的部分
	while (!stack.isEmpty())
	{
		temp = stack.Top();
		stack.Pop();
		int i = temp.x; int j = temp.y; int d = temp.dir;
		while (d < 8)
		{
			int g = i + move[d].a; int h = j + move[d].b;
			if ((g == m) && (h == p)) { // reached exit
										// output path
				stack.print();
				cout << i << "    "<< j << "   "<< d << endl; // last two
				cout << m << "     " << p << endl; // points
				return;
			}
			if ((!maze[g][h]) && (!mark[g][h])) { //new position
				mark[g][h] = 1;
				temp.x = i; temp.y = j; temp.dir = d + 1;
				stack.Push(temp);
				i = g; j = h; d = N; // move to (g, h)
			}
			else d++; // try next direction
		}
	}
}