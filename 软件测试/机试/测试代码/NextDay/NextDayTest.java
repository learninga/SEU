/**
 * 
 */
package net.mooctest;

import static org.junit.Assert.*;

import org.junit.Test;

public class NextdayTest {
   
   //测试最正常情况
    @Test
    public void test1(){
        Nextday n = new Nextday();
        Date d1 = new Date(2,5,2019);
        Date result = new Date(2,6,2019);
        assertTrue(result.equals(n.nextDay(d1)));
    
    }
    //测试每年的最后一天
	@Test
	public void test2() {
		Nextday n = new Nextday();
        Date d1 = new Date(12,31,2019);
        Date test = n.nextDay(d1);
        Date result = new Date(1,1,2020);
        assertTrue(result.equals(test));
	}
    
    //测试每月的最后一天
    @Test
    public void test3(){
        Nextday n = new Nextday();
        Date d2 = new Date(1,31,2019);
        Date result = new Date(2,1,2019);
        assertTrue(result.equals(n.nextDay(d2)));
    }
    
    //测试闰年的其他情况
    //闰年正常
    @Test
    public void test4(){
        Nextday n = new Nextday();
        Date d2 = new Date(5,31,2008);
        Date result = new Date(6,1,2008);
        assertTrue(result.equals(n.nextDay(d2)));
    }
    
    
    //闰年最后一天
    @Test
    public void test5(){
        Nextday n = new Nextday();
        Date d2 = new Date(12,31,2008);
        Date result = new Date(1,1,2009);
        assertTrue(result.equals(n.nextDay(d2)));
    }    
    
    //闰年非特殊月
    @Test
    public void test6(){
        Nextday n = new Nextday();
        Date d2 = new Date(2,2,2008);
        Date result = new Date(2,3,2008);
        assertTrue(result.equals(n.nextDay(d2)));
    }
    
    @Test
    public void test7(){
        Nextday n = new Nextday();
        Date d2 = new Date(1,31,-1);
        Date result = new Date(2,1,-1);
        assertTrue(result.equals(n.nextDay(d2)));
    }
    
    @Test
    public void test8(){
        Nextday n = new Nextday();
        Date d2 = new Date(2,2,-1);
        Date result = new Date(2,3,-1);
        assertTrue(result.equals(n.nextDay(d2)));
    }
    
    @Test
    public void testa8(){
        Nextday n = new Nextday();
        Date d2 = new Date(2,2,-5);
        Date result = new Date(2,3,-5);
        assertTrue(result.equals(n.nextDay(d2)));
    }
    
    @Test
    public void testb8(){
        Nextday n = new Nextday();
        Date d2 = new Date(2,2,-401);
        Date result = new Date(2,3,-401);
        assertTrue(result.equals(n.nextDay(d2)));
    }
    
    @Test 
    public void test9(){
        Nextday n = new Nextday();
        Date d2 = new Date(12,31,-1);
        Date result = new Date(1,1,1);
        assertTrue(result.equals(n.nextDay(d2)));
    }
    
    //测试equals函数不等于的情况
    @Test
    public void test10(){
        Nextday n = new Nextday();
        Date d2 = new Date(1,31,2019);
        Date result = new Date(2,2,2019);
        assertFalse(result.equals(n.nextDay(d2)));
    
    }
    
    
    @Test
    public void test11(){
        Date d1 = new Date(1,21,2019);
        assertFalse(d1.equals(1));
    }
    
    @Test
    public void test12(){
        Date d2 = new Date(1,1,2019);
        Date d = new Date(2,1,2019);
        assertFalse(d2.equals(d));
    }
    
    @Test
    public void test13(){
        Date d2 = new Date(1,1,2019);
        Date d = new Date(1,1,2055);
        assertFalse(d2.equals(d));
    }
   
    //测试year异常
    @Test(expected = IllegalArgumentException.class)
    public void test14(){    
        Date d = new Date(1,1,0);
        assertTrue(d.equals(1));
    }
    
    
    //测试month异常
    @Test(expected = IllegalArgumentException.class)
    public void test15(){    
        Date d = new Date(15,1,2019);
        assertTrue(d.equals(1));
    }
    
    
    //测试day异常
    @Test(expected = IllegalArgumentException.class)
    public void test16(){
        Date d = new Date(2,29,2011);
        assertTrue(d.equals(1));
    }
    
    //测试day异常
    @Test(expected = IllegalArgumentException.class)
    public void test17(){
        Date d = new Date(2,32,2000);
        assertTrue(d.equals(1));
    }
    
    //单独测试month类
    @Test
    public void test18(){
        Year y = new Year(2532);
        Month m = new Month(1,y);
        assertFalse(m.equals(1));
    }
    
    //单独测试day类
    @Test
    public void test19(){
        Year y = new Year(2532);
        Month m = new Month(12,y);
        Day d = new Day(5,m);
        assertFalse(d.equals(1));
    }
    
    //单独测试year类
    @Test
    public void test20(){
        Year y = new Year(40);
        assertFalse(y.equals(55));
    }
    
    @Test
    public void test21(){
        Year y = new Year(40);
        Year y2 = new Year(45);
        Month m = new Month(1,y);
        Month mo = new Month(1,y2);
        assertFalse(m.equals(mo));
    }
    
   @Test(expected = IllegalArgumentException.class)
    public void test22(){
        Date d = new Date(0,32,2000);
        assertTrue(d.equals(1));
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void test23(){
        Date d = new Date(2,-8,2000);
        assertTrue(d.equals(1));
    }
    
    @Test
    public void test24(){
        Year y = new Year(9);
        Month m  = new Month(1,y);
        Month m1 = new Month(2,y);
        Day d = new Day(1,m);
        Day d1 = new Day(1,m1);
        assertFalse(d.equals(d1));
    }
    
    
    
    
}
