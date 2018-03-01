$(document).ready(function() {
    var mylist = [];

    $("ul.searchItemList > li").each(function () {
        mylist.push({
            "data": $(this).attr("url"),
            "value": $(this).text()
        });
    });

    $('#autocomplete').autocomplete({
        lookup: mylist,
        lookupLimit:5,
        showNoSuggestionNotice: "Not Found.",
        onSelect: function (suggestion) {
            window.location.href = suggestion.data;}
    });	

    $(".searchBtn").on("click", function(){
        var inputValue=$("#autocomplete").val();
        window.location.href = $(this).attr("url")+"?search="+inputValue;
    });

    $('input#autocomplete').keypress(function (e) {
        if (e.which == 13) {
            if (this.value.length >= 4) {
                var inputValue=$(this).val();
                window.location.href = $(".searchBtn").attr("url")+"?search="+inputValue;
            }
        }
    });
});