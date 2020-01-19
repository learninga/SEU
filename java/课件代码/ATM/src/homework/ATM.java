package homework;

import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;


public class ATM {
	Account ac;
	Socket connection;
	public  JFrame window;
	private JLabel namelabel , passwordlabel , balancelabel, operationlabel;
	private JTextField name , password , balance , operation , info;
	private JButton load, logout, reg,deposit,withdraw,check;
	ATM(){
		window=new JFrame("ATM");
		window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		namelabel=new JLabel("����"); passwordlabel=new JLabel("����");
		balancelabel=new JLabel("�˻����");operationlabel=new JLabel("�������");
		load=new JButton("��½");   logout=new JButton("�˳�");  reg=new JButton("ע��");
		deposit=new JButton("��Ǯ");  withdraw=new JButton("ȡǮ");  check=new JButton("��ѯ");
		name=new JTextField(); password=new JTextField(); balance=new JTextField();
		operation=new JTextField(); info=new JTextField();
		
		//��ʼʱ�����õ�½��ע�ᰴť����ʹ��
		logout.setEnabled(false); deposit.setEnabled(false);
		withdraw.setEnabled(false);check.setEnabled(false);
		
		//���ü���
		load.addActionListener(new LoadListen());
		reg.addActionListener(new RegListen());
		logout.addActionListener(new LogoutListen());
		deposit.addActionListener(new DeListen());
		withdraw.addActionListener(new WithdrawListen());
		check.addActionListener(new CheckListen());
		
		//���ò���
		JPanel panel1=new JPanel(new GridLayout(1,2)),
				panel2=new JPanel(new GridLayout(1,2)),
				panel3=new JPanel(new GridLayout(1,2)),
				panel4=new JPanel(new GridLayout(1,2)),
				panel5=new JPanel(new GridLayout(2,3)),panel6=new JPanel(new GridLayout(4,1));
		panel1.add(namelabel);panel1.add(name);
		panel2.add(passwordlabel);panel2.add(password);
		panel3.add(balancelabel);panel3.add(balance);
		panel4.add(operationlabel);panel4.add(operation);		
		panel5.add(load); panel5.add(logout); panel5.add(reg); panel5.add(deposit);
		panel5.add(withdraw);panel5.add(check);
		panel6.add(panel1);panel6.add(panel2);panel6.add(panel3);panel6.add(panel4);
		window.getContentPane().add(panel6);
		window.getContentPane().add(info);
		window.getContentPane().add(panel5);
		window.setLayout(new GridLayout(3,1));
		window.setSize(1000,1000);
		window.setVisible(true);
	}
	public void make_connection(int num) {
		if(num==1) {
				try {
					connection=new Socket(InetAddress.getLocalHost(),9021);
				} catch (UnknownHostException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		else if(num==2) {
			try {
				connection=new Socket(InetAddress.getLocalHost(),9022);
			} catch (UnknownHostException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		else if(num==3) {//��Ӧ��Ǯ
			try {
				connection=new Socket(InetAddress.getLocalHost(),9023);
			} catch (UnknownHostException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		else if(num==4)//��ӦȡǮ
		{
			try {
				connection=new Socket(InetAddress.getLocalHost(),9024);
			} catch (UnknownHostException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		else  if(num==5)//��Ӧ�˳�
		{
			try {
				connection=new Socket(InetAddress.getLocalHost(),9025);
			} catch (UnknownHostException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		else if(num==6)//��Ӧ��ѯ
		{
			try {
				connection=new Socket(InetAddress.getLocalHost(),9026);
			} catch (UnknownHostException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	//��Ӧ��½button �ĵ�½����
	private class LoadListen implements ActionListener{
		public void actionPerformed(ActionEvent e) {
			String in_name=name.getText();
			String in_pwd=password.getText();
			make_connection(1);
			BufferedWriter bw;
			try {
				//��������˻��� ���봫�͸�bank
				bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
				bw.write(in_name);
				bw.write(in_pwd);
				bw.flush();
				//����bank���ص��˻�����  ���˻������Ϣ
				BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
				String pwd=br.readLine();
				long money=Long.parseLong(br.readLine());
				//����¼�˻���ȷʱ
				if(in_pwd.equals(pwd)) {
					ac=new Account(in_name,in_pwd,money);
					//���ý����ϵı仯�Լ�ת̬�ĸı�
					logout.setEnabled(true);
					deposit.setEnabled(true);
					withdraw.setEnabled(true);
					check.setEnabled(true);
					load.setEnabled(false);
					reg.setEnabled(false);
				}
				else {
					name.setText("");
					password.setText("");
					info.setText("�����������  ����������");
				}
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}//end  of  function
	}//end  of  inner  class
	
	//��Ӧע��button�Ĳ���
	private class RegListen implements ActionListener{
		public void actionPerformed(ActionEvent e) {
			//��ȡע����Ϣ  ��ǰ�˻�Ϊע���˻�
		String in_name=name.getText();
		String in_pwd=password.getText();
		ac=new Account(in_name,in_pwd,0);
		
		//�Զ������½����
		logout.setEnabled(true);
		deposit.setEnabled(true);
		withdraw.setEnabled(true);
		check.setEnabled(true);
		load.setEnabled(false);
		reg.setEnabled(false);
		
		//��������  ����Ϣ���뵽bank��
		make_connection(2);
		BufferedWriter bw;
		try {
			bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
			bw.write(in_name);
			bw.write(in_pwd);
			bw.flush();
		} catch (IOException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
		}//end of function
}
	
	//��Ӧ��Ǯbutton  �ı䱾ATM���˻���Ϣ��info��ʾ���ɹ�  bank��ʾ�ɹ�
	private class DeListen implements ActionListener{
		public void actionPerformed(ActionEvent e) {
			long money=Long.parseLong(operation.getText());
			long account_money=ac.get_money();//�õ���ǰ�˻����ֵ
			account_money=money+account_money;//����Ǯ��ǰ�˻����
			make_connection(3);
			try {
				
				//�ı�bank����Ӧ�˻�ֵ
				BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
				bw.write(ac.get_name());
				bw.write(money+"");
				bw.write(account_money+"");
				bw.flush();
				
				//�ı䵱ǰaccount�����ֵ
				ac.set_money(account_money);
				
				//ATM����仯
				info.setText("���ɹ�");
				operation.setText("");
				balance.setText(Long.toString(account_money));
				
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			//�ı䵱ǰaccount�����ֵ
			ac.set_money(account_money);
			
			//ATM����仯
			info.setText("���ɹ�");
			operation.setText("");
			balance.setText(Long.toString(account_money));
		}
}
	
	//��ӦȡǮbutton �ı䵱ǰaccount�����ֵ��bank��ʾ��info��ʾȡ��ɹ�
	private class WithdrawListen implements ActionListener{
		public void actionPerformed(ActionEvent e ) {
			long money=Long.parseLong(operation.getText());
			long account_money=ac.get_money();//��ǰ�˻����
			//����ȡǮʱ
			if(money>account_money) {
				info.setText("�˻�����");
				operation.setText("");
			}
			//����㹻   ����ȡǮʱ
			else {
				account_money=account_money-money;
				
				//Bank�仯
				make_connection(4);
				try {
					BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
				bw.write(ac.get_name());
				bw.write(money+"");//ȡǮ��
				bw.write(account_money+"");//��ǰ���
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				
				//�ı�account�����ֵ
				ac.set_money(account_money);
				//ATM����仯
				info.setText("ȡ��ɹ�");
				operation.setText("");
				balance.setText(Long.toString(account_money));
				
			}
		}
	}
	
	//��Ӧ�˳�button   
	private class LogoutListen implements ActionListener{
		public void actionPerformed(ActionEvent e ) {
			BufferedWriter bw;
			try {
				make_connection(5);
				bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
				bw.write(ac.get_name());
				bw.write(ac.get_money()+"");
				bw.flush();
				connection.close();
				
				//������ǰ���г���
				System.exit(0);
				
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}//end  of  function
	}//end  of  class
	
	//��Ӧ��ѯbutton
	private class CheckListen implements ActionListener{
		public void actionPerformed(ActionEvent e) {
			//��ATM������仯
			balance.setText(Long.toString(ac.get_money()));
			info.setText(ac.get_name()+"�˻����Ϊ��"+Long.toString(ac.get_money()));
			
			//Bank ������ʾ�仯
			make_connection(6);
			 try {
				BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
			bw.write(ac.get_name());
			 } catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}//end  of  function
	}//end  of  Check  class
	
	//main����
	public static void main(String args[]) {
		ATM a=new ATM();
	}
	}//end of class ATM
