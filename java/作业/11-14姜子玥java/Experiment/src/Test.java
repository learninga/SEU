
public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
   SimpleStack<Integer> num = new SimpleStack<Integer>();
   System.out.println("向栈中填入数字");
   num.push(1);
   num.push(2);
   System.out.print(num.peek());
   System.out.println("   ");
   num.pop();
   System.out.print(num.peek());
   System.out.println("   ");
   num.pop();
   if(num.empty())
	   System.out.println("This  stack  is  empty");
   SimpleStack<String> stringlist=new SimpleStack<String>();
	stringlist.push("java");
	stringlist.push("c++");
	stringlist.push("python");
	System.out.println("向栈中填入编程语言名");
	while(!stringlist.empty()){
		System.out.print(stringlist.peek());
		System.out.println("   ");
		stringlist.pop();
	}
	System.out.println("This  stack  is  empty");
	}
}
