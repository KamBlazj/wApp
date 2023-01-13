function Fetches()
{
    const _this=this;
    this.Populate = null;
    this.DataHolder = null;
    this.set=function(populate, dataHolder)
    {
        this.Populate = populate;
        this.DataHolder = dataHolder;
    }
    this.loadVoivodeships=function()
    {
        fetch('https://wavy-media-proxy.wavyapps.com/investors-notebook/inst4/data/wojewodztwa.json')
        .then(res => res.json())
        .then((out) => {
            _this.Populate.fillVoivodeships(out);
        }).catch(err => console.error(err));
    }
    this.loadCities=function(type)
    {
        fetch('https://wavy-media-proxy.wavyapps.com/investors-notebook/inst4/data/miasta.json')
        .then(res => res.json())
        .then((out) => {
            _this.Populate.fillCities(out, type);
        }).catch(err => console.error(err));
    }
    this.loadLast=function()
    {
        fetch('https://wavy-media-proxy.wavyapps.com/investors-notebook/inst4/?action=get_entries')
                .then(function(response) {
                return response.json();
            }).then(function(data) {
                _this.Populate.fillLast(data);  
        });
    } 
    this.send=function()
    {
        const address = _this.DataHolder.activeVoivodeship.name+","+_this.DataHolder.activeCity.name+","+_this.DataHolder.inputStreet.value;
        const notes = _this.DataHolder.inputNotes.value;
        const outputData={
            entry:{
                Address:address,
                Notes:notes
            }
        }
        fetch('https://wavy-media-proxy.wavyapps.com/investors-notebook/inst4/', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(outputData)
        })
        .then(res => {
            if (res.ok) { 
                return res.json();
            } 
            else
            {
                return res.text();
            }
            
        })
        .then((out) => {
            console.log(out);
            _this.loadLast();
        })
        .catch(err => console.error(err));
    }
}





