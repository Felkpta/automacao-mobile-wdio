class AddressPage {
    get inputName() { return $('~Enter your name'); }
    get inputPhone() { return $('~Enter your mobile number'); }
    get inputAddress() { return $('~Enter your address'); }
    get inputCity() { return $('~City'); }
    get inputState() { return $('~State'); }
    get inputZip() { return $('~ZipCode'); }
    get btnSave() { return $('~Save'); }

    async fillAddress(name, phone, address, city, state, zip) {
        await this.inputName.setValue(name);
        await this.inputPhone.setValue(phone);
        await this.inputAddress.setValue(address);
        await this.inputCity.setValue(city);
        await this.inputState.setValue(state);
        await this.inputZip.setValue(zip);
        await this.btnSave.click();
    }
}
module.exports = new AddressPage();
