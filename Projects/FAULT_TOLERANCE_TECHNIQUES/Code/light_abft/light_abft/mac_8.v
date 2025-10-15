module mac_8(clk,rst,a,b,mac_op);
input clk,rst;
input [7:0]a,b;
output [15:0]mac_op;

wire [15:0]mul_op;
reg [15:0]acc;

assign mul_op=a*b;


always@(posedge clk)
begin

if(rst)

  acc=16'b0;
  
else    
    
  acc=acc+mul_op;
      
end

assign mac_op=acc;
  
endmodule

