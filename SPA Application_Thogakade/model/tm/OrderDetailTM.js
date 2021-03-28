function OrderDetailsTM(orderid,customerid,total,subtotal,cash,discount,balance) {
let __orderid=orderid;
let __customerid=customerid;
let __total=total;
let __subtotal=subtotal;
let __cash=cash;
let __discount=discount;
let __balance=balance;

    this.getTMOrderID=function () {
    return __orderid;
    }
    this.getTMCustomerID=function () {
        return __customerid;
    }
    this.getTMTotalAmount=function () {
        return __total;
    }
    this.getTMSubTotal=function () {
        return __subtotal;
    }
    this.getTMCash=function () {
        return __cash;
    }
    this.getTMDiscount=function () {
        return __discount;
    }
    this.getTMBalance=function () {
        return __balance;
    }
    this.setTMOrderID=function (newOrderID) {
        __orderid=newOrderID;
    }
    this.setTMCustomerID=function (newCustomerID) {
        __customerid=newCustomerID;
    }
    this.setTMTotalAmount=function (newTotalAmount) {
        __total=newTotalAmount;
    }
    this.setTMSubTotal=function (newSubTotal) {
        __subtotal=newSubTotal;
    }
    this.setTMCash=function (newCash) {
        __cash=newCash;
    }
    this.setTMDiscount=function (newDiscount) {
        __discount=newDiscount;
    }
    this.setTMBalance=function (newBalance) {
        __balance=newBalance;
    }

}