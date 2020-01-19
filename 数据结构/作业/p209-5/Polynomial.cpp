#include"Polynomial.h"
#include"CircularListWithHead.h"
#include"CircularListNode.h"
using namespace std;
istream& operator>>(istream &is, Polynomial x) {
	is >> x.poly;
	return is;
}
istream& operator>>(istream &i, CircularListWithHead m) {
	CircularListNode *temp = m.getHead();
	temp = temp->getLink();
	cout << "请输入多项式项数" << endl;
	int j=0, n = 0;
	i >> n;
	float co = 0, ex = 0;
	while (j< n) {
		i >> co >> ex;
		m.set(co, ex, temp);
		temp = temp->getLink();
	}
	return i;
}
ostream& operator<<(ostream &os, Polynomial x) {
	os << x.poly;
	return os;
}
ostream& operator<<(ostream&o, CircularListWithHead m) {
	CircularListNode *temp = m.getHead();
	while (temp != m.getHead()) {
		if (temp->getLink() != m.getHead()) {
			o << temp->getCo() << "x^" << temp->getEx() << "+";
			temp = temp->getLink();
		}
		else {
			o << temp->getCo() << "x^" << temp->getEx() << endl;
			temp = temp->getLink();
		}
	}
	return o;
}
Polynomial::Polynomial() {
	CircularListWithHead temp;
	poly = temp;
}
const Polynomial& Polynomial:: operator=(const Polynomial& m) {
	CircularListNode *pa = poly.getHead(), *pb = m.poly.getHead();
	while (pb->getLink != m.poly.getHead()) {
		float c = pb->getCo();
		int e = pb->getEx();
		poly.insertAfter(c,e);
		pa = pa->getLink();
		pb = pb->getLink();
	}
}
Polynomial::Polynomial(const Polynomial&m) {
	CircularListNode *pa = poly.getHead(), *pb = m.poly.getHead();
	while (pb->getLink != m.poly.getHead()) {
		float c = pb->getCo();
		int e = pb->getEx();
		poly.insertAfter(c, e);
		pa = pa->getLink();
		pb = pb->getLink();
	}
}
Polynomial Polynomial::operator+(const Polynomial &b) {
	Polynomial c;
	float temp;
	CircularListNode *p;
	CircularListNode *p_first = poly.getHead(), *p_bfirst = b.poly.getHead(),*p_cfirst=c.poly.getHead();
	CircularListNode *pa = poly.getLink(), *pb = b.poly.getLink(),*pTemp=c.poly.getHead();
	while (pa->getLink() != p_first&& pb->getLink() != p_bfirst) {
		if (pa->getEx() == pb->getEx()) {
			temp = pa->getCo() + pb->getCo();
			if (temp != 0) {
				c.poly.insertAfter(pa->getEx(), temp);
				pTemp = pTemp->getLink();
			}
			pa = pa->getLink();
			pb = pb->getLink();
		}
		else if (pa->getEx() < pb->getEx()) {
			c.poly.insertAfter(pa->getCo, pa->getEx());
			pTemp = pTemp->getLink();
			pa = pa->getLink();
		}
		else {
			c.poly.insertAfter(pb->getCo, pb->getEx());
			pb = pb->getLink();
		}
	}
	if (pa->getLink != p_first) {
		p = pa;
	}
	else
		p = pb;
	while (p != p_cfirst) {
		c.poly.insertAfter(p->getCo(), p->getEx);
		p = p->getLink();
	}
	return c;
}
Polynomial Polynomial::operator-(const Polynomial &b) {
	Polynomial c;
	float temp;
	CircularListNode *p;
	CircularListNode *p_first = poly.getHead(), *p_bfirst = b.poly.getHead(), *p_cfirst = c.poly.getHead();
	CircularListNode *pa = poly.getLink(), *pb = b.poly.getLink(), *pTemp = c.poly.getHead();
	while (pa->getLink() != p_first&& pb->getLink() != p_bfirst) {
		if (pa->getEx() == pb->getEx()) {
			temp = pa->getCo() - pb->getCo();
			if (temp != 0) {
				c.poly.insertAfter(pa->getEx(), temp);
				pTemp = pTemp->getLink();
			}
			pa = pa->getLink();
			pb = pb->getLink();
		}
		else if (pa->getEx() < pb->getEx()) {
			c.poly.insertAfter(pa->getCo, pa->getEx());
			pTemp = pTemp->getLink();
			pa = pa->getLink();
		}
		else {
			c.poly.insertAfter(pb->getCo, pb->getEx());
			pb = pb->getLink();
		}
	}
	if (pa->getLink != p_first) {
		p = pa;
	}
	else
		p = pb;
	while (p != p_cfirst) {
		c.poly.insertAfter(p->getCo(), p->getEx);
		p = p->getLink();
	}
	return c;
}
Polynomial Polynomial::operator*(const Polynomial &b) {
	Polynomial c;
	CircularListNode*pc=c.poly.getHead();
	int aM = poly.getEnd()->getEx(), bM = b.poly.getEnd()->getEx();
	if (aM != -1 || bM != -1) {
		int MaxExp = aM + bM,k=0;
		float *result = new float[MaxExp + 1];
		for (int i = 0; i <= MaxExp; i++)
			result[i] = 0;
		CircularListNode*pa = poly.getHead(), *pb = b.poly.getHead();
		pa = poly.getLink();
		while (pa != poly.getHead) {
			pb = b.poly.getLink();
			while (pb != b.poly.getHead()) {
				k = pa->getEx() + pb->getEx();
				result[k] = result[k] + pa->getCo()*pb->getCo();
				pb = pb->getLink();
			}
			for (int i = 0; i <= MaxExp; i++) {
				if (fabs(result[i]) > 0.001) 
					c.poly.insertAfter(result[i], i);
			}
			delete[]result;
		}
		pc->setLink(pc);
	}
	return c;
}
float Polynomial::evalute(float x) {
	float result = 0;
	CircularListNode *a = poly.getHead();
	CircularListNode *temp = poly.getLink();
	while (temp->getLink != a) {
		int expc = temp->getEx();
		float tempResult = 1;
		for (int i = 0; i < expc; i++)
			tempResult *= x;
		result += temp->getCo()*tempResult;
		temp = temp->getLink();
	}
	return result;
}
Polynomial::~Polynomial() {
	CircularListWithHead *p = &poly;
	delete p;
}