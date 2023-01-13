var Fetches = new Fetches();
var Populate = new Populate();
var DataHolder = new DataHolder();
var UrlFunctions = new UrlFunctions();
var FormFunctions = new FormFunctions();
var MessageFunctions = new MessageFunctions();
var DistributeLocation = new DistributeLocation();
Fetches.set(Populate, DataHolder);
Populate.set(Fetches, UrlFunctions, DistributeLocation, DataHolder);
UrlFunctions.set(FormFunctions, DataHolder);
FormFunctions.set(Fetches, DistributeLocation, MessageFunctions, DataHolder);
MessageFunctions.set(DataHolder);
DistributeLocation.set(DataHolder);




document.addEventListener('DOMContentLoaded', loaded, false);

function loaded () {
    
    Fetches.loadVoivodeships();
    Populate.fillCities([]);
    Fetches.loadCities();
    Fetches.loadLast();
}
DataHolder.selectVoivodeship.onchange = (event) => {
    const id = event.target.value;
    if(parseInt(id) > -1)
    {
        DataHolder.activeVoivodeship = DataHolder.voivodeships.find(obj => obj.id === parseInt(id));
        if(DataHolder.activeVoivodeship !== undefined)
        {
            if(DataHolder.activeVoivodeship.hasOwnProperty('id'))
            {
                Fetches.loadCities();
            } 
        }
    }
}
DataHolder.selectCity.onchange = (event) => {
    const id = event.target.value;
    if(parseInt(id) > -1)
    {
        DataHolder.activeCity = DataHolder.cities.find(obj => obj.id === parseInt(id)); 
    }
}
DataHolder.buttonReset.onclick = (event) => {
    reset();
}
function reset()
{
    DataHolder.url.searchParams.delete('entryId');
    window.history.pushState("", "", DataHolder.url.href);
    DataHolder.selectCity.setAttribute('disabled', true);
    DataHolder.activeVoivodeship = undefined;
    DataHolder.activeCity = undefined;
    Fetches.loadVoivodeships();
    //Populate.fillCities([]);
    DataHolder.selectCity.value = -1;
    DataHolder.inputStreet.value = "";
    DataHolder.inputNotes.value = "";
    MessageFunctions.message("");
}
DataHolder.buttonSend.onclick = (event) => {
    trySend();
}
function trySend()
{
    if(DataHolder.activeVoivodeship !== undefined && DataHolder.activeCity !== undefined && DataHolder.inputStreet.value.length > 0)
    {
        MessageFunctions.message("");
        Fetches.send();
    }
    else
    {
        if(DataHolder.activeVoivodeship === undefined && DataHolder.inputStreet.value.length === 0)
        {
            MessageFunctions.message("Wybierz województwo, miasto, oraz wpisz ulicę");
        }
        else if(DataHolder.activeCity === undefined && DataHolder.inputStreet.value.length === 0)
        {
            MessageFunctions.message("Wybierz miasto, oraz wpisz ulicę");
        }
        else if(DataHolder.activeVoivodeship === undefined && DataHolder.inputStreet.value.length > 0)
        {
            MessageFunctions.message("Wybierz województwo oraz miasto");
        }
        else if(DataHolder.activeCity === undefined && DataHolder.inputStreet.value.length > 0)
        {
            MessageFunctions.message("Wybierz miasto");
        }
        else if(DataHolder.activeCity !== undefined && DataHolder.inputStreet.value.length === 0)
        {
            MessageFunctions.message("Podaj ulicę");
        }
    }
}
function clickRecord(id)
{
    if(DataHolder.voivodeships.length > 0 && DataHolder.cities.length > 0)
    {
        let activeRecord = DataHolder.lastRecords.find(obj => obj.Id === id);
        DataHolder.url.searchParams.set('entryId', activeRecord.Id); 
        window.history.pushState(activeRecord.Id, activeRecord.Id, DataHolder.url.href);
        FormFunctions.fillFormByEntry();
    }
    
}


