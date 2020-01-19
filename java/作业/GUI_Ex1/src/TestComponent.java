import javax.swing.JButton;
import javax.swing.JFrame;

public class TestComponent extends JFrame {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public TestComponent(){		
		JFrame window=new JFrame("学生注册");
		TestComponentPanel panel = new TestComponentPanel();
		window.add(panel);
		window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		JButton check=new JButton("验证");
		this.add(check);
		JButton refresh=new JButton("重置");
		this.add(refresh);
		check.addActionListener(new CheckEventListener());
		refresh.addActionListener(new RefreshEventListener());
		this.setSize(650,450);		
	}
	
	public static void main(String args[]){
		TestComponent t = new TestComponent();
		t.setVisible(true);
	}
}
