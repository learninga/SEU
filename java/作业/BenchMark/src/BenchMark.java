import java.util.ArrayList;
import java.util.LinkedList;
public class BenchMark {
	 private static int testTimes=1000000;//测试次数
		public static void main(String[] args) {
			// TODO Auto-generated method stub
			
			//新建ArrayList 和LinkedList 的collection对象
			ArrayList<Integer> arrayTest=new ArrayList<Integer>();
			LinkedList<Integer> linkedTest=new LinkedList<Integer>();
			
			//测试add函数
			System.out.println("循环"+testTimes+"次，ArrayList 的 add函数性能测试：");
			new BenchMark().test_ArrayList_Add(arrayTest);
			System.out.println("循环"+testTimes+"次，LinkedList 的 add函数性能测试：");
			new BenchMark().test_LinkedList_Add(linkedTest);
			
			//测试iteration
			System.out.println("循环"+testTimes+"次，ArrayList 的 iteration性能测试：");
			new BenchMark().test_ArrayList_Iteration(arrayTest);
			System.out.println("循环"+testTimes+"次，LinkedList 的 iteration性能测试：");
			new BenchMark().test_LinkedList_Iteration(linkedTest);
			
			
			//测试get函数
			int getCnt=100000;
			System.out.println("循环"+getCnt+"次，ArrayList 的 get函数性能测试：");
			new BenchMark().testArrayListGet(arrayTest);
			System.out.println("循环"+getCnt+"次，LinkedList 的 get函数性能测试：");
			new BenchMark().testLinkedListGet(linkedTest);
			
			//测试remove函数
			int count=testTimes/10;
			System.out.println("循环"+testTimes+"次，ArrayList 的 remove函数性能测试：");
			new BenchMark().test_ArrayList_Remove(arrayTest,count);
			System.out.println("循环"+testTimes+"次，LinkedList 的 remove函数性能测试：");
			new BenchMark().test_LinkedList_Remove(linkedTest,count);
		}
		
		
		public void test_LinkedList_Remove(LinkedList<Integer> list,int cnt) {
			long startTime=System.currentTimeMillis();
			for(int i=0;i<=cnt;i++){
				list.remove(i);
			}
			long endTime=System.currentTimeMillis();
		   	System.out.println("共耗时:"+(endTime-startTime)+"ms");
		}


		public void test_ArrayList_Remove(ArrayList<Integer> list,int cnt) {
			long startTime=System.currentTimeMillis();
			for(int i=0;i<=cnt;i++){
				list.remove(i);
			}
			long endTime=System.currentTimeMillis();
		   	System.out.println("共耗时:"+(endTime-startTime)+"ms");
		}


		//iteration的两个测试函数
	   public void test_LinkedList_Iteration(LinkedList<Integer> list) {
		   long startTime=System.currentTimeMillis();
		   for(Integer a:list){
	   		continue;
	   	}
		   long endTime=System.currentTimeMillis();
	   	System.out.println("共耗时:"+(endTime-startTime)+"ms");
		}
		public void test_ArrayList_Iteration(ArrayList<Integer> list) {
	    	long startTime=System.currentTimeMillis();
	    	for(Integer a:list){
	    		continue;
	    	}
	    	long endTime=System.currentTimeMillis();
	    	System.out.println("共耗时:"+(endTime-startTime)+"ms");
		}
		
		
	    //add的两个测试函数
		private void test_LinkedList_Add(LinkedList<Integer>list) {
	    	long startTime=System.currentTimeMillis();
			for(int i=0;i<=testTimes;i++){
				list.add(i);
			}
			long endTime=System.currentTimeMillis();
			System.out.println("共耗时:"+(endTime-startTime)+"ms");
		}
		protected void test_ArrayList_Add(ArrayList<Integer> list) {
			long startTime=System.currentTimeMillis();
			for(int i=0;i<=testTimes;i++){
				list.add(i);
			}
			long endTime=System.currentTimeMillis();
			System.out.println("共耗时:"+(endTime-startTime)+"ms");
		}
		
		//get的两个测试函数
		public void testArrayListGet(ArrayList<Integer>list){
			long startTime=System.currentTimeMillis();
			for(int i=0;i<=100000;i++){
				list.get(i);
			}
			long endTime=System.currentTimeMillis();
			System.out.println("共耗时:"+(endTime-startTime)+"ms");
		}
		public void testLinkedListGet(LinkedList<Integer>list){
			long startTime=System.currentTimeMillis();
			for(int i=0;i<=100000;i++){
				list.get(i);
			}
			long endTime=System.currentTimeMillis();
			System.out.println("共耗时:"+(endTime-startTime)+"ms");
		}
}
