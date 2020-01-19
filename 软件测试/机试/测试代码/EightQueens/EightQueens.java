package net.mooctest;

import static org.junit.Assert.*;

import org.junit.Test;
import java.util.ArrayList;
import java.util.List;

public class EightQueensTest {
    
    //测试Queen的canAttack函数
	@Test
	public void test1() {
		EightQueens board = new EightQueens();
		Queen[] startBoard = board.generateBoard();
        
        Queen q1 = new Queen(1,2);
        Queen q2 = new Queen(1,2);
        Queen qe = new Queen(2,2);
        Queen qe1 = new Queen(1,3);
        
        Queen q3 = new Queen(4,5);
        Queen q4 = new Queen(2,4);
        
        assertTrue(q1.canAttack(q2));
        assertTrue(q1.canAttack(qe));
        assertTrue(q1.canAttack(qe1));
        
        
        assertTrue(q1.canAttack(q3));
        assertFalse(q1.canAttack(q4));
	}
    
    //测试Queen的moveDown函数
    @Test
    public void test2(){
        Queen q1 = new Queen(1,2);
        q1.moveDown(9);
        q1.moveDown(13);
        q1.moveDown(5);
        q1.moveDown(6);
        
        q1.setRow(2);
        q1.setColumn(4);
        
        Queen q2 = new Queen(2,5);
        assertEquals(2,q2.getRow());
        assertEquals(5,q2.getColumn());
    }
    
    
    //测试HillClimbing
    @Test
    public void test3(){
        EightQueens board = new EightQueens();
	    Queen[] startBoard = board.generateBoard();
        
        HillClimbing h1 = new HillClimbing();
        HillClimbing h2 = new HillClimbing(startBoard);
        
        h1.startState();
        Node n = h1.hillClimbing();
        
    }
    
    //测试SimulatedAnnealing
    @Test
    public void test4(){
        EightQueens board = new EightQueens();
	    Queen[] startBoard = board.generateBoard();
        
        SimulatedAnnealing s = new SimulatedAnnealing(startBoard);
        s.startState();
        Node n = s.simulatedAnneal(-1.00,5);
        Node n1 = s.simulatedAnneal(5.00,2);
        Node n2 = s.simulatedAnneal(0,0);
        Node n3 = s.simulatedAnneal(9,0.00);
    }
    
    //RandomRestart测试
    @Test
    public void test5(){
        EightQueens board = new EightQueens();
	    Queen[] startBoard = board.generateBoard();
        
        RandomRestart r = new RandomRestart(startBoard);
        Node n = r.randomRestart();
        
    }
    
    //测试Node
    @Test
    public void test6(){
        EightQueens board = new EightQueens();
	    Queen[] startBoard = board.generateBoard();
        
        Node n = new Node();
        Node node = new Node();
        
        n.setState(startBoard);
        String s = n.toString();
        
        int b = n.compareTo(node);
        assertEquals(0,n.compareTo(n));
        
        
        
        Node na = n.getRandomNeighbour(n);
        ArrayList<Node> al = n.generateNeighbours(n);
        
       }
    
    
    
    
    
    
    
    
    
    
    
    
    
    

}
