#pragma once
#ifndef TREENODE_H
#define TREENODE_H
class TreeNode {
private:
	int data;
	int left_weight;
	int right_weight;
	TreeNode *left_child;
	TreeNode *right_child;
public:
	TreeNode(int d_value) {
		data = d_value;
	};
	void TreeNode::add_edge(int l=0, TreeNode* l_child=nullptr, int r=0, TreeNode* r_child=nullptr);
	int get_data() { return data; };
	int get_left_weight() { return left_weight; };
	int get_right_weight() { return right_weight; };
	TreeNode* get_left_child() {return left_child;};
	TreeNode* get_right_child() {return right_child;};
};

#endif // 
