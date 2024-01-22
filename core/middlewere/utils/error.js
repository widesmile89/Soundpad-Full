

class Apierror extends Error{

    constructor(message,statusCode){

        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4)?"faild":"error";
        this.isOpretional = true;
        
    }
}

module.exports = Apierror














