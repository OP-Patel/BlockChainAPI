$("#viewMore").css("font-family", "Playfair Display, serif");
$("#viewMore").on("click", function(){
    $("#viewMore").css("visibility","hidden");
    $(".hidden").removeClass("hidden");
    $("#viewLess").removeClass("hidden");
});

$("#viewLess").css("font-family", "Playfair Display, serif");
$("#viewLess").on("click", function(){
    $("#viewMore").css("visibility","visible");
    $(".ex").addClass("hidden");
    $("#viewLess").addClass("hidden");
});

$("#footerRef").on("click", function(){
    $("#token").addClass("redBorder");
    setTimeout( function() { changeBack(); }, 800);
});

function changeBack(){
    $("#token").removeClass("redBorder");
}

