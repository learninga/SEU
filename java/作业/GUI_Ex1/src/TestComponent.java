import javax.swing.JButton;
import javax.swing.JFrame;

public class TestComponent extends JFrame {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public TestComponent(){		
		JFrame window=new JFrame("ѧ��ע��");
		TestComponentPanel panel = new TestComponentPanel();
		window.add(panel);
		window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		JButton check=new JButton("��֤");
		this.add(check);
		JButton refresh=new JButton("����");
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
