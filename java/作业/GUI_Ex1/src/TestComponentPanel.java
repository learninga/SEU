import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import javax.swing.*;
import javax.swing.border.EtchedBorder;
public class TestComponentPanel extends JPanel {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	JLabel     labelName;     
	JLabel     labelAddress;      
	JLabel     labelQuali;      
	JLabel     labelHobby;     
	JLabel     labelSex;      
	
	 String[] qualiStrings = { "������", "˶ʿ�о���", "��ʿ�о���"};
	 JComboBox  qualiBox(qualiStrings);
	
    JTextArea  textAddress;   
	
	public JCheckBox cboxlist[];
	JRadioButton rbtnlist[];
	
    JButton btnlist[];
	private JTextField textName;
	
	public TestComponentPanel(){
		this.setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
		this.setLayout(new GridLayout(4,1));
		
		this.setName("inner panel");
		
		labelName    = new JLabel("����");
		labelAddress = new JLabel("��ַ");
		labelQuali   = new JLabel("ѧ��");
		labelHobby   = new JLabel("����");
		labelSex     = new JLabel("�Ա�");
		
	     textName  = new JTextField(20);
	     textAddress = new JTextArea(8,20);
		
		cboxlist = new JCheckBox[3];
		cboxlist[0] = new JCheckBox("Reading");
		cboxlist[1] = new JCheckBox("Swimming");
		cboxlist[2] = new JCheckBox("Dancing");
		cboxlist[0].setSelected(true);
	
		rbtnlist = new JRadioButton[2];
		rbtnlist[0] = new JRadioButton("male");
		rbtnlist[1] = new JRadioButton("female");
		ButtonGroup sexgrp = new ButtonGroup();
		sexgrp.add(rbtnlist[0]);
		sexgrp.add(rbtnlist[1]);
		rbtnlist[0].setSelected(true);
		
		JPanel[] plist = new JPanel[4];
		for(int i = 0; i < 4; i++){
			plist[i] = new JPanel(new FlowLayout(FlowLayout.LEFT));
			this.add(plist[i]);
		}
		plist[0].setLayout(new GridLayout(1,4));
		plist[0].add(labelName);
		plist[0].add(textName);
		plist[0].add(labelQuali);
		qualiBox = new JComboBox(qualiStrings);
		plist[0].add(qualiBox);   

		plist[1].add(labelAddress);
		plist[1].add(textAddress);
		plist[1].add(labelHobby);
		JPanel hobbyPanel = new JPanel();
		hobbyPanel.setLayout(new BoxLayout(hobbyPanel, BoxLayout.Y_AXIS));
		hobbyPanel.setBorder(new EtchedBorder(EtchedBorder.RAISED));
		plist[1].add(hobbyPanel);
		hobbyPanel.add(cboxlist[0]);
		hobbyPanel.add(cboxlist[1]);
		hobbyPanel.add(cboxlist[2]);
		
		plist[2].add(labelSex);
		JPanel sexPanel = new JPanel();
		sexPanel.setLayout(new BoxLayout(sexPanel, BoxLayout.Y_AXIS));
		sexPanel.setBorder(new EtchedBorder(EtchedBorder.RAISED));
		sexPanel.add(rbtnlist[0]);
		sexPanel.add(rbtnlist[1]);
		plist[2].add(sexPanel);
		
		plist[3].setLayout(new FlowLayout(FlowLayout.CENTER));
		btnlist = new JButton[2];
		btnlist[0] = new JButton("��֤");
		btnlist[1] = new JButton("����");
		plist[3].add(btnlist[0]);
		plist[3].add(btnlist[1]);
	}
	class CheckEventListener implements ActionListener{
		public void actionPerformed(ActionEvent e) {
			File file=new File(".");
			if(!file.exists()) {
				try {
					file.createNewFile();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
			FileWriter out;
			try {
				out = new FileWriter(file);
				out.write("����Ϊ"+textName.getText());
				out.write("��ַΪ"+textAddress.getText());
				for(int i=0;i<3;i++) {
					out.write("����Ϊ��");
					out.write(cboxlist[i].getSelectedIcon().toString());
				}
				if(rbtnlist[0].isSelected())
					out.write("�Ա�Ϊmale");
				else
					out.write("�Ա�Ϊfemale");
				
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
	}
    @SuppressWarnings("unused") 
    class RefreshEventListener implements ActionListener{
    	public void actionPerformed(ActionEvent e) {
    		textName.setText(" ");
    		textAddress.setText("");
    		for(int i=0;i<3;i++)
    			cboxlist[i].setSelected(false);
    		for(int i=0;i<2;i++)
    			rbtnlist[i].setSelected(false);
    	}
    }
}
