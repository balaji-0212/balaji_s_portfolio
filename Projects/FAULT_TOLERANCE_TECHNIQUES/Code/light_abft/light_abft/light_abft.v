module light_abft(clk,rst,rst1,s1,s2,s3,c1,c2,c3,c4,r1,r2,r3,r4,p1,p2,p3,p4,error);
input  clk,rst,rst1;
input  [1:0]  s1,s2,s3;
input  [7:0]  c1,c2,c3,c4,r1,r2,r3,r4;
input  [15:0] p1,p2,p3,p4;
output reg error;

wire [7:0]  a1,a2,a3,a4,b1,b2,b3,b4,m1,m2;
wire [15:0] q1,q2,q3,q4,m3;
wire [15:0] mac_op,acc_op;
wire [15:0] acc_op_f;

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
assign acc_op_f={acc_op[15:1],~acc_op[0]};

always@(posedge clk)
begin
   
   if(rst==1'b1 && rst1==1'b1 && mac_op!=acc_op_f) 
     error=1'b1;
   else 
     error=1'b0;
    
end
    
endmodule