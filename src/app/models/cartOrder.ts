export class CartOrder {
    constructor(
        public id? : number | null ,
        public customerName? : string | null ,
        public bookId? : number| null ,
        public quantity? : number | null ,
        public totalPrice? : number| null ){}
}