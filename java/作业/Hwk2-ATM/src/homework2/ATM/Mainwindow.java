package homework2.ATM;
import java.util.Scanner;
public class Mainwindow {
	private static Account []account=new Account[7];
	@SuppressWarnings("resource")
	public static void main(String[] args) {
		account[0] = new GoldUser("Jack",35000);
		account[1] = new GoldUser("Rose",25000);
		account[2] = new SilverUser("Tom",15000);
		account[3] = new SilverUser("Lily",18000);
		account[4] = new BranzeUser("Alice",8000);
		account[5] = new BranzeUser("Bob",5000);
		// TODO Auto-generated method stub
		//��ʼ�����Գ�ʼ�������˵�
		String choose="C";
		//�����벻Ϊ#ʱ�˵�������
		while(!choose .equals("#") ) {
			System.out.println("��ѡ�����");
			System.out.println("C/�������˻���S/ѡ�������˻���#/�˳�ϵͳ");
			Scanner sc = new  Scanner(System.in);
			choose=sc.nextLine();
			//�����˻�
			if(choose.equals("C")) {
				System.out.println("Please input your account name");
				Scanner scname=new Scanner(System.in);
				String name=scname.nextLine();
				Scanner scmoney=new Scanner(System.in);
				double money=scmoney.nextDouble();
				create(name,money);
				System.out.println("��ѡ�����:2/�����˻���R/������һ��,#/�˳�ϵͳ");
				Scanner sc1 = new  Scanner(System.in);
				String newChoose = sc1.nextLine();
				while(newChoose.equals("2")) {
					select(name);
					System.out.println("��ѡ�����:2/�����˻���R/������һ��,#/�˳�ϵͳ");
					Scanner sc2 = new  Scanner(System.in);
					newChoose = sc2.nextLine();
					continue;
				}
				if(newChoose.equals("R"))
					continue;
				else 
					break;
				
			}
			//ѡ���˻�
			else if(choose.equals("S")){
				System.out.println("����������˻���");
				Scanner scaccount = new Scanner(System.in);
				//�õ�������˻������ƥ��
				String mname = scaccount.nextLine();
				select(mname);
				System.out.println("��ѡ�������1/����������2/������һ�㣬#/�˳�ϵͳ");
				Scanner sc2 = new  Scanner(System.in);
				String newChoose=sc2.nextLine();
				if(newChoose.equals("1")) {
					select(mname);
				}
				else if(newChoose.equals("2")) {
					continue;
				}
				else
					break;
			}
			else
				System.out.println("лл����ʹ�ã���ӭ�´μ���ʹ��");
				break;
		}
     }
	//�����˻��ĺ���
	public static void create(String aname, double mNum) {
		//������20000ʱΪ���˻�
		if(mNum>20000) {
			account[6]=new GoldUser(aname,mNum);
		}
		//������10000Ϊ���˻�
		else if(mNum>10000) {
			account[6]=new SilverUser(aname,mNum);
		}
		else
			account[6] = new BranzeUser(aname,mNum);
			
	}
      //ѡ���˻��ĺ���
	public static void select(String name) {
		int i=0;
		for(;i<7;i++) {
			if(name.equals(account[i].getName()))
				break;
		}
		//�����û�����
		System.out.println("��ѡ�������1/��2/ȡ�3/��ѯ");
		Scanner scdone=new Scanner(System.in);
		int done=scdone.nextInt();
		switch(done) {
		case 1:
			System.out.println("����������");
			Scanner sc_demoney=new Scanner(System.in);
			double demoney = sc_demoney.nextDouble();
			account[i].deposit(demoney);
			break;
		case 2:
			System.out.println("������ȡ����");
			Scanner sc_wimoney = new Scanner(System.in);
			double wimoney = sc_wimoney.nextDouble();
			account[i].withdraw(wimoney);
			break;
		case 3:
			System.out.print("��ǰ�˻��Ĵ��Ϊ:  ");
			System.out.println(account[i].inquiry());
			break;
			default:break;
		}
	}
}
