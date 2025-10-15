module matrix_code_row(p11,p12,p13,p14,z11,z12,z13,q11,q12,q13,q14);
  
input [7:0] p11,p12,p13,p14,z11,z12,z13;
output reg [7:0] q11,q12,q13,q14;




wire [7:0]c11,c12,c13;
wire [7:0]zz11,zz12,zz13;

assign c11 = p11 ^ p12 ^ p13;
assign c12 = p11 ^ p12 ^ p14;
assign c13 = p11 ^ p13 ^ p14;

assign zz11 = c11 ^ z11;
assign zz12 = c12 ^ z12;
assign zz13 = c13 ^ z13;

always@(p11,p12,p13,p14,zz11,zz12,zz13)
begin
  

if(zz11==8'b0 && zz12==8'b0 && zz13==8'b0)
begin

q11 <= p11;
q12 <= p12;
q13 <= p13;
q14 <= p14;

end

else if(zz11!=8'b0 && zz12!=8'b0 && zz13!=8'b0)
begin 

q11 <= z11 ^ p12 ^ p13;
q12 <= p12;
q13 <= p13;
q14 <= p14;



end


else if(zz11!=8'b0 && zz12!=8'b0 && zz13==8'b0)
begin 

q11 <= p11;
q12 <= z11 ^ p11 ^ p13;
q13 <= p13;
q14 <= p14;



end


else if(zz11!=8'b0 && zz12==8'b0 && zz13!=8'b0)
begin 

q11 <= p11;
q12 <= p12;
q13 <= z11 ^ p11 ^ p12;
q14 <= p14;



end


else if(zz11==8'b0 && zz12!=8'b0 && zz13!=8'b0)
begin 

q11 <= p11;
q12 <= p12;
q13 <= p13;
q14 <= z13 ^ p11 ^ p13;



end


end
 
endmodule







