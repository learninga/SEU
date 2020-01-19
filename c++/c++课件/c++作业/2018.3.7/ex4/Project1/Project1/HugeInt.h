#ifndef HUGEINTEGER_H
#define HUGEINTEGER_H
class HugeInteger
{
public: 
 HugeInteger();
 HugeInteger(const char *);
 HugeInteger add(const HugeInteger &);
 HugeInteger add(const char*);
 bool isEqualTo(HugeInteger &); 
 bool isGreaterThan(HugeInteger &); 
 void input(const char *);
 void output();
private:
	short integer[40]; 
}; 
#endif
