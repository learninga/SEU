import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.GridLayout;

import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JTextField;
import javax.swing.ButtonGroup;
import javax.swing.JButton;

public class Caculator {
	private static void cal_window() {
		JFrame window=new JFrame();
		BorderLayout cal=new BorderLayout();
		window.setLayout(cal);
		
		
		
		
		
		window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		window.setVisible(true);
	}
	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		cal_window();
	}

}
