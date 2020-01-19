#pragma once
#ifndef LOSERTREE_H
#define LOSERTREE_H
using namespace std;

class LoserTree
{
public:
	LoserTree(int n) {
		leave_num = n;
		leaves = new int[leave_num+1];//leaves的0位存最小值
		loserTree = new int[leave_num ];//loserTree的0位存冠军在leaves里的下标
		cout << "Please enter the leave of this loser tree." << endl;//初始构造leaves数组
		for (int i = 1; i <= leave_num; i++)
			cin >> leaves[i];
		leaves[0] = -1;
	}
	//构建败者树
	void Build() {
		int i;
		int *winnerTemp = new int[leave_num];
		for (i = leave_num - 1; i > 0; i--) {
			if (i >= leave_num / 2) {
				if (getKey(2 * i) < getKey(2 * i + 1))
				{
					loserTree[i] = getIndex(2 * i);
					winnerTemp[i] = getIndex(2 * i + 1);
				}
				else {
					loserTree[i] = getIndex(2 * i + 1);
					winnerTemp[i] = getIndex(2 * i);
				}
			}
			else {
				if (getKey(winnerTemp[2 * i]) < getKey(winnerTemp[2 * i + 1])) {
					loserTree[i] = winnerTemp[2 * i];
					winnerTemp[i] = winnerTemp[2 * i + 1];
				}
				else {
					loserTree[i] = winnerTemp[2 * i+1];
					winnerTemp[i] = winnerTemp[2 * i];
				}
			}
		}
		if (getKey(winnerTemp[1]) < getKey(winnerTemp[2]))
			loserTree[0] = winnerTemp[2];
		else
			loserTree[0] = winnerTemp[1];
	}
	//返回胜者
	int winner() {
		return leaves[loserTree[0]];
	}
	//输出
	void printTree() {
		for (int i = 1; i < leave_num; i++)
			cout << loserTree[i] << "    ";
		cout << endl;
		for (int i = 1; i <= leave_num; i++) {
			int a = loserTree[i];
			cout << leaves[a] << "   ";
		}
		cout << endl;
	}
private:
	//得到loserTree节点中存的值对应的leave中数值即参赛者值
	int getKey(int i) {
		if (i < leave_num)
			return leaves[i];
		else
			return leaves[i + 1 - leave_num];
	};
	//得到loserTree中节点存的下标值
	int getIndex(int i) {
		if (i < leave_num)
			return loserTree[i];
		else
			return i - leave_num+1;
	};
	int leave_num;
	int* leaves;	// 从下标1开始存储叶子节点值，下标0处存储一个最小值节点 
	int* loserTree;	// 存储输者对应参赛选手的下标，下标0处存储冠军节点
};
#endif // !LOSERTREE_H
