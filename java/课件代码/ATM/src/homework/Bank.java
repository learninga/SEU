package homework;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStreamWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Scanner;

import javax.swing.JFrame;
import javax.swing.JTextField;

public class Bank {
	//private List<HashMap<String,Account>> bank;//���������˻���Ϣ
	private HashMap<String,Account>bank;
	private JFrame window;
	private JTextField  result;
	private ServerSocket s=null;
	private Socket skt = null;
	Bank(){
		window=new JFrame("����");
		result=new JTextField();
		result.setSize(800,800);
		window.getContentPane().add(result);
		window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		window.setVisible(true);
		window.setSize(1000,1000);
	}
	//�������������ļ������������  ��Ϊ�����˻�������Ϣ�߳�
	public void start_bank() {
		File file=new File("account.txt");
		if(!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		FileInputStream fis;
		ObjectInputStream ois;
			try {
				fis = new FileInputStream(file);
				ois = new ObjectInputStream(fis);
				try {
					bank=(HashMap<String,Account>)ois.readObject();
					ois.close();
				} catch (ClassNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			start_thread();
			}//end  of  function
	
	//�����߳�
	public void start_thread() {
		Iterator<Entry<String, Account>> iter=bank.entrySet().iterator();
		while(iter.hasNext()){
			Map.Entry<String,Account>element=(Map.Entry<String, Account>)iter.next();
			Account a=element.getValue();
			BankThread b=new BankThread(a);
			b.start();
		}
	}
	
	//�����˳� �������˻���Ϣд���ļ�
	public void end_bank() {
		File file=new File("account.txt");
		FileOutputStream fos;
		ObjectOutputStream oos;
			try {
				fos=new FileOutputStream(file);
				oos=new ObjectOutputStream(fos);
					//д���ļ�
					oos.writeObject(bank);
					oos.flush();
					oos.close();
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}
	
	//����bank���˻���ֵ
	public void refresh (String account_name,Long account_money) {
		Account new_ac=bank.get(account_name);
		new_ac.set_money(account_money);
		bank.put(account_name, new_ac);
	}
	
	//����bank-ATM����
	public void make_connection() {
		try {
			s = new ServerSocket(9021,5);
			skt = s.accept();
			response_load();
		} catch (IOException e) {
		System.out.println(e);
	     }//end  of  catch
		try {
			s = new ServerSocket(9022,5);
			skt = s.accept();
			response_reg();
		} catch (IOException e) {
		System.out.println(e);
	     }//end  of  catch
		try {
			s = new ServerSocket(9023,5);
			skt = s.accept();
			response_deposit();
		} catch (IOException e) {
		System.out.println(e);
	     }//end  of  catch
		try {
			s = new ServerSocket(9024,5);
			skt = s.accept();
			response_withdraw();
		} catch (IOException e) {
		System.out.println(e);
	     }//end  of  catch
		try {
			s = new ServerSocket(9025,5);
			skt = s.accept();
			response_logout();
			System.exit(0);
		} catch (IOException e) {
		System.out.println(e);
	     }//end  of  catch
		try {
			s = new ServerSocket(9026,5);
			skt = s.accept();
			response_check();
		} catch (IOException e) {
		System.out.println(e);
	     }//end  of  catch
	}
	
	//��Ӧ��½����
	public void response_load() {
		String name;
		try {
			//�ı����
			BufferedReader br = new BufferedReader(new InputStreamReader(skt.getInputStream()));
			name = br.readLine();
			String in_pwd=br.readLine();
			//ͨ���������ӽ���Ӧ�û��������û�   ���ظ�ATM����
			String pwd=bank.get(name).get_pwd();
			BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(skt.getOutputStream()));
			bw.write(pwd);
			bw.write(bank.get(name).get_money()+"");
			bw.flush();
			//��¼�ɹ�
			if(pwd.equals(in_pwd)) {
				long money=bank.get(name).get_money();
				String info=result.getText();
				info=info+("\n"+"LOGIN:"+name+"�˻����Ϊ��"+money);
				result.setText(info);
			}
			//��¼ʧ��
			else {
				String info=result.getText();
				info=info+("\n"+"LOGIN  Failed :"+name);
				result.setText(info);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			if (skt != null) { 
				try { skt.close(); } catch (Exception e) {System.out.println(e);}
			}
			if (s != null) { 
				try { s.close(); } catch (Exception e) {System.out.println(e);}
			}
		}
	}//end  of  function
	
	//��Ӧע�����
	public void response_reg() {
		try {
			//bank ����仯
			BufferedReader br = new BufferedReader(new InputStreamReader(skt.getInputStream()));
			String ne_name=br.readLine();
			String ne_pwd=br.readLine();
			String  info=result.getText();
			info=info+"\nREG:"+ne_name+"����Ϊ:"+ne_pwd;
			result.setText(info);
			//�½��˻���Ϣ
			Account new_ac=new Account(ne_name,ne_pwd,0);
			bank.put(ne_name, new_ac);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			if (skt != null) { 
				try { skt.close(); } catch (Exception e) {System.out.println(e);}
			}
			if (s != null) { 
				try { s.close(); } catch (Exception e) {System.out.println(e);}
			}
		}
	}//end  of  function
	
	//��Ӧ�˳�����
	public void response_logout() {
		String logout_info;
		try {
			//�ı䵱ǰbank�����ֵ
			BufferedReader br = new BufferedReader(new InputStreamReader(skt.getInputStream()));
			String logout_name = br.readLine();
			Long money=(long)br.read();
			logout_info="\nLOGOUT:  "+logout_name +"���"+money;
			String info=result.getText();
			info=info+("\n"+logout_info);
			result.setText(info);
			
			//������Ҳ�˳�
			end_bank();
			System.exit(0);
			} catch (FileNotFoundException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}//end  of  function
	
	//��Ӧ��Ǯ����
	public void response_deposit() {
		try {
			//bank����仯
			BufferedReader br = new BufferedReader(new InputStreamReader(skt.getInputStream()));
			String name = br.readLine();
			Long op_money=Long.parseLong(br.readLine());
			Long money = Long.parseLong(br.readLine());
			String info=result.getText();
			info=info+"\nDEPOSIT:"+name+":���룺"+op_money+"���Ϊ:"+money;
			result.setText(info);
			refresh(name,money);
			//�ı�bank���˻���ֵ
			String pwd=bank.get(name).get_pwd();
			Account ne_ac=new Account(name,pwd,money);
			bank.put(name, ne_ac);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			if (skt != null) { 
				try { skt.close(); } catch (Exception e) {System.out.println(e);}
			}
			if (s != null) { 
				try { s.close(); } catch (Exception e) {System.out.println(e);}
			}
		}
	}
	
	//��ӦȡǮ����
	public void response_withdraw() {
		try {
			BufferedReader br = new BufferedReader(new InputStreamReader(skt.getInputStream()));
			String name=br.readLine();
			long op_money=Long.parseLong(br.readLine());
			long money=Long.parseLong(br.readLine());
			String info=result.getText();
			info=info+"\n WITHDRAW:"+name+"ȡ�"+op_money+"��"+money;
			result.setText(info);
			refresh(name,money);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			if (skt != null) { 
				try { skt.close(); } catch (Exception e) {System.out.println(e);}
			}
			if (s != null) { 
				try { s.close(); } catch (Exception e) {System.out.println(e);}
			}
		}

	}
	
	//��Ӧ��ѯ����
	public void response_check() {
		BufferedReader br;
		try {
			br = new BufferedReader(new InputStreamReader(skt.getInputStream()));
			String name = br.readLine();
			String info=result.getText();
			info=info+"\n INQUIRY:"+name;
			result.setText(info);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			if (skt != null) { 
				try { skt.close(); } catch (Exception e) {System.out.println(e);}
			}
			if (s != null) { 
				try { s.close(); } catch (Exception e) {System.out.println(e);}
			}
		}

	}//end  of  function

	public static void main(String args[]) {
		Bank b=new Bank();
		b.start_bank();
	}
}//end  of  bank  class
