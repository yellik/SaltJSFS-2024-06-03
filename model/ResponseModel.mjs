export class ResponseModel {
    constructor({statusCode = 404, data = null, error = null }){
        this.statusCode = statusCode;

        if (statusCode > 200 && statuscode <= 299) this.success = true;

        this.error = error;

        if(data) {
            if(Array.isArray(data)){
                this.items = data.length;
            } else {
                this.items = 1;
            }
        }else {
            this.items = 0;
        }

        this.data = data;
    }
}