package experiment.socket;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author wyang
 */
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;
import java.net.*;
import javax.net.*;
import java.io.*;

public class TalkFrame extends JFrame {

    ServerSocket server;
    Socket ss;
    int port = 9999;
    
    JTextArea t1;
    JTextField t2;

    public TalkFrame() {

    }

    public void init() {
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        //输入ID
        t1 = new JTextArea();
        t1.setFont(new Font("SanSerif", Font.BOLD, 20));

        t2 = new JTextField(15);
        t2.setFont(new Font("SanSerif", Font.BOLD, 20));

        JButton b1 = new JButton("发送");
        b1.setFont(new Font("SanSerif", Font.BOLD, 20));
        b1.addActionListener(new ButtonListener1());
        
        this.getContentPane().add(t1, BorderLayout.CENTER);
        JPanel p = new JPanel(new BorderLayout());
        this.getContentPane().add(p, BorderLayout.SOUTH);
        p.add(t2, BorderLayout.CENTER);
        p.add(b1, BorderLayout.EAST);
        this.setBounds(100, 100, 500, 500);
        this.setVisible(true);
    }

    public void initServerSocket() {
        try {
            server = new ServerSocket(port);

        } catch (IOException e) {
            System.out.println(e);
        }
    }

    public void WaitCalling() {

        try {
            while(true){
                ss = server.accept();
                TalkThread t = new TalkThread();
                t.start();
            }
            
            //PrintWriter out = new PrintWriter(
            //        new BufferedWriter(new OutputStreamWriter(ss.getOutputStream())), true);
            
        } catch (IOException e) {
            System.out.println(e);
        }

    }

    public static void main(String args[]) {
        TalkFrame f = new TalkFrame();
        f.initServerSocket();
        f.init();
        f.WaitCalling();

    }
    
    private class ButtonListener1 implements ActionListener {

        public void actionPerformed(ActionEvent e) {
            try{
                PrintWriter out = new PrintWriter(
                    new BufferedWriter(new OutputStreamWriter(ss.getOutputStream())), true);
                t1.setText((t1.getText()+"\r\n"+t2.getText()));
                System.out.println(t2.getText());
                out.println(t2.getText());
            } catch (IOException ioe){
                System.out.println(ioe);
            }			
            
        }
    }
    
    public class TalkThread extends Thread{
        
        
        public void run(){
            try{
                BufferedReader in = new BufferedReader(
                    new InputStreamReader(ss.getInputStream()));
                while (true) {
                    String str = in.readLine();
                    System.out.println(str);
                    if (str != null) {
                        t1.setText(t1.getText() + "\r\n" + str);
                        
                    } else{
                        break;
                    }
                }
                
            } catch (IOException e){
                System.out.println(e);
            }
        }
    }

}

