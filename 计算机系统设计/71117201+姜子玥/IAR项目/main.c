#include <msp430f249.h>
#define CPU_F ((double)1000000) 
#define delay_ms(x) __delay_cycles((long)(CPU_F*(double)x/1000.0)) 
int _flag;
int hour,minute,second,count,curLocation;

const char res_list[10] = {0x3f,0x06,0x5b,0x4f,0x66,0x6d,0x7d,0x07,0x7f,0x6f};
// 根据list显示数字
void Output(int x){
  char res;
  if (x>=0 && x<=9) res = res_list[x];
  else res = 0x00;
  P4OUT=~res;
}

//打印时间
void timePrint(){
  if(curLocation==0){
    for(int i = 0;i<6;++i){
      P5OUT = 1<<i;
      int res;
      switch(i){
        case 0:{res = hour/10%10;break;}
        case 1:{res = hour%10;break;}
        case 2:{res = minute/10%10;break;}
        case 3:{res = minute%10;break;}
        case 4:{res = second/10%10;break;}
        case 5:{res = second%10;break;}
        default: res = 0;
      }
      Output(res);
      delay_ms(0.1);
      Output(-1);
    }
    delay_ms(0.2);
  }
  else
  {
    int ret;
    if(_flag==1){
      switch(curLocation){
        case 1:{ret = hour/10%10;break;}
        case 2:{ret = hour%10;break;}
        case 3:{ret = minute/10%10;break;}
        case 4:{ret  = minute %10;break;}
        case 5:{ret = second/10%10;break;}
        case 6:{ret = second%10;}
      }
    }
    else ret = -1;
    P5OUT = 1<<(curLocation-1);
    Output(ret);
    delay_ms(1);
    Output(-1);
  }
}

void increaseSec(){
  second++;
  if(second==60){
      second = 0;
      minute++;
      if(minute==60){
        minute = 0;
        hour++;
        if(hour==24) hour = 0;
      }
  }
}

int main( void ){
  hour = 23;minute = 59;second = 55;count = 0;curLocation = 0;
  _flag = 1;
  P5OUT = P1DIR = P1IFG = 0x00;
  P4DIR = P5DIR = P1REN = P1OUT = P1IES = P1IE = 0xff;
  
  WDTCTL = WDTPW + WDTHOLD;             // 关闭看门狗，使用计数器
  TA0CCTL0 = CCIE;                      // CCR0中断使能
  TA0CCR0 = 10;
  TA0CTL = TASSEL_2 + MC_1;             // SMCLK, 增计数模式, 清除TAR计数器
  __bis_SR_register(LPM4_bits + GIE);  // 进入LPM4,使能中断
}

// TA0中断服务程序
#pragma vector=TIMER0_A0_VECTOR
__interrupt void TIMER0_A0_ISR(void)
{
  if(++count>=200){
    increaseSec();
    _flag ^= 1;
    count=0;
  }
  timePrint();
}

#pragma vector=PORT1_VECTOR
__interrupt void PORT1_KEYBOARD_DRIVER(void){//响应按键
  switch(P1IN){
    case 0xfe: //SET功能
      { 
        if(curLocation==0){curLocation = 1;}
        break;
      }
    case 0xfd: //RUN功能
      {
        if(curLocation!=0){curLocation = 0;}
        break;
      }
    case 0xfb: //LEFT功能
      {
        curLocation = ( curLocation - 1 + 6 ) % 6;
        if(!curLocation) curLocation = 6;
        break;
      }
    case 0xf7: //右移功能
      {
        curLocation = ( curLocation + 1 ) % 6;
        if(!curLocation) curLocation = 6;
        break;
      }
    case 0xef: //ADD功能
      {
        if(curLocation!=0){
          switch(curLocation){
            case 1:{hour=(hour+10)%24;break;}
            case 2:{hour=(hour+1)%24;break;}
            case 3:{minute=(minute+10)%60;break;}
            case 4:{minute=(minute+1)%60;break;}
            case 5:{second=(second+10)%60;break;}
            case 6:{second=(second+1)%60;break;}
          }
        }
        break;
      }
    case 0xdf: //MINUS功能
      {
        if(curLocation!=0){
          switch(curLocation)
          {
            case 1:{hour=(hour-10+24)%24;break;}
            case 2:{hour=(hour-1+24)%24;break;}
            case 3:{minute=(minute-10+60)%60;break;}
            case 4:{minute=(minute-1+60)%60;break;}
            case 5:{second=(second-10+60)%60;break;}
            case 6:{second=(second-1+60)%60;break;}
          }
        }
        break;
      }
   }
  P1IFG = 0x00;
}
