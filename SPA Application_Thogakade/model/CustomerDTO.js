function CustomerDTO(id,firstname,lastname,address,contactno,country,city,zipcode) {
    let __id=id;
    let __firstname=firstname;
    let __lastname=lastname;
    let __address=address;
    let __contactno=contactno;
    let __country=country;
    let __city=city;
    let __zipcode=zipcode;

    this.getCustomerID=function () {
    return __id;
    }
    this.getFirstName=function () {
        return __firstname;
    }
    this.getLastName=function () {
        return __lastname;
    }
    this.getAddress=function () {
        return __address;
    }
    this.getContactNo=function () {
        return __contactno;
    }
    this.getCountry=function () {
        return __country;
    }
    this.getCity=function () {
        return __city;
    }
    this.getZipCode=function () {
        return __zipcode;
 }
 this.setCustomerID=function (newID) {
        __id=newID;
 }
    this.setFirstName=function (newFirstName) {
        __firstname=newFirstName;
    }
    this.setLastName=function (newLastName) {
        __lastname=newLastName;
    }
    this.setAddress=function (newAddress) {
        __address=newAddress;
    }
    this.setContactNo=function (newContactNo) {
        __contactno=newContactNo;
    }
    this.setCountry=function (newCountry) {
        __country=newCountry;
    }
    this.setCity=function (newCity) {
        __city=newCity;
    }
    this.setZipCode=function (newZipCode) {
        __zipcode=newZipCode;
    }
}