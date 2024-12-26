export class OrderDetail {
    constructor(
        public id? : number | null ,
        public orderId? : number | null ,
        public bookId? : number | null ,
        public quantity? : number | null ,
        public totalPrice? : number | null ,      
        public name? : string | null ,      
        public author? : string | null ,      
         ){}
}