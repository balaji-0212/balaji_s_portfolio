module matrix_row1_col4(x00,x01,x02,x03,
y00,y01,y02,y03,y10,y11,y12,y13,y20,y21,y22,y23,y30,y31,y32,y33,
z00,z01,z02,z03);
input [7:0] x00,x01,x02,x03;
input [7:0] y00,y01,y02,y03,y10,y11,y12,y13,y20,y21,y22,y23,y30,y31,y32,y33;
output [15:0] z00,z01,z02,z03;

wire [15:0]w1,w2,w3,w4,w6,w7,w8,w9,w11,w12,w13,w14,w16,w17,w18,w19;

mul u0(x00,y00,w1);
mul u1(x01,y10,w2);
mul u2(x02,y20,w3);
mul u3(x03,y30,w4);

assign z00=w1+w2+w3+w4;

mul u5(x00,y01,w6);
mul u6(x01,y11,w7);
mul u7(x02,y21,w8);
mul u8(x03,y31,w9);

assign z01=w6+w7+w8+w9;


mul u10(x00,y02,w11);
mul u11(x01,y12,w12);
mul u12(x02,y22,w13);
mul u13(x03,y32,w14);

assign z02=w11+w12+w13+w14;

mul u15(x00,y03,w16);
mul u16(x01,y13,w17);
mul u17(x02,y23,w18);
mul u18(x03,y33,w19);


assign z03=w16+w17+w18+w19;


endmodule