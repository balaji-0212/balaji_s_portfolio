module matrix_4_4(x00,x01,x02,x03,x10,x11,x12,x13,x20,x21,x22,x23,x30,x31,x32,x33,
y00,y01,y02,y03,y10,y11,y12,y13,y20,y21,y22,y23,y30,y31,y32,y33,
z00,z01,z02,z03,z10,z11,z12,z13,z20,z21,z22,z23,z30,z31,z32,z33,fault);
input [7:0] x00,x01,x02,x03,x10,x11,x12,x13,x20,x21,x22,x23,x30,x31,x32,x33;
input [7:0] y00,y01,y02,y03,y10,y11,y12,y13,y20,y21,y22,y23,y30,y31,y32,y33;
output [15:0] z00,z01,z02,z03,z10,z11,z12,z13,z20,z21,z22,z23,z30,z31,z32,z33;
output reg fault;

wire [15:0]csx_c1,csx_c2,csx_c3,csx_c4;
wire [15:0]csy_r1,csy_r2,csy_r3,csy_r4;

wire [15:0]csz_c1,csz_c2,csz_c3,csz_c4;
wire [15:0]csz_r1,csz_r2,csz_r3,csz_r4;

wire [15:0]cs_ip,cs_opc,cs_opr;

assign x00=5;
assign x01=10;
assign x02=15;
assign x03=20;

assign x10=2;
assign x11=4;
assign x12=6;
assign x13=8;

assign x20=4;
assign x21=8;
assign x22=12;
assign x23=16;

assign x30=3;
assign x31=6;
assign x32=9;
assign x33=12;

assign y00=1;
assign y01=2;
assign y02=3;
assign y03=4;

assign y10=2;
assign y11=3;
assign y12=4;
assign y13=5;

assign y20=3;
assign y21=4;
assign y22=5;
assign y23=6;

assign y30=4;
assign y31=5;
assign y32=6;
assign y33=7;

matrix_row1_col4 u0(x00,x01,x02,x03,
y00,y01,y02,y03,y10,y11,y12,y13,y20,y21,y22,y23,y30,y31,y32,y33,
z00,z01,z02,z03);
matrix_row1_col4 u1(x10,x11,x12,x13,
y00,y01,y02,y03,y10,y11,y12,y13,y20,y21,y22,y23,y30,y31,y32,y33,
z10,z11,z12,z13);
matrix_row1_col4 u2(x20,x21,x22,x23,
y00,y01,y02,y03,y10,y11,y12,y13,y20,y21,y22,y23,y30,y31,y32,y33,
z20,z21,z22,z23);
matrix_row1_col4 u3(x30,x31,x32,x33,
y00,y01,y02,y03,y10,y11,y12,y13,y20,y21,y22,y23,y30,y31,y32,y33,
z30,z31,z32,z33);


assign csx_c1=x00+x10+x20+x30;
assign csx_c2=x01+x11+x21+x31;
assign csx_c3=x02+x12+x22+x32;
assign csx_c4=x03+x13+x23+x33;

assign csy_r1=y00+y01+y02+y03;
assign csy_r2=y10+y11+y12+y13;
assign csy_r3=y20+y21+y22+y23;
assign csy_r4=y30+y31+y32+y33;


assign csz_c1=z00+z10+z20+z30;
assign csz_c2=z01+z11+z21+z31;//z11-70 for fault
assign csz_c3=z02+z12+z22+z32;
assign csz_c4=z03+z13+z23+z33;

assign csz_r1=z00+z01+z02+z03;
assign csz_r2=z10+z11+z12+z13;//z11-70 for fault
assign csz_r3=z20+z21+z22+z23;
assign csz_r4=z30+z31+z32+z33;

assign cs_ip=(csx_c1*csy_r1)+(csx_c2*csy_r2)+(csx_c3*csy_r3)+(csx_c4*csy_r4);
assign cs_opc=csz_c1+csz_c2+csz_c3+csz_c4;
assign cs_opr=csz_r1+csz_r2+csz_r3+csz_r4;

always@(cs_ip,cs_opc,cs_opr)
begin
    
    if(cs_ip==cs_opc && cs_ip==cs_opr)
         fault=1'b0;
    else
         fault=1'b1;
         
    
end

endmodule

