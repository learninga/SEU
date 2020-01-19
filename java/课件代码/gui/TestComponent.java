package experiment.gui;

import javax.swing.JFrame;

public class TestComponent extends JFrame{
	public TestComponent(){		
		TestComponentPanel panel = new TestComponentPanel();
		this.setTitle("Ñ§Éú×¢²á");
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.add(panel);
		this.setSize(650,450);		
	}
	
	public static void main(String args[]){
		TestComponent t = new TestComponent();
		t.setVisible(true);
	}
}