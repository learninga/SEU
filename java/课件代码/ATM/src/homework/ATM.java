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
		namelabel=new JLabel("姓名"); passwordlabel=new JLabel("密码");
		balancelabel=new JLabel("账户余额");operationlabel=new JLabel("操作余额");
		load=new JButton("登陆");   logout=new JButton("退出");  reg=new JButton("注册");
		deposit=new JButton("存钱");  withdraw=new JButton("取钱");  check=new JButton("查询");
		name=new JTextField(); password=new JTextField(); balance=new JTextField();
		operation=new JTextField(); info=new JTextField();
		
		//开始时仅设置登陆和注册按钮可以使用
		logout.setEnabled(false); deposit.setEnabled(false);
		withdraw.setEnabled(false);check.setEnabled(false);
		
		//设置监听
		load.addActionListener(new LoadListen());
		reg.addActionListener(new RegListen());
		logout.addActionListener(new LogoutListen());
		deposit.addActionListener(new DeListen());
		withdraw.addActionListener(new WithdrawListen());
		check.addActionListener(new CheckListen());
		
		//设置布局
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
		else if(num==3) {//响应存钱
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
		else if(num==4)//响应取钱
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
		else  if(num==5)//响应退出
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
		else if(num==6)//响应查询
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
	
	//响应登陆button 的登陆操作
	private class LoadListen implements ActionListener{
		public void actionPerformed(ActionEvent e) {
			String in_name=name.getText();
			String in_pwd=password.getText();
			make_connection(1);
			BufferedWriter bw;
			try {
				//将输入的账户名 密码传送给bank
				bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
				bw.write(in_name);
				bw.write(in_pwd);
				bw.flush();
				//接受bank返回的账户密码  和账户余额信息
				BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
				String pwd=br.readLine();
				long money=Long.parseLong(br.readLine());
				//当登录账户正确时
				if(in_pwd.equals(pwd)) {
					ac=new Account(in_name,in_pwd,money);
					//设置界面上的变化以及转态的改变
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
					info.setText("密码输入错误  请重新输入");
				}
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}//end  of  function
	}//end  of  inner  class
	
	//响应注册button的操作
	private class RegListen implements ActionListener{
		public void actionPerformed(ActionEvent e) {
			//获取注册信息  当前账户为注册账户
		String in_name=name.getText();
		String in_pwd=password.getText();
		ac=new Account(in_name,in_pwd,0);
		
		//自动进入登陆界面
		logout.setEnabled(true);
		deposit.setEnabled(true);
		withdraw.setEnabled(true);
		check.setEnabled(true);
		load.setEnabled(false);
		reg.setEnabled(false);
		
		//建立连接  将信息传入到bank中
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
	
	//响应存钱button  改变本ATM中账户信息，info显示存款成功  bank显示成功
	private class DeListen implements ActionListener{
		public void actionPerformed(ActionEvent e) {
			long money=Long.parseLong(operation.getText());
			long account_money=ac.get_money();//得到当前账户余额值
			account_money=money+account_money;//存入钱后当前账户余额
			make_connection(3);
			try {
				
				//改变bank内相应账户值
				BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
				bw.write(ac.get_name());
				bw.write(money+"");
				bw.write(account_money+"");
				bw.flush();
				
				//改变当前account的余额值
				ac.set_money(account_money);
				
				//ATM界面变化
				info.setText("存款成功");
				operation.setText("");
				balance.setText(Long.toString(account_money));
				
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			//改变当前account的余额值
			ac.set_money(account_money);
			
			//ATM界面变化
			info.setText("存款成功");
			operation.setText("");
			balance.setText(Long.toString(account_money));
		}
}
	
	//响应取钱button 改变当前account的余额值，bank显示，info显示取款成功
	private class WithdrawListen implements ActionListener{
		public void actionPerformed(ActionEvent e ) {
			long money=Long.parseLong(operation.getText());
			long account_money=ac.get_money();//当前账户余额
			//不能取钱时
			if(money>account_money) {
				info.setText("账户余额不足");
				operation.setText("");
			}
			//余额足够   可以取钱时
			else {
				account_money=account_money-money;
				
				//Bank变化
				make_connection(4);
				try {
					BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
				bw.write(ac.get_name());
				bw.write(money+"");//取钱数
				bw.write(account_money+"");//当前余额
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				
				//改变account的余额值
				ac.set_money(account_money);
				//ATM界面变化
				info.setText("取款成功");
				operation.setText("");
				balance.setText(Long.toString(account_money));
				
			}
		}
	}
	
	//响应退出button   
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
				
				//结束当前运行程序
				System.exit(0);
				
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}//end  of  function
	}//end  of  class
	
	//响应查询button
	private class CheckListen implements ActionListener{
		public void actionPerformed(ActionEvent e) {
			//本ATM机界面变化
			balance.setText(Long.toString(ac.get_money()));
			info.setText(ac.get_name()+"账户余额为："+Long.toString(ac.get_money()));
			
			//Bank 界面显示变化
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
	
	//main函数
	public static void main(String args[]) {
		ATM a=new ATM();
	}
	}//end of class ATM
