function OrderTM(itemcode,itemname,description,unitprice,qty,total) {
    let __itemcode=itemcode;
    let __itemname=itemname;
    let __description=description;
    let __unitprice=unitprice;
    let __qty=qty;
    let __total=total;

    this.getTMItemCode=function () {
        return __itemcode;
    }
    this.getTMItemName=function () {
        return __itemname;
    }
    this.getTMDescription=function () {
        return __description;
    }
    this.getTMUnitPrice=function () {
        return __unitprice;
    }
    this.getTMQty=function () {
        return __qty;
    }
    this.getTMTotal=function () {
        return __total;
    }
    this.setTMItemCode=function (newItemCode) {
        __itemcode=newItemCode;
    }
    this.setTMItemName=function (newItemName) {
        __itemname=newItemName;
    }
    this.setDescription=function (newDescription) {
      __description=newDescription;
    }
    this.setTMItemUnitPrice=function (newUnitPrice) {
        __unitprice=newUnitPrice;
    }
    this.setTMItemQty=function (newQty) {
        __qty =newQty;
    }
    this.setTMItemTotal=function (newTotal) {
        __total=newTotal;
    }
}