package homework;

public class Account {
private String name;
private String pwd;
private long money;
Account(String my_name,String mypwd,long my_money){
	name=my_name;
	pwd=mypwd;
	money=my_money;
}
public String get_pwd() {
	return pwd;
}
public long get_money() {
	return money;
}
public String get_name() {
	return name;
}
public void set_money(long ne_money) {
	money=ne_money;
}
public  synchronized void re_money() {
	money+=money*0.03;
}
}
