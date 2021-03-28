
var perivoussid;
function Disablebtn(condition) {
    document.getElementById("btnDeleteItem").disabled = condition;
    document.getElementById("btnUpdateItem").disabled = condition;
    document.getElementById("btnSaveItem").disabled = condition;

}
Disablebtn(true);
document.getElementById("btnSaveItem").disabled = false;
function cleartextField() {
    $('#txtitemname').val("");
    $('#txtItemdescription').val("");
    $('#txtItemunitprice').val("");
    $('#txtItemqtyonhand').val("");

}

$('#lblitemcode,#lblitemname,#lbldescription,#lblunitprice,#lblqtyonhand').css('display','none');

let item_name=/^[A-z 0-9 -)]{4,20}$/;
let description=/^[A-z 0-9 -)]{4,20}$/;
let unit_price=/^[0-9]{2,5}|[0-9.]{2,5}[0-9]{2,5}$/;
let qtyOnhand=/^[0-9]{1,3}$/;
$("#txtitemname").on('keydown',function (event) {
    if(item_name.test($('#txtitemname').val())){
        $("#txtitemname").css('border','2px solid green');
        $('#lblitemname').css('display','none');
    }else {
        $("#txtitemname").css('border','2px solid red');
        $('#lblitemname').css('display','block');
        $('#txtitemname').focus();
    }
    if(event.key=="Enter"){
        $('#txtItemdescription').focus();
    }
});
$("#txtItemdescription").on('keydown',function (event) {
    if(description.test($('#txtItemdescription').val())){
        $("#txtItemdescription").css('border','2px solid green');
        $('#lbldescription').css('display','none');

    }else {
        $("#txtItemdescription").css('border','2px solid red');
        $('#lbldescription').css('display','block');
        $('#txtItemdescription').focus();
    }
    if(event.key=="Enter"){
        $('#txtItemunitprice').focus();
    }
});
$("#txtItemunitprice").on('keydown',function (event) {
    if(unit_price.test($('#txtItemunitprice').val())){
        $("#txtItemunitprice").css('border','2px solid green');
        $('#lblunitprice').css('display','none');

    }else {
        $("#txtItemunitprice").css('border','2px solid red');
        $('#lblunitprice').css('display','block');
        $('#txtItemunitprice').focus();
    }
    if(event.key=="Enter"){
        $('#txtItemqtyonhand').focus();
    }
});
$("#txtItemqtyonhand").on('keydown',function (event) {
    if(event.key=="Enter"){
        if(qtyOnhand.test($('#txtItemqtyonhand').val())){
            $("#txtItemqtyonhand").css('border','2px solid green');
            $('#lblqtyonhand').css('display','none');
            SaveItem();

        }else {
            $("#txtItemqtyonhand").css('border','2px solid red');
            $('#lblqtyonhand').css('display','block');
            $('#txtItemqtyonhand').focus();
        }

    }
});

/*-----------------------Genarate Item Code---------------------------------------*/
let ItemID=new Array();
GenarateItemId();
function GenarateItemId(){

    if(ItemID.length<1){
        ItemID.push("MDE0001");
        $('#txtitemcode').val(ItemID[0]);
    }else if(ItemID.length<10){
        let lastid= ItemID.slice(-1).pop();
        let ORD =lastid.substr(6,1);
        let value=parseInt(ORD);
        $('#txtitemcode').val("MDE000"+(value+1));
        ItemID.push($('#txtitemcode').val());

    }else if(ItemID.length>=10){
        let lastid= ItemID.slice(-1).pop();
        let ORD =lastid.substr(5);
        let value=parseInt(ORD);
        $('#txtitemcode').val("MDE00"+(value+1));
        ItemID.push($('#txtitemcode').val());

    }


}

/*-----------------------Save Item ---------------------------------------*/

function SaveItem() {
    let itemcode=$('#txtitemcode').val();
    let itemname=$('#txtitemname').val();
   let description= $('#txtItemdescription').val();
    let price=$('#txtItemunitprice').val();
    let qty=$('#txtItemqtyonhand').val();
    if(qty.length>0&&description.length>0&&itemcode.length>0){
    let option=confirm(`Are you Sure Save this Item: ${itemcode}`);
    if(option){
            var item=new ItemDTO(itemcode,itemname,description,price,qty);
            ItemDB.push(item);
        LoadAllItemID();
            loadAllItem();
            cleartextField();
        $('#item_tblbody > tr').click(function () {
            perivoussid=$('#txtitemcode').val();
            let itemcode = $(this).children('td:eq(1)').text();
            let itemname = $(this).children('td:eq(2)').text();
            let description = $(this).children('td:eq(3)').text();
            let unitprice = $(this).children('td:eq(4)').text();
            let itemqty = $(this).children('td:eq(5)').text();

            $('#txtitemcode').val(itemcode);
            $('#txtitemname').val(itemname);
            $('#txtItemdescription').val(description);
            $('#txtItemunitprice').val(unitprice);
            $('#txtItemqtyonhand').val(itemqty);
            document.getElementById("btnDeleteItem").disabled = false;
            document.getElementById("btnUpdateItem").disabled = false;
            document.getElementById("btnSaveItem").disabled = true;

        });



        }

    }

GenarateItemId();
    perivoussid=$('#txtitemcode').val();
}

/*-----------------------Save Item ---------------------------------------*/
/*-----------------------Load Item ---------------------------------------*/
function loadAllItem() {
$('#item_tblbody,#tblItemTM').empty();
let no=1;
    for (var i in ItemDB) {
        let itemcode=ItemDB[i].getItemCode();
        let itenname=ItemDB[i].getItemName();
        let description=ItemDB[i].getItemDescription();
        let unitprice=ItemDB[i].getItemUnitPrice();
        let qty=ItemDB[i].getItemQty();
        var row=`<tr>
<td>${no++}</td>
<td>${itemcode}</td>
<td>${itenname}</td>
<td>${description}</td>
<td>${unitprice}</td>
<td>${qty}</td>
</tr>`;
        $('#item_tblbody,#tblItemTM').append(row);


    }
}


/*-----------------------Load Item ---------------------------------------*/
/*-----------------------Search  Item ---------------------------------------*/
function searchItemID(itemID){
    for (var  index in ItemDB) {
        if(ItemDB[index].getItemCode()==itemID){
            return ItemDB[index];
        }
    }
}
/*-----------------------Search  Item ---------------------------------------*/
/*-----------------------Delete  Item ---------------------------------------*/
function deleteItem(){
    let itemname=$('#txtitemname').val();
    let description= $('#txtItemdescription').val();
    let price=$('#txtItemunitprice').val();
    let item = searchItemID($("#txtitemcode").val());
    if(itemname.length>0&&description.length>0&price.length>0){
        let option=confirm(`Are you Sure Delete this Item:`+$("#txtitemcode").val());
        if(option){

            let number = ItemDB.indexOf(item);
            ItemDB.splice(number,1);

            document.getElementById("btnDeleteItem").disabled = true;
            document.getElementById("btnUpdateItem").disabled = true;
            document.getElementById("btnSaveItem").disabled = false;
            loadAllItem();
            cleartextField();
            $('#txtitemcode').val(perivoussid);

        }else {
            cleartextField();

        }
    }

}
/*-----------------------Delete  Item ---------------------------------------*/
/*-----------------------Update  Item ---------------------------------------*/
function UpdateItem() {
    let itemcode=$('#txtitemcode').val();
    let itemname=$('#txtitemname').val();
    let description= $('#txtItemdescription').val();
    let price=$('#txtItemunitprice').val();
    let qty=$('#txtItemqtyonhand').val();
    if(itemname.length>0&&description.length>0&price.length>0){
        let option=confirm(`Are you Sure Update this Item:`+$("#txtitemcode").val());
        if(option){
            let items = searchItemID(itemcode);
            items.setItemName(itemname);
            items.setItemDescription(description);
            items.setItemUnitePrice(price);
            items.setItemQty(qty);
            loadAllItem();
            cleartextField();
            $('#txtitemcode').val(perivoussid);
            document.getElementById("btnDeleteItem").disabled = true;
            document.getElementById("btnUpdateItem").disabled = true;
            document.getElementById("btnSaveItem").disabled = false;
        }
    }
}
/*-----------------------Update  Item ---------------------------------------*/
function clearItem() {
cleartextField();
if(ItemDB.length<1){
    $('#txtitemcode').val("MDE0001");
}else {
    $('#txtitemcode').val(perivoussid);
}

    document.getElementById("btnDeleteItem").disabled = true;
    document.getElementById("btnUpdateItem").disabled = true;
    document.getElementById("btnSaveItem").disabled = false;
}