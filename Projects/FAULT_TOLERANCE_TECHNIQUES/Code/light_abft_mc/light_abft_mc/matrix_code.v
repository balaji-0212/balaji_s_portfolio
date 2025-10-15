module matrix_code(p11,p12,p13,p14,p21,p22,p23,p24,p31,p32,p33,p34,p41,p42,p43,p44,
                   q11,q12,q13,q14,q21,q22,q23,q24,q31,q32,q33,q34,q41,q42,q43,q44);
  
input [7:0] p11,p12,p13,p14,p21,p22,p23,p24,p31,p32,p33,p34,p41,p42,p43,p44;
output [7:0] q11,q12,q13,q14,q21,q22,q23,q24,q31,q32,q33,q34,q41,q42,q43,q44;


wire [7:0]pa1,pa2,pa3,pa4,pf1,pf2,pf3,pf4;
wire p1,p2,p3,p4;
wire [7:0]p22_f;
wire [7:0]z11,z12,z13;
wire [7:0]z21,z22,z23;
wire [7:0]z31,z32,z33;
wire [7:0]z41,z42,z43;

assign p11=150;assign p12=200;assign p13=250;assign p14=180;
assign p21=60;assign p22=80;assign p23=100;assign p24=72;assign p22_f=70;
assign p31=120;assign p32=160;assign p33=200;assign p34=144;
assign p41=90;assign p42=120;assign p43=150;assign p44=108;

assign pa1=p11 ^ p21 ^ p31 ^ p41;
assign pa2=p12 ^ p22 ^ p32 ^ p42;
assign pa3=p13 ^ p23 ^ p33 ^ p43;
assign pa4=p14 ^ p24 ^ p34 ^ p44;

assign pf1=p11 ^ p21 ^ p31 ^ p41;
assign pf2=p12 ^ p22_f ^ p32 ^ p42;
assign pf3=p13 ^ p23 ^ p33 ^ p43;
assign pf4=p14 ^ p24 ^ p34 ^ p44;

assign p1=|(pa1^pf1); 
assign p2=|(pa2^pf2); 
assign p3=|(pa3^pf3); 
assign p4=|(pa4^pf4); 

assign z11 = p11 ^ p12 ^ p13;
assign z12 = p11 ^ p12 ^ p14;
assign z13 = p11 ^ p13 ^ p14;
assign z21 = p21 ^ p22 ^ p23;
assign z22 = p21 ^ p22 ^ p24;
assign z23 = p21 ^ p23 ^ p24;
assign z31 = p31 ^ p32 ^ p33;
assign z32 = p31 ^ p32 ^ p34;
assign z33 = p31 ^ p33 ^ p34;
assign z41 = p41 ^ p42 ^ p43;
assign z42 = p41 ^ p42 ^ p44;
assign z43 = p41 ^ p43 ^ p44;

matrix_code_row u0(p11,p12,p13,p14,z11,z12,z13,q11,q12,q13,q14);
matrix_code_row u1(p21,p22_f,p23,p24,z21,z22,z23,q21,q22,q23,q24);
matrix_code_row u2(p31,p32,p33,p34,z31,z32,z33,q31,q32,q33,q34);
matrix_code_row u3(p41,p42,p43,p44,z41,z42,z43,q41,q42,q43,q44);


endmodule


