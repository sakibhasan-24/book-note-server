export class AppError extends Error{
    public statusCode:Number;
    public isOperational:boolean;


    constructor(message:string,statusCode=500,isOperational=true){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this,this.constructor);
    }
}