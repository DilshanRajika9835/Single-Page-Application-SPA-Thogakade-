function PrintBill() {

    $('#tblOrder thead tr th').css({
        width:80

    });

$('#tblOrder,#id1,#id2,#id3,#id4,#id5').printThis({

    debug: false,               // show the iframe for debugging
    importCSS: true,            // import parent page css
    importStyle: false,         // import style tags
    printContainer: true,       // print outer container/$.selector
    loadCSS: "F:/SECOND SEMESTER (WEB DESING)/2021-03-16 The lecture on Internet" +
        " Technologies/CourseWork_Project/assert/report/w3.css",                // path to additional css file -
    // use an array [] for multiple
    pageTitle: "SPA POS System",              // add title to print page
    removeInline: false,        // remove inline styles from print elements
    removeInlineSelector: "*",  // custom selectors to filter inline styles. removeInline must be true
    printDelay: 333,            // variable print delay
    header: "<h1  style='font-size: 40px;color: #0d6efd' class='w3-center'>Invoice</h1>",               // prefix to
    // html
    footer: "<h6 style='font-size: 20px;margin: 0;padding: 0'>If you have any query about this invoice, please contact us at</h6>" +
        "<h6 style='font-size: 12px;margin: 0;padding: 0'>+94 766681528</h6>",               // postfix to
    // html
    base: false,                // preserve the BASE tag or accept a string for the URL
    formValues: true,           // preserve input/form values
    canvas: false,              // copy canvas content
    doctypeString: '<!DOCTYPE html>', // enter a different doctype for older markup
    removeScripts: false,       // remove script tags from print content
    copyTagClasses: false,      // copy classes from the html & body tag
    beforePrintEvent: null,     // callback function for printEvent in iframe
    beforePrint: null,          // function called before iframe is filled
    afterPrint: null            // function called before iframe is removed
});
}
