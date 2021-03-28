function OrderDTO(orderid,date,time,total,cash,discount,balance,ordDetails=[]) {
let __orderid=orderid;
let __date=date;
let __time=time;
let __total=total;
let __cash=total;
let __discount=discount;
let __balance=balance;
let __ordDetails=ordDetails;
    this.getOrderID=function () {
        return orderid;
    }
    this.getDate=function () {
        return date;
    }
    this.getTime=function () {
        return time;
    }
    this.getTotal=function () {
        return __total;
    }
    this.getCash=function () {
        return __cash;
    }
    this.getDiscount=function () {
        return __discount;
    }
    this.getBalance=function () {
        return __balance;
    }
    this.getOrderDetails=function () {
        return __ordDetails;
    }

    this.setOrderID=function (newOrderID) {
        __orderid=orderid;
    }
    this.setDate=function (newDate) {
        __date=newDate;
    }
    this.setTime=function (newTime) {
        __time=newTime;
    }
    this.setTotal=function (newTotal) {
        __total=newTotal;
    }
    this.setCash=function (newCash) {
        __cash=newCash;
    }
    this.setDiscount=function (newDiscount) {
        __discount=newDiscount;
    }
    this.setBalance=function (newBalance) {
        __balance=newBalance;
    }
    this.setORDDetails=function (newOrderDetails) {
        __ordDetails=newOrderDetails;
    }
}
