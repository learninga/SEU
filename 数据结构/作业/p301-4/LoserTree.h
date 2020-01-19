#pragma once
#ifndef LOSERTREE_H
#define LOSERTREE_H
using namespace std;

class LoserTree
{
public:
	LoserTree(int n) {
		leave_num = n;
		leaves = new int[leave_num+1];//leaves��0λ����Сֵ
		loserTree = new int[leave_num ];//loserTree��0λ��ھ���leaves����±�
		cout << "Please enter the leave of this loser tree." << endl;//��ʼ����leaves����
		for (int i = 1; i <= leave_num; i++)
			cin >> leaves[i];
		leaves[0] = -1;
	}
	//����������
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
	//����ʤ��
	int winner() {
		return leaves[loserTree[0]];
	}
	//���
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
	//�õ�loserTree�ڵ��д��ֵ��Ӧ��leave����ֵ��������ֵ
	int getKey(int i) {
		if (i < leave_num)
			return leaves[i];
		else
			return leaves[i + 1 - leave_num];
	};
	//�õ�loserTree�нڵ����±�ֵ
	int getIndex(int i) {
		if (i < leave_num)
			return loserTree[i];
		else
			return i - leave_num+1;
	};
	int leave_num;
	int* leaves;	// ���±�1��ʼ�洢Ҷ�ӽڵ�ֵ���±�0���洢һ����Сֵ�ڵ� 
	int* loserTree;	// �洢���߶�Ӧ����ѡ�ֵ��±꣬�±�0���洢�ھ��ڵ�
};
#endif // !LOSERTREE_H
