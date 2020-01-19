import java.util.LinkedList;

public class SimpleStack<T> extends Stack<T> {
	private LinkedList<T> simple_stack=new LinkedList<T>();
	public boolean empty(){
		return simple_stack.isEmpty();
	}
	public T peek(){
		return simple_stack.getFirst();
	}
	public T pop(){
		return simple_stack.removeFirst();
	}
	public void push(T e){
		simple_stack.addFirst(e);
	}
}
