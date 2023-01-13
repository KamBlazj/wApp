function Populate()
{
    const _this=this;
    this.Fetches = null;
    this.UrlFunctions = null;
    this.DistributeLocations = null;
    this.DataHolder = null;
    this.set=function(fetches, urlFunctions, distributeLocations, dataHolder)
    {
        this.Fetches = fetches;
        this.UrlFunctions = urlFunctions;
        this.DistributeLocations = distributeLocations;
        this.DataHolder = dataHolder;
    }
    this.fillVoivodeships=function(list)
    {
        _this.DataHolder.voivodeships = list;
        let option =`<option value=-1 style="display: none">Wybierz Województwo</option>`;
        let options = list.map(item => `<option value=${item.id}>${item.name}</option>`).join('\n');
        let result = option + options;
        _this.DataHolder.selectVoivodeship.innerHTML = result;
    }

    this.fillCities=function(list, type)
    {
        _this.DataHolder.allCities=[];
        for(let i = 0; i < list.length; i++)
        {
            _this.DataHolder.allCities.push(list[i]);
        }
        if(type === "list")
        {
            _this.DataHolder.cities = list;
            return true;
        }
        if(_this.DataHolder.activeVoivodeship !== undefined)
        {
            if(_this.DataHolder.activeVoivodeship.hasOwnProperty('id'))
            {
                list = list.filter(obj => {
                    return obj.voivodeship_id === _this.DataHolder.activeVoivodeship.id;
                });
                _this.DataHolder.selectCity.removeAttribute('disabled');
            }
        }
        list.sort((a,b) => a.name.localeCompare(b.name, 'pl'));
        _this.DataHolder.cities = list;
        let option =`<option value=-1 style="display: none">Wybierz Miasto</option>`;
        let options = list.map((item) => {
            return `<option value=${item.id}>${item.name}</option>`}
        ).join('\n');
        let result = option + options;
        _this.DataHolder.selectCity.innerHTML = result;
    }

    this.fillLast=function(list)
    {
        let interval = setInterval(function() {
            if(_this.DataHolder.voivodeships.length > 0 && _this.DataHolder.cities.length > 0)
            {
                _this.DataHolder.lastRecords = list;
                const option = "<thead><tr><th>Województwo</th><th>Miasto</th><th>Ulica</th></tr><tr><th colspan='3'>Notatka</th></tr></thead>";
                let i = 0;
                let options = list.map((item) => {
                const stringArray = _this.DistributeLocations.distribute(item.Address);
                    let clas = "tr_main1";
                    if(i%2 === 1)
                    {
                        clas = "tr_main2";
                    }
                    i++;
                    return `<tbody  onclick="clickRecord('${item.Id}')" class="${clas} tr_main"><tr><td>${stringArray[0]}</td><td>${stringArray[1]}</td><td>${stringArray[2]}</td></tr><tr><td colspan="3" class="td_notes">${item.Notes}</td></tr></tbody>`
                }).join('\n');
                _this.DataHolder.tableContent.innerHTML = option + options;
                _this.UrlFunctions.getUrl();
                clearInterval(interval); 
            }
        }, 50);
    }
        
}
