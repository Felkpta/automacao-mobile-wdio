class BrowsePage {
    get firstProduct() { return $('~Ingrid Running Jacket'); }

    async selectFirstProduct() {
        await this.firstProduct.click();
    }
}
module.exports = new BrowsePage();
