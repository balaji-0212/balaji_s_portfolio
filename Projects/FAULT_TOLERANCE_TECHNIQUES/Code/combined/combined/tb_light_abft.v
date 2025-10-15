module tb_light_abft();
reg  clk,rst,rst1;
reg  [1:0]  s1,s2,s3;
reg  [7:0]  c1,c2,c3,c4,r1,r2,r3,r4;
reg  [15:0] p1,p2,p3,p4;
wire  error;
wire [7:0]q11,q12,q13,q14,q21,q22,q23,q24,q31,q32,q33,q34,q41,q42,q43,q44;


initial
begin
  clk=1'b1;
  forever #50 clk=~clk;
end 

always
begin
#100    rst=1'b1;rst1=1'b1;s1=2'b00;s2=2'b00;s3=2'b00;c1=5;c2=10;c3=15;c4=10;r1=1;r2=2;r3=3;r4=4;p1=110;p2=150;p3=190;p4=230;
#100    rst=1'b0;
#100    c1=2;c2=4;c3=6;c4=8;r1=2;r2=3;r3=4;r4=5;p1=60;p2=70;p3=100;p4=120;//fault at p2 80-70
#100    c1=4;c2=8;c3=12;c4=16;r1=3;r2=4;r3=5;r4=6;p1=120;p2=160;p3=200;p4=240;
#100    c1=3;c2=6;c3=9;c4=12;r1=4;r2=5;r3=6;r4=7;p1=90;p2=120;p3=150;p4=180;
#100    s1=2'b01;s2=2'b01;s3=2'b01;c1=0;c2=0;c3=0;c4=0;r1=0;r2=0;r3=0;r4=0;p1=0;p2=0;p3=0;p4=0;rst1=1'b0;
#100    s1=2'b10;s2=2'b10;s3=2'b10;
#100    s1=2'b11;s2=2'b11;s3=2'b11;
#200    rst=1'b1;rst1=1'b1;

end

light_abft u0(clk,rst,rst1,s1,s2,s3,c1,c2,c3,c4,r1,r2,r3,r4,p1,p2,p3,p4,error,q11,q12,q13,q14,q21,q22,q23,q24,q31,q32,q33,q34,q41,q42,q43,q44);

endmodule