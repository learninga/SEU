package experiment.gui;

import java.awt.BorderLayout;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JPanel;

public class AdvancedCalPanel extends JPanel {

    private static final long serialVersionUID = 1L;
    private JButton display;
    private JPanel panel;
    private double result;
    private String lastCommand;
    private boolean start;
    private boolean minusFlag = false;

    public AdvancedCalPanel() {
        setLayout(new BorderLayout());
        result = 0;
        lastCommand = "=";
        start = true;

        display = new JButton("0");
        display.setEnabled(false);
        display.setFont(new Font("SimHei", Font.BOLD, 80));
        add(display, BorderLayout.NORTH);

        ActionListener insert = null;
        ActionListener command = null;

        panel = new JPanel();
        panel.setLayout(new BorderLayout());

        JPanel panelLeft = new JPanel();
        panelLeft.setLayout(new BorderLayout());

        JPanel panelleftup = new JPanel();
        panelleftup.setLayout(new GridLayout(4, 3, 5, 5));
        addButton("C", command, panelleftup);
        addButton("±", command, panelleftup);
        addButton("÷", command, panelleftup);

        addButton("7", insert, panelleftup);
        addButton("8", insert, panelleftup);
        addButton("9", insert, panelleftup);

        addButton("4", insert, panelleftup);
        addButton("5", insert, panelleftup);
        addButton("6", insert, panelleftup);

        addButton("1", insert, panelleftup);
        addButton("2", insert, panelleftup);
        addButton("3", insert, panelleftup);

        JPanel panelleftdown = new JPanel();
        panelleftdown.setLayout(new BorderLayout());

        JPanel panelldl = new JPanel();
        panelldl.setLayout(new GridLayout(1, 1, 5, 5));
        addButton("0", insert, panelldl);

        JPanel panelldr = new JPanel();
        panelldr.setLayout(new GridLayout(1, 1, 5, 5));
        addButton(".", insert, panelldr);
        
//        JButton test1 = new JButton("0");
//        test1.setFont(new Font("Seravek-Light", Font.BOLD, 80));
//        JButton test2 = new JButton(".");
//        test2.setFont(new Font("Seravek-Light", Font.BOLD, 80));
//        panelleftdown.add(test1, BorderLayout.CENTER);
//        panelleftdown.add(test2, BorderLayout.EAST);

        panelleftdown.add(panelldl, BorderLayout.CENTER);
        panelleftdown.add(panelldr, BorderLayout.EAST);

        JPanel panelRight = new JPanel();
        panelRight.setLayout(new BorderLayout());

        JPanel panelRightUp = new JPanel();
        panelRightUp.setLayout(new GridLayout(3, 1, 5, 5));

        addButton("x", command, panelRightUp);
        addButton("-", command, panelRightUp);
        addButton("+", command, panelRightUp);

        JPanel panelRightDown = new JPanel();
        panelRightDown.setLayout(new GridLayout(1, 1, 5, 5));
        addButton("=", command, panelRightDown);
        panelRight.add(panelRightUp, BorderLayout.NORTH);
        panelRight.add(panelRightDown, BorderLayout.CENTER);

        panelLeft.add(panelleftup, BorderLayout.CENTER);
        panelLeft.add(panelleftdown, BorderLayout.SOUTH);

        panel.add(panelLeft, BorderLayout.CENTER);
        panel.add(panelRight, BorderLayout.EAST);

        add(panel, BorderLayout.CENTER);
    }

    /**
     *
     *
     * @param label
     * @param listener
     *
     */
    private void addButton(String label, ActionListener listener, JPanel p) {
        JButton button = new JButton(label);
        button.setFont(new Font("Seravek-Light", Font.BOLD, 80));
        button.addActionListener(listener);
        p.add(button);
    }

}

