module light_abft(clk,rst,rst1,s1,s2,s3,c1,c2,c3,c4,r1,r2,r3,r4,p1,p2,p3,p4,error,
q11,q12,q13,q14,q21,q22,q23,q24,q31,q32,q33,q34,q41,q42,q43,q44);
input  clk,rst,rst1;
input  [1:0]  s1,s2,s3;
input  [7:0]  c1,c2,c3,c4,r1,r2,r3,r4;
input  [15:0] p1,p2,p3,p4;
output reg error;
output [7:0] q11,q12,q13,q14,q21,q22,q23,q24,q31,q32,q33,q34,q41,q42,q43,q44;

wire [7:0]  a1,a2,a3,a4,b1,b2,b3,b4,m1,m2;
wire [15:0] q1,q2,q3,q4,m3;
wire [15:0] mac_op,acc_op;
//wire [15:0] acc_op_f;
wire [7:0] p11,p12,p13,p14,p21,p22,p22_f,p23,p24,p31,p32,p33,p34,p41,p42,p43,p44;

assign p11=110;assign p12=150;assign p13=190;assign p14=230;
assign p21=60;assign p22=80;assign p23=100;assign p24=120;assign p22_f=70;
assign p31=120;assign p32=160;assign p33=200;assign p34=240;
assign p41=90;assign p42=120;assign p43=150;assign p44=180;

acc_8 u0(clk,rst,c1,a1);
acc_8 u1(clk,rst,c2,a2);
acc_8 u2(clk,rst,c3,a3);
acc_8 u3(clk,rst,c4,a4);
mux_41_8 u4(a1,a2,a3,a4,s1,m1);


acc_8 u5(clk,rst,r1,b1);
acc_8 u6(clk,rst,r2,b2);
acc_8 u7(clk,rst,r3,b3);
acc_8 u8(clk,rst,r4,b4);
mux_41_8 u9(b1,b2,b3,b4,s2,m2);

mac_8 u10(clk,rst1,m1,m2,mac_op);


acc_16 u11(clk,rst,p1,q1);
acc_16 u12(clk,rst,p2,q2);
acc_16 u13(clk,rst,p3,q3);
acc_16 u14(clk,rst,p4,q4);
mux_41_16 u15(q1,q2,q3,q4,s3,m3);

acc_16 u16(clk,rst1,m3,acc_op);
//assign acc_op_f={acc_op[15:1],~acc_op[0]};


matrix_code u17(error,p11,p12,p13,p14,p21,p22,p22_f,p23,p24,p31,p32,p33,p34,p41,p42,p43,p44,
                   q11,q12,q13,q14,q21,q22,q23,q24,q31,q32,q33,q34,q41,q42,q43,q44);
                   
                   
always@(posedge clk)
begin
   
   if(rst==1'b1 && rst1==1'b1 && mac_op!=acc_op) 
     error=1'b1;
   else 
     error=1'b0;
    
end
    
endmodule