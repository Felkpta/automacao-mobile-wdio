class CartPage {
    get btnAddNewAddress() { return $('~Add New Address'); }
    get btnSelectAddress() { return $('~Select address'); }
    get btnContinueToPayment() { return $('~Continue to payment'); }

    async navigateToCheckout() {
        if (await this.btnAddNewAddress.isDisplayed()) {
            await this.btnAddNewAddress.click();
        } else {
            await this.btnContinueToPayment.click();
        }
    }
}
module.exports = new CartPage();
