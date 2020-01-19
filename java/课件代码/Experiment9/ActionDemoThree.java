/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ch8;


import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
/**
 *
 * @author wyang
 */
public class ActionDemoThree {

    private JTextField textField;
    private JButton btn1;
    private JButton btn2;

    private class ButtonListener implements ActionListener {
        /*	public void actionPerformed(ActionEvent e){
         textField.setText("Button clicked");			
         }
         */

        public void actionPerformed(ActionEvent e) {
            if (e.getSource() == btn1) {
                textField.setText("Button 1 clicked");
            } else {
                textField.setText("Button 2 clicked");
            }
        }
    }

    private class ButtonListenSimple implements ActionListener {

        public void actionPerformed(ActionEvent e) {
            //textField.setText(e.getActionCommand() + " Clicked");
            textField.setText(textField.getText() + " " + e.getActionCommand() + " Clicked");
        }
    }

    private class ButtonListener1 implements ActionListener {

        public void actionPerformed(ActionEvent e) {
            System.out.println(e.getActionCommand());
            textField.setText("Button 1 clicked");			
            
        }
    }

    private class ButtonListener2 implements ActionListener {

        public void actionPerformed(ActionEvent e) {
            textField.setText("Button 2 clicked");
        }
    }

    public ActionDemoThree() {
        JFrame frame = new JFrame("Event example");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.getContentPane().setLayout(new FlowLayout());
        textField = new JTextField();
        textField.setFont(new Font("SansSerif", Font.BOLD, 40));
        textField.setColumns(18);
        frame.add(textField);
        
        btn1 = new JButton("Button 1");
        btn1.setFont(new Font("SansSerif", Font.BOLD, 50));
        frame.add(btn1);
        btn1.addActionListener(new ButtonListenSimple());
        
        btn2 = new JButton("Button 2");
        btn2.setFont(new Font("SansSerif", Font.BOLD, 50));
        frame.add(btn2);
        btn2.addActionListener(new ButtonListenSimple());
        
        frame.setSize(700, 400);
        frame.setVisible(true);
    }

    public static void main(String[] args) {
        ActionDemoThree demo = new ActionDemoThree();
    }
}
