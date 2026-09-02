class ProductPage {
    get btnAddToCart() { return $('~Add To Cart'); }

    async addToCart() {
        await this.btnAddToCart.click();
    }
}
module.exports = new ProductPage();
