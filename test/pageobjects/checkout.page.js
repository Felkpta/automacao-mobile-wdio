class CheckoutPage {
    get radioCashOnDelivery() { return $('~Cash on Delivery'); }
    get btnCheckout() { return $('~Checkout'); }
    get successMessage() { return $('~Transaction successful!'); }

    async completePayment() {
        await this.radioCashOnDelivery.click();
        await this.btnCheckout.click();
    }
}
module.exports = new CheckoutPage();
