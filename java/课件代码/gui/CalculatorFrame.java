package experiment.gui;

import javax.swing.JFrame;


public class CalculatorFrame extends JFrame {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    public CalculatorFrame() {
        setTitle("计算器");
        //setResizable(false);
        AdvancedCalPanel panel = new AdvancedCalPanel();
       // CalculatorPanel panel = new CalculatorPanel();
        add(panel);
        pack();
    }

    public static void main(String[] args) {
        CalculatorFrame frame = new CalculatorFrame();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}