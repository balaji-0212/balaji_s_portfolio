module mux_41_16(a,b,c,d,s,q);
input  [15:0] a,b,c,d;
input  [1:0] s;
output reg [15:0] q;



always@(a,b,c,d,s)
begin
  
  case(s)
       2'b00:q=a;
       2'b01:q=b;
       2'b10:q=c;
       2'b11:q=d;
  endcase

end
    

endmodule
