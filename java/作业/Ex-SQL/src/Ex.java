import java.beans.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Ex {
	public static void create() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			/*String dbURL="jdbc:mysql://127.0.01:3306"+"javacourse ?user=root&password=the more complicated the better"
			 * +用来设置编码格式
			 *  password越复杂越好
			 *  */
			String dbURL="jdbc://mysql://localhost:3306"+
			"MyDB?user=your_username&DriverManager.getConnection(dbURL)";
			Connection connection=null;
			try {
				connection = DriverManager.getConnection(dbURL);
				String insert="INSERT INTO account (username, Money, interest) VALUES(王有才,1000000,100)";
				Statement stmt= (Statement) connection.createStatement();
				stmt=(Statement) connection.createStatement();
				((java.sql.Statement) stmt).executeUpdate(insert);
			}catch(SQLException e) {
				System.out.println(e);
			}			
				//使用preparedStatement方法
				String query="INSERT INTO account(username,Money,interest) VALUES(?,?,?)";
				PreparedStatement pst;
				try {
					pst = connection.prepareStatement(query);
					pst.setString(1, "李小财");
					pst.setString(2, "10000");
					pst.setString(3, "10");
					pst.addBatch();
					pst.clearParameters();
					pst.setString(1, "甄无财");
					pst.setString(2, "100");
					pst.setString(3, "1");
					pst.addBatch();
					pst.clearParameters();
					pst.executeBatch();
					pst.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
	} 
		//显示
		try {
			Class.forName("com.mysql.jdbc.Driver");
			String dbURL="jdbc://mysql://localhost:3306"+"MyDB?user=your_username&DriverManager.getConnection(dbURL)";
			Connection conn=null;
			try {
				conn=DriverManager.getConnection(dbURL);
				String search="SELECT *From account";
				Statement s=(Statement) conn.createStatement();
				ResultSet rs=((java.sql.Statement) s).executeQuery(search);
				while(rs.next()) {
					System.out.println(rs.getString("username"));
					System.out.println(rs.getString("Money"));
					System.out.println(rs.getString("interest"));
				}
				
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
  }//函数结束

	public static void main(String []args) {
		create();
	}
	
	
	
	
}