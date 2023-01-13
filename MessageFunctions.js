function MessageFunctions()
{
    const _this=this;
    this.DataHolder = null;
    this.set=function(dataHolder)
    {
        this.DataHolder = dataHolder;
    }
    this.message=function(txt)
    {
        _this.DataHolder.messageBox.innerHTML = txt;
    }
    this.trySend=function()
    {
        if(_this.DataHolder.activeVoivodeship !== undefined && _this.DataHolder.activeCity !== undefined && _this.DataHolder.inputStreet.value.length > 0)
        {
            _this.message("");
            _this.Fetches.send();
        }
        else
        {
            if(_this.DataHolder.activeVoivodeship === undefined && _this.DataHolder.inputStreet.value.length === 0)
            {
                _this.message("Wybierz województwo, miasto, oraz wpisz ulicę");
            }
            else if(_this.DataHolder.activeCity === undefined && _this.DataHolder.inputStreet.value.length === 0)
            {
                _this.message("Wybierz miasto, oraz wpisz ulicę");
            }
            else if(_this.DataHolder.activeVoivodeship === undefined && _this.DataHolder.inputStreet.value.length > 0)
            {
                _this.message("Wybierz województwo oraz miasto");
            }
            else if(_this.DataHolder.activeCity === undefined && _this.DataHolder.inputStreet.value.length > 0)
            {
                _this.message("Wybierz miasto");
            }
            else if(_this.DataHolder.activeCity !== undefined && _this.DataHolder.inputStreet.value.length === 0)
            {
                _this.message("Podaj ulicę");
            }
        }
    }
}






