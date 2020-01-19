Btree::InsertNode(Key k, Element e)
{
	bool overflow = Insert(root, k, e);
	if (overflow)
		<Key, Node*> newpair = split(root);
	root = new Node(root, newpair);
	return;
}
Bool Insert(node* x, Key k, Element e)
{
	if (leaf(x))
		insertLeaf(x, k, e);
	if (size(x) > m - 1) return true;
	else return false;
	idx = keySearch(x, k);
	bool overflow = Insert(x->C[idx], k, e);
	if (overflow)
		<Key, Node*> newpair = split(x->C[idx]);
	InsertPair(x, newpair);
	if (size(x) > m - 1)
		return true;
	else return false;
}
