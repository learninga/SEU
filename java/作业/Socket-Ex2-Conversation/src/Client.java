import java.awt.GridLayout;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextField;
/*
 * ���뽫input��Ϊ�����̶߳�������
 * ���еķ��ͷ���output��
 * input����thread��
 * output����action��
 * main ���ȳ�ʼ�������ٳ�ʼ��server�ٵȴ�
 * 
 * */
public class Client {
	private static JPanel panel;
	private static JTextField talking_area;
	private static JTextField  input_area;
	private static JButton send;
	public static void intial() {
		send=new JButton("����");
		JFrame f=new JFrame("���촰��");
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		panel.add(send);
		panel.add(input_area);
		f.getContentPane().add(panel);
		f.getContentPane().add(talking_area);
		f.getContentPane().setLayout(new GridLayout(1,2));
		f.setVisible(true);	
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		intial();
		
	}
	public class ButtonListener implements ActionListener{
		public void actionPerformed() {
			
		}
	}
	
	
	
	
}
