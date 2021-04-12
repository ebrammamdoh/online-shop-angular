export interface OrderModel {
     customerName: string;
     taxValue: number;
     discountCode: string;
     discountValue: number;
     totalPrice: number;
     orderDetails: OrderDetailsModel[]
}


export interface OrderDetailsModel {
     itemId: number
     itemName: string
     itemPrice: number
     quantity: number
     totalPrice: number
     uom: string
     tax: number
     discount: number
}