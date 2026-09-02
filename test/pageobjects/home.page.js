class HomePage {
    get tabBrowse() { return $('~Browse'); }

    async goToBrowse() {
        await this.tabBrowse.click();
    }
}
module.exports = new HomePage();
