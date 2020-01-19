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
		//初始化可以初始进入主菜单
		String choose="C";
		//当输入不为#时菜单都运行
		while(!choose .equals("#") ) {
			System.out.println("请选择操作");
			System.out.println("C/创建新账户，S/选择现有账户，#/退出系统");
			Scanner sc = new  Scanner(System.in);
			choose=sc.nextLine();
			//创建账户
			if(choose.equals("C")) {
				System.out.println("Please input your account name");
				Scanner scname=new Scanner(System.in);
				String name=scname.nextLine();
				Scanner scmoney=new Scanner(System.in);
				double money=scmoney.nextDouble();
				create(name,money);
				System.out.println("请选择操作:2/进入账户，R/返回上一层,#/退出系统");
				Scanner sc1 = new  Scanner(System.in);
				String newChoose = sc1.nextLine();
				while(newChoose.equals("2")) {
					select(name);
					System.out.println("请选择操作:2/进入账户，R/返回上一层,#/退出系统");
					Scanner sc2 = new  Scanner(System.in);
					newChoose = sc2.nextLine();
					continue;
				}
				if(newChoose.equals("R"))
					continue;
				else 
					break;
				
			}
			//选择账户
			else if(choose.equals("S")){
				System.out.println("请输入你的账户名");
				Scanner scaccount = new Scanner(System.in);
				//得到输入的账户名完成匹配
				String mname = scaccount.nextLine();
				select(mname);
				System.out.println("请选择操作：1/继续操作，2/返回上一层，#/退出系统");
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
				System.out.println("谢谢您的使用，欢迎下次继续使用");
				break;
		}
     }
	//创建账户的函数
	public static void create(String aname, double mNum) {
		//存款大于20000时为金账户
		if(mNum>20000) {
			account[6]=new GoldUser(aname,mNum);
		}
		//存款大于10000为银账户
		else if(mNum>10000) {
			account[6]=new SilverUser(aname,mNum);
		}
		else
			account[6] = new BranzeUser(aname,mNum);
			
	}
      //选择账户的函数
	public static void select(String name) {
		int i=0;
		for(;i<7;i++) {
			if(name.equals(account[i].getName()))
				break;
		}
		//进行用户操作
		System.out.println("请选择操作：1/存款，2/取款，3/查询");
		Scanner scdone=new Scanner(System.in);
		int done=scdone.nextInt();
		switch(done) {
		case 1:
			System.out.println("请输入存款金额");
			Scanner sc_demoney=new Scanner(System.in);
			double demoney = sc_demoney.nextDouble();
			account[i].deposit(demoney);
			break;
		case 2:
			System.out.println("请输入取款金额");
			Scanner sc_wimoney = new Scanner(System.in);
			double wimoney = sc_wimoney.nextDouble();
			account[i].withdraw(wimoney);
			break;
		case 3:
			System.out.print("当前账户的存款为:  ");
			System.out.println(account[i].inquiry());
			break;
			default:break;
		}
	}
}
