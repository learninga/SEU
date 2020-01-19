package net.mooctest;

import static org.junit.Assert.*;

import org.junit.Test;

public class SudokuPuzzleTest {
    //测试numInCol
    @Test
    public void test1(){
        SudokuGenerator sudokuGenerator0 = new SudokuGenerator();
        SudokuPuzzle pz = sudokuGenerator0.generateRandomSudoku(SudokuPuzzleType.SIXBYSIX);
        //超出范围false情况
        assertEquals(false,pz.numInCol(7,"1"));
        assertFalse(pz.numInCol(1,"888"));
        
        //测试该列没有任何数false的情况
        for(int r=0;r<6;r++){
            pz.makeSlotEmpty(r,0);
        }
        assertFalse(pz.numInCol(0,"444"));
        assertTrue(pz.numInCol(0,""));
       
    }
    
    //测试numInRow
    @Test
    public void test2(){
        SudokuGenerator sudokuGenerator0 = new SudokuGenerator();
        SudokuPuzzle pz = sudokuGenerator0.generateRandomSudoku(SudokuPuzzleType.NINEBYNINE);
        //超出范围false情况
        assertFalse(pz.numInRow(15,"5"));
       
    }
    
    //测试numInBox
    @Test
    public void test3(){
        SudokuGenerator sudokuGenerator0 = new SudokuGenerator();
        SudokuPuzzle pz = sudokuGenerator0.generateRandomSudoku(SudokuPuzzleType.NINEBYNINE);
        
        assertFalse(pz.numInBox(30,30,"A"));
    }

    //测试isValidMove
	@Test
	public void test4() {
		SudokuGenerator sudokuGenerator0 = new SudokuGenerator();
        SudokuPuzzle pz = sudokuGenerator0.generateRandomSudoku(SudokuPuzzleType.SIXBYSIX);
        
        assertEquals(false,pz.isValidMove(7,7,"1"));
        //assertTrue(pz.isValidMove(2,2,"1"));
        
	}
	
    //测试getValue
    @Test
    public void test5(){
        SudokuGenerator sudokuGenerator0 = new SudokuGenerator();
        SudokuPuzzle pz = sudokuGenerator0.generateRandomSudoku(SudokuPuzzleType.SIXBYSIX);
        
        assertEquals("",pz.getValue(8,8));
        assertEquals(pz.getValue(2,2),pz.getValue(2,2));
    }
    
    //测试boardFull
    @Test
    public void test6(){
        SudokuGenerator sudokuGenerator0 = new SudokuGenerator();
        SudokuPuzzle pz = sudokuGenerator0.generateRandomSudoku(SudokuPuzzleType.SIXBYSIX);
        
        pz.toString();
        assertFalse(pz.boardFull());
    }
    
    //测试makeMove函数不满足if条件的情况
    @Test
    public void test7(){
        SudokuGenerator sudokuGenerator0 = new SudokuGenerator();
        SudokuPuzzle pz = sudokuGenerator0.generateRandomSudoku(SudokuPuzzleType.SIXBYSIX);
        
        pz.makeMove(7,7,"t",true);
    }
    
    
    
    
    @Test
    public void test8(){
         SudokuPuzzle pz = new SudokuPuzzle(6,6,3,2,new String[] {"1","2","3","4","5","6"});
         
         assertFalse(pz.isSlotAvailable(7,8));
         //assertFalse(pz.isSlotAvailable(1,1));
         
    }
    
   
    
    
    
    
    
    
    
    
    
}
