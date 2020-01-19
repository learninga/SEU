package experiment.gui;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.FileWriter;
import java.io.IOException;

import javax.swing.*;
import javax.swing.border.EtchedBorder;
 

public class TestComponentPanel extends JPanel {
	JLabel     labelName;     
	JLabel     labelAddress;      
	JLabel     labelQuali;      
	JLabel     labelHobby;     
	JLabel     labelSex;      
	
	JComboBox  qualiBox;
	String[] qualiStrings = { "������", "˶ʿ�о���", "��ʿ�о���"};
	
	
	JTextField textName; 
	JTextArea  textAddress;   
	
	JCheckBox cboxlist[];
	JRadioButton rbtnlist[];
	
	JButton btnlist[];
	
	public TestComponentPanel(){
		//this.setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
		this.setLayout(new GridLayout(4,1));
		
		this.setName("inner panel");
		
		labelName    = new JLabel("����");
		labelAddress = new JLabel("��ַ"");
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
		//plist[0].setLayout(new GridLayout(1,4));
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

}

