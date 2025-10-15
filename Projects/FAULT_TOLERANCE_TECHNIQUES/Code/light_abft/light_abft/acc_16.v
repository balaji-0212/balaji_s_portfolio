module acc_16(clk,rst,ip,op);
input clk,rst;
input [15:0]ip;
output [15:0]op;

reg [15:0]acc;


always@(posedge clk)
begin

if(rst)

  acc=16'b0;
  
else    
    
  acc=acc+ip;
      
end

assign op=acc;
  
endmodule


