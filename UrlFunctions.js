function UrlFunctions()
{
    const _this=this;
    this.FormFunctions = null;
    this.DataHolder = null;
    this.set=function(formFunctions,dataHolder)
    {
        this.FormFunctions = formFunctions;
        this.DataHolder = dataHolder;
    }
    this.getUrl=function()
    {
        _this.DataHolder.url = new URL(window.location.href);
        const entry = _this.DataHolder.url.searchParams.get('entryId');
        if(entry !== null && !_this.DataHolder.gotUrl)
        {
            _this.FormFunctions.fillFormByEntry();
            _this.DataHolder.gotUrl = true;
        }
    }
}






