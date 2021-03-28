function ItemDTO(itemcode,itemname,description,unitprice,qty) {
    let __itemcode=itemcode;
    let __itemname=itemname;
    let __description=description;
    let __unitprice=unitprice;
    let __qty=qty;
this.getItemCode=function () {
return __itemcode;
}
    this.getItemName=function () {
        return __itemname;
    }
    this.getItemDescription=function () {
        return __description;
    }
    this.getItemUnitPrice=function () {
        return __unitprice;
    }
    this.getItemQty=function () {
        return __qty;
    }
    this.setItemCode=function (newItemCode) {
        __itemcode=newItemCode;
    }
    this.setItemName=function (newItemName) {
        __itemname=newItemName;
    }
    this.setItemDescription=function (newItemDescription) {
        __description=newItemDescription;
    }
    this.setItemQty=function (newItemQty) {
        __qty=newItemQty;
    }
    this.setItemUnitePrice=function (newItemPrice) {
        __unitprice=newItemPrice;
    }
}