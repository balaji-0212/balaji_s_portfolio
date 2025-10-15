module acc_8(clk,rst,ip,op);
input clk,rst;
input [7:0]ip;
output [7:0]op;

reg [7:0]acc;


always@(posedge clk)
begin

if(rst)

  acc=8'b0;
  
else    
    
  acc=acc+ip;
      
end

assign op=acc;
  
endmodule

