#pragma once
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define my_malloc malloc  //宏定义
#define my_free free   //宏定义

//hash结构体
struct hash_node {
	char* key;
	void* value; // void*表示value;
	struct hash_node* next;//串联同一个集合的节点
};

//hash结构体
struct hash_table {
	struct hash_node** hash_set; //每个集合的链表的头指针；
	int n; //hash_table里面有多少集合
};




//创建对象
struct hash_table* create_hash_table(int n) {
	struct hash_table* t = my_malloc(sizeof(struct hash_table)); //分配结构内存
	memset(t, 0, sizeof(struct hash_table));   //初始内存

											   //n个集合的内存，存放的是链表头的指针
	t->hash_set = my_malloc(n * sizeof(struct hash_node*)); //分配结构体集合内存
	memset(t->hash_set, 0, sizeof(struct hash_node*)*n);
	t->n = n; //记录集合个数
	return  t;

}


//经典hash算法
static unsigned int hash_index(char *str)
{
	register unsigned int h;
	register unsigned char *p;

	for (h = 0, p = (unsigned char *)str; *p; p++)
		h = 31 * h + *p;

	return h;
}




void hash_insert(struct hash_table* t, char* key, void* value) {

	struct hash_node* node = my_malloc(sizeof(struct hash_node));
	memset(node, 0, sizeof(struct hash_node));
	node->key = _strdup(key);
	node->value = value;

	//使用hash来返回key，属于哪个集合
	int index = (hash_index(key) % t->n); // 模运算，整除取余[0,0-1]
	struct hash_node* header = t->hash_set[index];

	node->next = header;
	t->hash_set[index] = node;
}



void hash_set(struct hash_table* t, char*key, void* value) {
	//使用hash来返回key，属于哪个集合
	int index = (hash_index(key) % t->n); // 模运算，整除取余[0,0-1]
	struct hash_node** walk = &(t->hash_set[index]);

	while (*walk) {
		if (strcmp((*walk)->key, key) == 0) {
			(*walk)->value = value;
			return;
		}
		walk = &((*walk)->next);
	}

	//不存在key,value
	struct hash_node* node = my_malloc(sizeof(struct hash_node));
	memset(node, 0, sizeof(struct hash_node));
	node->key = _strdup(key);
	node->value = value;
	*walk = node;
	//end
}



void* hash_find(struct hash_table* t, char* key) {
	//使用hash来返回key，属于哪个集合
	int index = (hash_index(key) % t->n); // 模运算，整除取余[0,0-1]
	struct hash_node* walk = (t->hash_set[index]);

	while (walk) {
		if (strcmp((walk)->key, key) == 0) {
			return walk->value;
		}
		walk = walk->next;
	}

	return NULL;
}




void hash_delete(struct hash_table* t, char* key) {
	int index = (hash_index(key) % t->n); // 模运算，整除取余[0,0-1]
	struct hash_node** walk = &(t->hash_set[index]);

	while (*walk) {
		if (strcmp((*walk)->key, key) == 0) {
			struct hash_node* rm_node = *walk;
			*walk = (*walk)->next;

			rm_node->next = NULL;

			//key,hash_node释放节点
			my_free(rm_node->key);
			my_free(rm_node);
		}
		else
		{
			walk = &((*walk)->next);

		}
	}
}



void hash_clear(struct hash_table* t) {
	for (int i = 0; i < t->n; i++) {
		struct hash_node* walk = t->hash_set[i];
		t->hash_set[i] = NULL;

		while (walk) {
			struct hash_node* rm_node = walk;
			walk = walk->next;
			rm_node->next = NULL;

			my_free(rm_node->key);
			my_free(rm_node);
		}
	}
}

void destroy_hash_table(struct hash_table* t) {
	//删除所有的元素
	hash_clear(t);
	if (t->hash_set) {
		my_free(t->hash_set);
		t->hash_set = NULL;
	}

	my_free(t);
}


