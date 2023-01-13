function DistributeLocation()
{
    const _this=this;
    this.DataHolder = null;
    this.set=function(dataHolder)
    {
        this.DataHolder = dataHolder;
    }
    this.distribute=function(item)
    {
        stringArray = item.split(",");
        let result = ["","",""];
        let non = 0;
        for(let i = 0; i<stringArray.length; i++)
        {
            const type = _this.check(stringArray[i]);
            if(type === 0)
            {
                result[0] = stringArray[i];
            }
            else if(type === 1)
            {
                result[1] = stringArray[i];
            }
            else if(type === 2)
            {
                result[2 - non] = stringArray[i];
                non++;
            }
        }
        return result;
    }
    this.check=function(item)
    {
        const voivodeship = _this.DataHolder.voivodeships.find(obj => obj.name.trim() === item.trim());
        if(voivodeship!==undefined)
        {
            if(voivodeship.name === item)
            {
                return 0;
            }
        }
        
        const trimmed = item.trim();
        const lowered = trimmed.charAt(0).toLowerCase()+ item.trim().slice(1);
        const voivodeship2 = _this.DataHolder.voivodeships.find(obj => obj.name.trim() === lowered);
        if(voivodeship2!==undefined)
        {
            if(voivodeship2.name === lowered)
            {
                return 0;
            }
        }
        const city = _this.DataHolder.allCities.find(obj => obj.name.trim() === item.trim());
        if(city!==undefined)
        {
            if(city.name === item)
            {
                return 1;
            }
        }
        const upper = trimmed.charAt(0).toUpperCase()+ item.trim().slice(1);
        const city2 = _this.DataHolder.allCities.find(obj => obj.name.trim() === upper);
        if(city2!==undefined)
        {
            if(city2.name === upper)
            {
                return 1;
            }
        }
        return 2;
    }
    this.fillCities=function(list)
    {
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
        _this.DataHolder.lastRecords = list;
        const option = "<thead><tr><th>Województwo</th><th>Miasto</th><th>Ulica</th></tr><tr><th colspan='3'>Notatka</th></tr></thead>";
        let i = 0;
        let options = list.map((item) => {
            stringArray = item.Address.split(",");
            let clas = "tr_main1";
            if(i%2 === 1)
            {
                clas = "tr_main2";
            }
            i++;
            return `<tbody  onclick="clickRecord('${item.Id}')" class="${clas} tr_main"><tr><td>${stringArray[2]}</td><td>${stringArray[1]}</td><td>${stringArray[0]}</td></tr><tr><td colspan="3" class="td_notes">${item.Notes}</td></tr></tbody>`
        }).join('\n');
        _this.DataHolder.tableContent.innerHTML = option + options;
        _this.UrlFunctions.getUrl();
    }
}
