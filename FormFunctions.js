function FormFunctions()
{
    const _this=this;
    this.Fetches = null;
    this.DistributeLocation = null;
    this.DataHolder = null;
    this.set=function(fetches,distributeLocation,messageFunctions,dataHolder)
    {
        this.Fetches = fetches;
        this.DistributeLocation = distributeLocation;
        this.MessageFunctions = messageFunctions;
        this.DataHolder = dataHolder;
    }
    this.fillFormByEntry=function()
    {
        const entry = _this.DataHolder.url.searchParams.get('entryId');
        let activeRecord = _this.DataHolder.lastRecords.find(obj => obj.Id === entry);
        const stringArray = _this.DistributeLocation.distribute(activeRecord.Address);
        const trimmed = stringArray[0].trim();
        const lowered = trimmed.charAt(0).toLowerCase()+ stringArray[0].trim().slice(1);
        let interval = setInterval(function() {
            if(_this.DataHolder.voivodeships.length > 0)
            {
                _this.DataHolder.activeVoivodeship = _this.DataHolder.voivodeships.find(obj => obj.name.trim() === lowered);
                if(_this.DataHolder.activeVoivodeship !== undefined)
                {
                    if(_this.DataHolder.activeVoivodeship.hasOwnProperty('id'))
                    {
                        let sameCity = false;
                        if(_this.DataHolder.activeCity !== undefined)
                        {
                            if(_this.DataHolder.activeCity.hasOwnProperty('id'))
                            {
                                if(_this.DataHolder.activeCity.name.trim() === stringArray[1].trim())
                                {
                                    sameCity = true;
                                    _this.finishFillingForm();
                                }
                            }
                        }
                        if(!sameCity)
                        {
                            _this.DataHolder.cities = [];
                            _this.Fetches.loadCities();
                            let interval2 = setInterval(function() {
                                if(_this.DataHolder.cities.length > 0)
                                {
                                    const stringArray2 = _this.DistributeLocation.distribute(activeRecord.Address);
                                    _this.DataHolder.activeCity = _this.DataHolder.cities.find(obj => obj.name.trim() === stringArray2[1].trim());
                                    const allCity = _this.DataHolder.allCities.find(obj => obj.name.trim() === stringArray2[1].trim());
                                    let found = false;
                                    if(_this.DataHolder.activeCity !== undefined)
                                    {
                                        if(_this.DataHolder.activeCity.hasOwnProperty('id'))
                                        {
                                            _this.finishFillingForm();
                                            found = true;
                                            clearInterval(interval2);
                                        }
                                    }
                                    if(!found)
                                    {
                                        if(allCity !== undefined)
                                        {
                                            if(allCity.hasOwnProperty('id'))
                                            {
                                                _this.finishFillingForm();
                                                MessageFunctions.message("Podane miasto nie należy do danego województwa");
                                                clearInterval(interval2);
                                            }
                                        }
                                    }
                                }
                            }, 50);
                        }
                    }
                }
                clearInterval(interval); 
            }
        }, 50);
    }
    this.finishFillingForm=function()
    {
        if(_this.DataHolder.activeCity !== undefined)
        {
            if(_this.DataHolder.activeCity.hasOwnProperty('id'))
            {
                _this.DataHolder.selectCity.value = _this.DataHolder.activeCity.id;
            }
        }
        if(_this.DataHolder.activeVoivodeship !== undefined)
        {
            if(_this.DataHolder.activeVoivodeship.hasOwnProperty('id'))
            {
                _this.DataHolder.selectVoivodeship.value = _this.DataHolder.activeVoivodeship.id;
            }
        }
        
        const entry = _this.DataHolder.url.searchParams.get('entryId');
        let activeRecord = _this.DataHolder.lastRecords.find(obj => obj.Id === entry);
        const stringArray = _this.DistributeLocation.distribute(activeRecord.Address);
        _this.DataHolder.inputStreet.value = stringArray[2];
        _this.DataHolder.inputNotes.value = activeRecord.Notes;
    }
}






