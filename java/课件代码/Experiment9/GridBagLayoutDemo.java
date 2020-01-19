/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ch8;

import java.awt.Button;
import java.awt.Font;
import java.awt.Frame;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import javax.swing.JFrame;
import javax.swing.JPanel;

/**
 *
 * @author wyang
 */
public class GridBagLayoutDemo extends JPanel{
    protected void makebutton(String name,
                               GridBagLayout gridbag,
                               GridBagConstraints c) {
         Button button = new Button(name);
         gridbag.setConstraints(button, c);
         add(button);
     }

     public void init() {
         GridBagLayout gridbag = new GridBagLayout();
         GridBagConstraints c = new GridBagConstraints();

         setFont(new Font("SansSerif", Font.PLAIN, 30));
         setLayout(gridbag);

         c.fill = GridBagConstraints.BOTH;
         
         //gridx, gridy define the position of the component
         //width, height define the size of the component
         c.gridx = 0;
         c.gridy = 0;
         c.gridwidth = 4;
         //c.gridwidth = GridBagConstraints.REMAINDER; //end row
         makebutton("0", gridbag, c);
         
         c.gridx = 0;
         c.gridy = 1;
         c.gridwidth = 1;
         makebutton("C", gridbag, c);
         c.gridx = 1;
         makebutton("±", gridbag, c);  
         c.gridx = 2;
         makebutton("÷", gridbag, c); 
         c.gridx = 3;
         //c.gridwidth = GridBagConstraints.REMAINDER; //end row
         makebutton("x", gridbag, c); 
         
         c.gridx = 0;
         c.gridy = 2;
         c.gridwidth = 1;
         makebutton("7", gridbag, c);
         c.gridx = 1;
         makebutton("8", gridbag, c);  
         c.gridx = 2;
         makebutton("9", gridbag, c); 
         c.gridx = 3;
         //c.gridwidth = GridBagConstraints.REMAINDER; //end row
         makebutton("-", gridbag, c); 
         
         c.gridx = 0;
         c.gridy = 3;
         c.gridwidth = 1;
         makebutton("4", gridbag, c);
         c.gridx = 1;
         makebutton("5", gridbag, c);  
         c.gridx = 2;
         makebutton("6", gridbag, c); 
         c.gridx = 3;
         //c.gridwidth = GridBagConstraints.REMAINDER; //end row
         makebutton("+", gridbag, c); 
         
         c.gridx = 0;
         c.gridy = 4;
         c.gridwidth = 1;
         makebutton("1", gridbag, c);
         c.gridx = 1;
         makebutton("2", gridbag, c);  
         c.gridx = 2;
         makebutton("3", gridbag, c); 
         c.gridx = 3;
         c.gridheight = 2;
         makebutton("=", gridbag, c); 
         
         c.gridx = 0;
         c.gridy = 5;
         c.gridwidth = 2;
         c.gridheight = 1;
         makebutton("0", gridbag, c);
         c.gridx = 2;
         c.gridwidth = 1;
         makebutton(".", gridbag, c); 
         
         
//       setSize(300, 100);
     }

     public static void main(String args[]) {
         JFrame f = new JFrame("GridBag Layout Example");
         GridBagLayoutDemo ex1 = new GridBagLayoutDemo();

         ex1.init();

         f.getContentPane().add(ex1);
         
         f.setSize(320,320);
         f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
         f.setVisible(true);
         
     }
}
