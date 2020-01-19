#include"Tree.h"
#include<stack>
#include<iostream>
using namespace std;
void Tree::shorest_path() {
	int *v_data = new int[n];
	v_data[0] = root->get_data();
	int *length = new int[n];
	for (int i = 0; i < n; i++)
		length[i] = 0;
	TreeNode *temp = root,*pre=root;
	int v_length=0;
	int i = 1;
	stack<TreeNode*> s;
	stack<int> l;
	//遍历所有树的节点，因此时间复杂度为O(n)
	while (i<=n) {
		//得到所有左边一路的顶点值
		while (temp->get_left_child()) {
			  s.push(temp);
				v_length += temp->get_left_weight();
				l.push(v_length);
				temp = temp->get_left_child();
				v_data[i] = temp->get_data();
				length[i] = v_length;
				i++;
		}
		if (s.empty())
			break;
		else {
				temp = s.top();
				s.pop();
				l.pop();
				v_length = l.top();
				v_length += temp->get_right_weight();
				temp = temp->get_right_child();
				v_data[i] = temp->get_data();
				length[i] = v_length;
				l.push(v_length);
				i++;
				
		}
	}
	for (int j = 0; j < n; j++) 
		cout << "根到值为" << v_data[j] << "的顶点最短距离为：" << length[j] << endl;
}