function DataHolder()
{
    this.selectVoivodeship = document.getElementById('selectVoivodeship');
    this.selectCity = document.getElementById('selectCity');
    this.inputStreet = document.getElementById('inputStreet');
    this.inputNotes = document.getElementById('inputNotes');
    this.buttonSend = document.getElementById('buttonSend');
    this.buttonReset = document.getElementById('buttonReset');
    this.messageBox = document.getElementById('messageBox');
    this.tableContent = document.getElementById('tableContent');
    this.gotUrl = false;
    this.url = "";
    this.voivodeships = [];
    this.activeVoivodeship = undefined;
    this.cities = [];
    this.allCities = [];
    this.activeCity = undefined;
    this.lastRecords = [];
}
