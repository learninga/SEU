package Component;

import javax.swing.JFrame;

import TextSelect.TextSelectionPanel;

public class TestComponent extends JFrame{
	public TestComponent(){		
		TextComponentPanel panel = new TextComponentPanel();
		this.setTitle("学生注册");
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.add(panel);
		this.setSize(650,450);		
	}
	
	public static void main(String args[]){
		TestComponent t = new TestComponent();
		t.setVisible(true);
	}
}
