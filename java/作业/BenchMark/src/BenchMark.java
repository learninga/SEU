import java.util.ArrayList;
import java.util.LinkedList;
public class BenchMark {
	 private static int testTimes=1000000;//���Դ���
		public static void main(String[] args) {
			// TODO Auto-generated method stub
			
			//�½�ArrayList ��LinkedList ��collection����
			ArrayList<Integer> arrayTest=new ArrayList<Integer>();
			LinkedList<Integer> linkedTest=new LinkedList<Integer>();
			
			//����add����
			System.out.println("ѭ��"+testTimes+"�Σ�ArrayList �� add�������ܲ��ԣ�");
			new BenchMark().test_ArrayList_Add(arrayTest);
			System.out.println("ѭ��"+testTimes+"�Σ�LinkedList �� add�������ܲ��ԣ�");
			new BenchMark().test_LinkedList_Add(linkedTest);
			
			//����iteration
			System.out.println("ѭ��"+testTimes+"�Σ�ArrayList �� iteration���ܲ��ԣ�");
			new BenchMark().test_ArrayList_Iteration(arrayTest);
			System.out.println("ѭ��"+testTimes+"�Σ�LinkedList �� iteration���ܲ��ԣ�");
			new BenchMark().test_LinkedList_Iteration(linkedTest);
			
			
			//����get����
			int getCnt=100000;
			System.out.println("ѭ��"+getCnt+"�Σ�ArrayList �� get�������ܲ��ԣ�");
			new BenchMark().testArrayListGet(arrayTest);
			System.out.println("ѭ��"+getCnt+"�Σ�LinkedList �� get�������ܲ��ԣ�");
			new BenchMark().testLinkedListGet(linkedTest);
			
			//����remove����
			int count=testTimes/10;
			System.out.println("ѭ��"+testTimes+"�Σ�ArrayList �� remove�������ܲ��ԣ�");
			new BenchMark().test_ArrayList_Remove(arrayTest,count);
			System.out.println("ѭ��"+testTimes+"�Σ�LinkedList �� remove�������ܲ��ԣ�");
			new BenchMark().test_LinkedList_Remove(linkedTest,count);
		}
		
		
		public void test_LinkedList_Remove(LinkedList<Integer> list,int cnt) {
			long startTime=System.currentTimeMillis();
			for(int i=0;i<=cnt;i++){
				list.remove(i);
			}
			long endTime=System.currentTimeMillis();
		   	System.out.println("����ʱ:"+(endTime-startTime)+"ms");
		}


		public void test_ArrayList_Remove(ArrayList<Integer> list,int cnt) {
			long startTime=System.currentTimeMillis();
			for(int i=0;i<=cnt;i++){
				list.remove(i);
			}
			long endTime=System.currentTimeMillis();
		   	System.out.println("����ʱ:"+(endTime-startTime)+"ms");
		}


		//iteration���������Ժ���
	   public void test_LinkedList_Iteration(LinkedList<Integer> list) {
		   long startTime=System.currentTimeMillis();
		   for(Integer a:list){
	   		continue;
	   	}
		   long endTime=System.currentTimeMillis();
	   	System.out.println("����ʱ:"+(endTime-startTime)+"ms");
		}
		public void test_ArrayList_Iteration(ArrayList<Integer> list) {
	    	long startTime=System.currentTimeMillis();
	    	for(Integer a:list){
	    		continue;
	    	}
	    	long endTime=System.currentTimeMillis();
	    	System.out.println("����ʱ:"+(endTime-startTime)+"ms");
		}
		
		
	    //add���������Ժ���
		private void test_LinkedList_Add(LinkedList<Integer>list) {
	    	long startTime=System.currentTimeMillis();
			for(int i=0;i<=testTimes;i++){
				list.add(i);
			}
			long endTime=System.currentTimeMillis();
			System.out.println("����ʱ:"+(endTime-startTime)+"ms");
		}
		protected void test_ArrayList_Add(ArrayList<Integer> list) {
			long startTime=System.currentTimeMillis();
			for(int i=0;i<=testTimes;i++){
				list.add(i);
			}
			long endTime=System.currentTimeMillis();
			System.out.println("����ʱ:"+(endTime-startTime)+"ms");
		}
		
		//get���������Ժ���
		public void testArrayListGet(ArrayList<Integer>list){
			long startTime=System.currentTimeMillis();
			for(int i=0;i<=100000;i++){
				list.get(i);
			}
			long endTime=System.currentTimeMillis();
			System.out.println("����ʱ:"+(endTime-startTime)+"ms");
		}
		public void testLinkedListGet(LinkedList<Integer>list){
			long startTime=System.currentTimeMillis();
			for(int i=0;i<=100000;i++){
				list.get(i);
			}
			long endTime=System.currentTimeMillis();
			System.out.println("����ʱ:"+(endTime-startTime)+"ms");
		}
}
