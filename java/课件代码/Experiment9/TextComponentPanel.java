package Component;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.FileWriter;
import java.io.IOException;

import javax.swing.*;
import javax.swing.border.EtchedBorder;
 

public class TextComponentPanel extends JPanel {
	JLabel     labelName;      //标签
	JLabel     labelAddress;      //标签
	JLabel     labelQuali;      //标签
	JLabel     labelHobby;      //标签
	JLabel     labelSex;      //标签
	
	JComboBox  qualiBox;
	String[] qualiStrings = { "本科生", "硕士研究生", "博士研究生"};
	
	
	JTextField textName; //单行文本输入框
	JTextArea  textAddress;   //多行文本输入框
	
	JCheckBox cboxlist[];
	JRadioButton rbtnlist[];
	
	JButton btnlist[];
	
	private class SaveListener implements ActionListener {
		public void actionPerformed(ActionEvent e){
			String name = textName.getText()+"\n";
			String addr = textAddress.getText()+"\n";
			String hobby = "爱好：";
			for(JCheckBox cbox : cboxlist){
				if(cbox.isSelected()){
					hobby+=cbox.getText()+" ";
				}
			}
			hobby+=".\n";
			String qualify = qualiStrings[qualiBox.getSelectedIndex()]+"\n";
			String sex = "性别：";
			for(JRadioButton r : rbtnlist){
				if(r.isSelected()){
					sex += r.getText();
				}
			}
			sex+="\n";
			FileWriter fw = null;
			try {
				fw = new FileWriter("stu.txt");
				fw.write(name);
				fw.write(addr);
				fw.write(qualify);
				fw.write(hobby);
				fw.write(sex);
			} catch (IOException ex) {
				System.out.println(ex);
			} finally {
				try { 
					fw.close();
				} catch (IOException ex){
					System.out.println(ex);
				}
			}
		}
	}
	
	private class ClearListener implements ActionListener {
		public void actionPerformed(ActionEvent e){
			textName.setText("");
			textAddress.setText("");
			for(JCheckBox cbox : cboxlist){
				cbox.setSelected(false);
			}
			cboxlist[0].setSelected(true);
			rbtnlist[0].setSelected(true);
			
			qualiBox.setSelectedIndex(0);
		}
	}
	public TextComponentPanel(){
		//this.setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
		this.setLayout(new GridLayout(4,1));
		
		this.setName("inner panel");
		
		labelName    = new JLabel("姓名");
		labelAddress = new JLabel("地址");
		labelQuali   = new JLabel("学历");
		labelHobby   = new JLabel("爱好");
		labelSex     = new JLabel("性别");
		
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
		btnlist[0] = new JButton("验证");
		btnlist[1] = new JButton("重置");
		plist[3].add(btnlist[0]);
		plist[3].add(btnlist[1]);
		btnlist[0].addActionListener(new SaveListener());
		btnlist[1].addActionListener(new ClearListener());
		
	}

}
