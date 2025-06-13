class ApiResponse<T>{
    success : boolean;
    message : string;
    data : T;
    errorcode? : number;
    constructor(success : boolean , message : string , data : T , errorcode? : number){
        this.success = success;
        this.message = message;
        this.data = data;
        this.errorcode = errorcode;
    }
}

export default ApiResponse;