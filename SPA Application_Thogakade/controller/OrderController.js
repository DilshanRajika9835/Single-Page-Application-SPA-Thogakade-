
function LoadAllCustomerID() {
    var selectElem = $("#ordCustID");
    $('#ordCustID').html(' <option selected  value="" disabled>Choose..</option>');
    for (let x in CustomerDB) {
        $("<option/>", { value: x, text: CustomerDB[x].getCustomerID()
        }).appendTo(selectElem);
    }

}
function LoadAllItemID() {
    let selectElem = $("#ordItemCode");
    $('#ordItemCode').html(' <option selected  value="" disabled>Choose..</option>');
    for (let x in ItemDB) {
        $("<option/>", { value: x, text: ItemDB[x].getItemCode()
        }).appendTo(selectElem);
    }

}
function printReport(){
   let cash= $('#ORDcash').val();
    let balance=$('#ORDbalance').val();
    if(cash.length>0&&balance.length>0) {
        PrintBill();
        placeOrder();
    }else {
        alert("please enter cash amount your order!")
    }
}
/*==========================place Order ========*/
function placeOrder() {
    let CustomerID= $('#ordCustID').text();
    let OrderID= $('#txtOrderID').val();
    let total=$('#ORDtotal').val();
    let subtotal=$('#ORDsubtotal').val();
    let cash=$('#ORDcash').val();
    let discount=$('#ORDdiscount').val();
    let balance=$('#ORDbalance').val();
    OrderDetailsDB.push(new OrderDetailsTM(CustomerID,OrderID,total,subtotal,cash,discount,balance));
    loadOrderDetailsTM();
    clearOrdText();
}/*=====================================================================*/
function loadOrderDetailsTM() {
    $('#OrderListTM').empty();
    let no=1;
    for (let i in OrderDetailsDB) {
        let itemcode=OrderDetailsDB[i].getTMOrderID();
        let customerID=OrderDetailsDB[i].getTMCustomerID();
        let total=OrderDetailsDB[i].getTMTotalAmount();
        let subtotal=OrderDetailsDB[i].getTMSubTotal();
        let cash=OrderDetailsDB[i].getTMCash();
        let discount=OrderDetailsDB[i].getTMDiscount();
        let balance=OrderDetailsDB[i].getTMBalance();

        let row=`<tr>
<td>${no++}</td>
<td>${itemcode}</td>
<td>${customerID}</td>
<td>${total+"00"}</td>
<td>${subtotal+".00"}</td>
<td>${cash+".00"}</td>
<td>${discount+"%"}</td>
<td>${balance+".00"}</td>
</tr>`;
        $('#OrderListTM').append(row);
    }

}
/*=====================================================================*/
let OrderID=new Array();
GenarateOrderId();
function GenarateOrderId(){
    if(OrderID.length<1){
        OrderID.push("ORD0001");
        $('#txtOrderID').val(OrderID[0]);
    }else if(OrderID.length<10){
        let lastid= OrderID.slice(-1).pop();
        let ORD =lastid.substr(6,1);
        let value=parseInt(ORD);
        $('#txtOrderID').val("ORD000"+(value+1));
        OrderID.push($('#txtOrderID').val())

    }else if(OrderID.length>=10){
        let lastid= OrderID.slice(-1).pop();
        let ORD =lastid.substr(5);
        let value=parseInt(ORD);
        $('#txtOrderID').val("ORD00"+(value+1));
        OrderID.push($('#txtOrderID').val())

    }
}
/*=====================================================================*/
var selectItemCode;
    $("#ordItemCode").change(function () {
        let x = document.getElementById("ordItemCode").selectedIndex;
        let y = document.getElementById("ordItemCode").options;
        if (y[x].text != null) {
            let item = searchItemID(y[x].text);
            selectItemCode=y[x].text;
            $('#ordItemName').val(item.getItemName());
            $('#ordDescription').val(item.getItemDescription());
            $('#ordPrice').val(item.getItemUnitPrice());
            $('#ordQtyOnHand').val(item.getItemQty());
        }
    });




/*=====================================================================*/
ORDTableList=new Array();
function SelectItem() {
   let Itemcode= selectItemCode;
   let Itemname= $('#ordItemName').val();
   let description= $('#ordDescription').val();
   let price= $('#ordPrice').val();
   let qtyonhand=$('#ordQtyOnHand').val();
   let qty=$('#orderQty').val();
   console.log(selectItemCode);
   console.log(qtyonhand);
   console.log(qty);
    let option = checkingStockQty();

    if(option){
        if(Itemcode != null && qtyonhand.length>0 && qty.length>0 ){
            let exists = ifExists(Itemcode);
            if(exists!=null){
                let qty1=parseInt(exists.getTMQty());
                let qty2=parseInt($('#orderQty').val());
                let price=parseInt(exists.getTMUnitPrice());
                let newqty=qty1+qty2;
                exists.setTMItemQty(newqty);
                exists.setTMItemTotal(newqty*price);
                UpdateStockQty(Itemcode,qty,qtyonhand);
                LoadAllItemID();
                loadORDListTable();

            }else {
                ORDTableList.push(new OrderTM(Itemcode, Itemname, description, price, qty, (qty * price)));
                UpdateStockQty(Itemcode,qty,qtyonhand);
                loadORDListTable();
            }
        }
    }else {
        alert("Stock Qty less than your qty please ReEnter less Qty..");
    }

    clearOrdText();
    checkOrderTable();
}
checkOrderTable();
/*============================================================*/
function   checkOrderTable() {
        if(ORDTableList.length>0){
            document.getElementById("btnPlaceOrder").disabled = false;
        }else {
            document.getElementById("btnPlaceOrder").disabled = true;
        }
}
/*============================================================*/
function checkingStockQty() {
    let QtyOnHand=parseInt($('#ordQtyOnHand').val());
    let qty=parseInt($('#orderQty').val());
    if(QtyOnHand >=qty){
      return true;
    }else {
            return false;
    }

}
/*============================================================*/
function UpdateStockQty(Icode,Oqty,Sqty) {
    let item = searchItemID(Icode);
    let newqty=Sqty-Oqty;
        if(item!=null){
            console.log(newqty);
           item.setItemQty(newqty);
            loadAllItem();
        }

}
/*======================Check if Exists=========================*/
function ifExists(itemcode) {
    for (let i in ORDTableList) {
        if(itemcode==ORDTableList[i].getTMItemCode()){
            return ORDTableList[i];
        }
        return null;
    }
}
/*===================Load Order List=========================*/

function loadORDListTable() {
    var lbltotal=0;
    $('#tblOrder_listbody').empty();
    let no=1;
    for (let i in ORDTableList) {
        let itemcode=ORDTableList[i].getTMItemCode();
        let itemname=ORDTableList[i].getTMItemName();
        let description=ORDTableList[i].getTMDescription();
        let price=ORDTableList[i].getTMUnitPrice();
        let qty=ORDTableList[i].getTMQty();
        let total=ORDTableList[i].getTMTotal();
         lbltotal += (parseInt(ORDTableList[i].getTMQty())*parseInt(ORDTableList[i].getTMUnitPrice()));
        let row=`<tr>
<td>${no++}</td>
<td>${itemcode}</td>
<td>${itemname}</td>
<td>${description}</td>
<td>${price}</td>
<td>${qty}</td>
<td>${total+".00"}</td>
</tr>`;
        $('#tblOrder_listbody').append(row);
    }
    LoadAllItemID();
    $('#ORDtotal').val(lbltotal+".00");
    $('#ORDsubtotal').val(lbltotal+".00");
    giveDiscount();
}
/*=================================================*/

giveDiscount();
function giveDiscount() {
    document.getElementById("ORDdiscount").disabled = $('#ORDtotal').val() < 5000;
}
let InputDiscount=/^[0-9]{0,3}$/;
$('#ORDdiscount').on('keyup',function (event) {
    let total=parseInt($('#ORDtotal').val());
    let discount=parseInt($('#ORDdiscount').val());
    let cash=parseInt($('#ORDcash').val());
    console.log("total"+total);
    console.log("discount"+discount);
    console.log("cash"+cash);
let ordDiscount=total*(discount/100);
console.log("ordtotal"+ordDiscount);
    $('#ORDsubtotal').val((total-ordDiscount)+".00");
   let subtotal2= $('#ORDsubtotal').val();
    $('#ORDbalance').val((cash-subtotal2)+".00");



});

/*=================================================*/
/*===================clear Text=========================*/
function clearOrdText() {
    $('#ordCustID').val("");
    $('#ordItemCode').val("");
    $('#ordItemName').val("");
     $('#ordDescription').val("");
   $('#ordPrice').val("");
  $('#ordQtyOnHand').val("");
    $('#orderQty').val("");
    $('#ORDcash').val("");
    $('#ORDbalance').val("");
    $('#ORDdiscount').val("");
    $("#ORDcash").css('border','1px solid gray');
}


/*================getDate==================*/
function getDate() {
   return  new Date().toLocaleDateString();
}
/*================getTime==================*/
function getTime() {
   return  new Date().toLocaleTimeString();
}
/*==============================*/
let InputMoney=/^[0-9]{0,10}$/;
$('#ORDcash').on('keyup',function (event) {

    let total=parseInt($('#ORDtotal').val());
    let cash=$('#ORDcash').val();
    let checking=InputMoney.test(cash.toString());
    $('#ORDbalance').val("0.00");
    while (checking){
        let balance=cash-total;
        if(balance>0){
            $("#ORDcash").css('border','2px solid green');
            $('#ORDbalance').val(balance+".00");
        } else if(balance<0) {
            $("#ORDcash").css('border','2px solid red');
            $('#ORDbalance').val((cash-total)+".00");
        }

        checking=false;
    }
    if($('#ORDcash').val().length==0){
        $('#ORDbalance').val("0.00");
        $("#ORDcash").css('border','1px solid gray');
    }


});

