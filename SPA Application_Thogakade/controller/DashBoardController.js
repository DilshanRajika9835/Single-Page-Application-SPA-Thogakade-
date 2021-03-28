$('#navCustomer').click(function () {
    $('#Cust_Form').css('display','block');
    $('#dashboard,#order_Form,#itemForm').css('display','none');

});
$('#navhome').click(function () {
    $('#Cust_Form,#order_Form,#itemForm').css('display','none');
    $('#dashboard').css('display','block');

});
$('#navOrder').click(function () {
    $('#Cust_Form,#itemForm,#dashboard').css('display','none');
    $('#order_Form').css('display','block');

});
$('#navItem').click(function () {
    $('#Cust_Form,#order_Form,#dashboard').css('display','none');
    $('#itemForm').css('display','block');

});
$('#Cust_Form,#order_Form,#itemForm').css('display','none');
$('#lblcustID,#lblfname,#lbllname,#lbladdress,#lblphoneno').css('display','none');
$('#content-print').css('display','none');