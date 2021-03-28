
let firstName=/^[A-z ]{4,20}$/;
let lastName=/^[A-z ]{5,30}$/;
let address=/[^@][A-z|0-9|/|-]{1,}$/;
let contactNo=/^[0-9]{10}$/;
var periviousCustID;

$("#txtcustfirstname").on('keydown',function (event) {
    if(firstName.test($('#txtcustfirstname').val())){
        $("#txtcustfirstname").css('border','2px solid green');
        $('#lblfname').css('display','none');
    }else {
        $("#txtcustfirstname").css('border','2px solid red');
        $('#lblfname').css('display','block');
        $('#txtcustfirstname').focus();
    }
    if(event.key=="Enter"){
        $('#txtcustlastname').focus();
    }
});
$("#txtcustlastname").on('keydown',function (event) {
    if(lastName.test($('#txtcustlastname').val())){
        $("#txtcustlastname").css('border','2px solid green');
        $('#lbllname').css('display','none');
    }else {
        $("#txtcustlastname").css('border','2px solid red');
        $('#lbllname').css('display','block');
    }
    if(event.key=="Enter"){
        $('#txtaddress').focus();
    }
});
$("#txtaddress").on('keydown',function (event) {
    if(address.test($('#txtaddress').val())){
        $("#txtaddress").css('border','2px solid green');
        $('#lbladdress').css('display','none');
    }else {
        $("#txtaddress").css('border','2px solid red');

        $('#lbladdress').css('display','block');
    }
    if(event.key=="Enter"){

        $('#txtphoneno').focus();
    }
});
$("#txtphoneno").on('keydown',function (event) {
    if(contactNo.test($('#txtphoneno').val())){
        $("#txtphoneno").css('border','2px solid green');
        $('#lblphoneno').css('display','none');
    }else {
        $("#txtphoneno").css('border','2px solid red');
        $('#lblphoneno').css('display','block');
    }
    if(event.key=="Enter"){
       $('#txtcountry').focus();
       
    }
});

/*==================================================================================================*/

function saveCustomer() {
    let custid=$('#txtcustid').val();
    let firstname=$('#txtcustfirstname').val();
    let lastname=$('#txtcustlastname').val();
    let address=$('#txtaddress').val();
    let phoneno=$('#txtphoneno').val();
    let country=$('#txtcountry').val();
    let city=$('#txtcity').val();
    let zipcode=$('#txtzipcode').val();
    if(custid.length>0&&address.length>0&&zipcode.length>0){
    let option=confirm(`Are you Sure Save this Customer: ${custid}`);
    if(option){
            let customer=new CustomerDTO(custid,firstname,lastname,address,phoneno,country,city,zipcode);
            CustomerDB.push(customer);
             LoadAllCustomerID();
            loadAllCustomer();
            clearCustText();
            tblCustomerClick();
             GenerateCustomerID();
    }
    }else {
       clearCustText();
    }

periviousCustID=$('#txtcustid').val();
}
function tblCustomerClick() {
    $('#cust_tblbody > tr').click(function () {
        let custid = $(this).children('td:eq(1)').text();
        let fname = $(this).children('td:eq(2)').text();
        let lname = $(this).children('td:eq(3)').text();
        let address = $(this).children('td:eq(4)').text();
        let city = $(this).children('td:eq(5)').text();
        let country = $(this).children('td:eq(6)').text();
        let contactno = $(this).children('td:eq(7)').text();
        let zipcode = $(this).children('td:eq(8)').text();

        $('#txtcustid').val(custid);
        $('#txtcustfirstname').val(fname);
        $('#txtcustlastname').val(lname);
        $('#txtaddress').val(address);
        $('#txtcity').val(city);
        $('#txtcountry').val(country);
        $('#txtphoneno').val(contactno);
        $('#txtzipcode').val(zipcode);
        document.getElementById("btnDeleteCustomer").disabled = false;
        document.getElementById("btnUpdateCustomer").disabled = false;
        document.getElementById("btnSaveCustomer").disabled = true;
    });
}
$('#cust_tblbody > tr').click(function () {
    periviousCustID=$('#txtcustid').val();
});
function clearCustText() {
    $('#txtcustfirstname,#txtcustlastname,#txtaddress,#txtphoneno,#txtcountry,#txtcity,#txtzipcode').val("");
    document.getElementById("btnDeleteCustomer").disabled = true;
    document.getElementById("btnUpdateCustomer").disabled = true;
    document.getElementById("btnSaveCustomer").disabled = false;
}

/*-----------------------------------------------------*/
function searchCustID(custID){
    for (let  i in CustomerDB) {
       if(CustomerDB[i].getCustomerID()==custID){
           return CustomerDB[i];
       }
    }
}

/*-----------------------------------------------------*/
function loadAllCustomer() {
    $('#cust_tblbody,#tblCustomerTM').empty(); // clear all the table before adding for avoid duplicate
    var no=1;
    for (let i in CustomerDB) {
        let custid = CustomerDB[i].getCustomerID();
        let firstname = CustomerDB[i].getFirstName();
        let lastname = CustomerDB[i].getLastName();
        let address = CustomerDB[i].getAddress();
        let city = CustomerDB[i].getCity();
        let country = CustomerDB[i].getCountry();
        let contactno = CustomerDB[i].getContactNo();
        let zipcode = CustomerDB[i].getZipCode();
        var row = `<tr><td>${no++}</td><td>${custid}</td><td>${firstname}</td><td>${lastname}</td><td>${address}</td>
<td>${city}</td>
<td>${country}</td>
<td>${contactno}</td>
<td>${zipcode}</td>
</tr>`;
        $('#cust_tblbody,#tblCustomerTM').append(row);
    }
    tblCustomerClick();
}

/*-----------------------------------------------------*/
function updateCustomer() {
    let custid=$('#txtcustid').val();
    let fname=$('#txtcustfirstname').val();
    let lname=$('#txtcustlastname').val();
    let address=$('#txtaddress').val();
    let phoneno=$('#txtphoneno').val();
    let country=$('#txtcountry').val();
    let city=$('#txtcity').val();
    let zipcode=$('#txtzipcode').val();
    let customer = searchCustID(custid);
    if(custid.length>0&&fname.length>0&&city.length>0&&zipcode.length>0){
        let option=confirm(`Are you Sure Update this Customer: ${custid}`);
        if(option){
            customer.setFirstName(fname);
            customer.setLastName(lname);
            customer.setAddress(address);
            customer.setContactNo(phoneno);
            customer.setCountry(country);
            customer.setCity(city);
            customer.setZipCode(zipcode);
            loadAllCustomer();
           clearCustText();
            $('#txtcustid').val(periviousCustID);
        }else {
           clearCustText();

        }
    }

    tblCustomerClick();
}
/*-----------------------------------------------------*/
function deleteCustomer(){
    let custid=$('#txtcustid').val();
    let fname=$('#txtcustfirstname').val();
    let city=$('#txtcity').val();
    let zipcode=$('#txtzipcode').val();
    if(custid.length>0&&fname.length>0&&city.length>0&&zipcode.length>0){
        let customer = searchCustID($("#txtcustid").val());
        let option=confirm(`Are you Sure Delete this Customer:${custid}`);
        if(option){
            let number = CustomerDB.indexOf(customer);
            CustomerDB.splice(number,1);
            loadAllCustomer();
            clearCustText();
            $('#txtcustid').val(periviousCustID);
        }else {
           clearCustText();

        }
    }
    tblCustomerClick();
}

/*--------------Genarate CustomerID---------------------------------------*/

let CustomerID=new Array();
GenerateCustomerID();
function GenerateCustomerID(){

    if(CustomerID.length<1){
        CustomerID.push("CUS0001");
        $('#txtcustid').val(CustomerID[0]);
    }else if(CustomerID.length<10){
        let lastid= CustomerID.slice(-1).pop();
        let ORD =lastid.substr(6,1);
        let value=parseInt(ORD);
        $('#txtcustid').val("CUS000"+(value+1));
        CustomerID.push($('#txtcustid').val());

    }else if(CustomerID.length>=10){
        let lastid= CustomerID.slice(-1).pop();
        let ORD =lastid.substr(5);
        let value=parseInt(ORD);
        $('#txtcustid').val("CUS00"+(value+1));
        CustomerID.push($('#txtcustid').val());

    }
}

/*--------------Genarate CustomerID---------------------------------------*/
document.getElementById("btnDeleteCustomer").disabled = true;
document.getElementById("btnUpdateCustomer").disabled = true;

function clearCustomer() {
    if(CustomerDB.length<1){
        $('#txtcustid').val("CUS0001");

    }else {
        $('#txtcustid').val(periviousCustID);
    }


}