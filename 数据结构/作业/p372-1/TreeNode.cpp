#include"TreeNode.h"
using namespace std;
void TreeNode::add_edge(int l, TreeNode* l_child, int r, TreeNode* r_child) {
	left_weight = l;
	left_child = l_child;
	right_weight = r;
	right_child = r_child;
}