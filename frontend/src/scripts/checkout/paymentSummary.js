import {cart} from '../../../../backend/data/cart.js';
import { getProduct } from '../../../../backend/data/products.js';
import { getDeliveryOption } from '../../../../backend/data/diliveryOptions.js';



export function updatePayment(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    
    cart.forEach( cartIytem => {
        //calculating the total products price
        const product = getProduct(cartIytem.productId);
        productPriceCents += product.priceCents * cartIytem.quantity;
        
        //calculating the total shipping price
        const deliveryOption = getDeliveryOption(cartIytem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
        
        
    });
    //calculating the total before tax price
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents*0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentHTML = `<div class="payment-summary-title">
                            Order Summary
                        </div>

                        <div class="payment-summary-row">
                            <div>Items (3):</div>
                            <div class="payment-summary-money">$${(productPriceCents/100).toFixed(2)}</div>
                        </div>

                        <div class="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div class="payment-summary-money">$${(shippingPriceCents/100).toFixed(2)}</div>
                        </div>

                        <div class="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div class="payment-summary-money">$${(totalBeforeTaxCents/100).toFixed(2)}</div>
                        </div>

                        <div class="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div class="payment-summary-money">$${(taxCents/100).toFixed(2)}</div>
                        </div>

                        <div class="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div class="payment-summary-money">$${(totalCents/100).toFixed(2 )}</div>
                        </div>

                        <button class="place-order-button button-primary">
                            Place your order
                        </button>`;

    document.querySelector('.js-payment-summary').innerHTML = paymentHTML;
}