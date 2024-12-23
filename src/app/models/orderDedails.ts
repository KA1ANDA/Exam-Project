export class OrderDetails {
    constructor(
        public id? : number | null ,
        public orderId? : number | null ,
        public bookId? : number| null ,
        public quantity? : number | null ,
        public totalPrice? : number| null ){}
}