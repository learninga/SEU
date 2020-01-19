#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
struct node {
	int start;
	int end;
	int length;
};
bool compare(node a, node b) {
	return a.length < b.length;
}
int main() {
	void kruskal(vector<node> &arr, vector<bool> &visited);
	int M, N;
	cin >> M >> N;
	vector<node> arr(N);
	vector<bool> visited(M);
	kruskal(arr, visited);
	system("pause");
}

void kruskal(vector<node> &arr, vector<bool> &visited)
{
	int M, N;
	M = visited.size();
	N = arr.size();
	for (int i = 0; i < N; i++)
	{
		cin >> arr[i].start >> arr[i].end >> arr[i].length;
	}
	sort(arr.begin(), arr.end(), compare);
	int weight = 0;
	for (int i = 0; i < N; i++)
	{
		if (!visited[arr[i].start] || !visited[arr[i].end])
		{
			weight += arr[i].length;
			visited[arr[i].start] = true;
			visited[arr[i].end] = true;
		}
	}
	cout << "最小生成树权值为:";
	cout << weight << endl;
}