var images;
var timer = 0;

function leftArrow(images){
    clearInterval(photos_interval);
    for(img in images){
        if(document.getElementById("photo").style.backgroundImage === "url(\""+images[img].src+"\")"){
            if(img === "image1"){
                document.getElementById("photo").style.backgroundImage = "url(\""+images["image5"].src+"\")";
                timer = parseInt(images["image5"].timer);
                break;                
            }else if(img === "image2"){
                document.getElementById("photo").style.backgroundImage = "url(\""+images["image1"].src+"\")";
                timer = parseInt(images["image1"].timer);
                break;
            }else if(img === "image3"){
                document.getElementById("photo").style.backgroundImage = "url(\""+images["image2"].src+"\")";
                timer = parseInt(images["image2"].timer);
                break;
            }else if(img === "image4"){
                document.getElementById("photo").style.backgroundImage = "url(\""+images["image3"].src+"\")";
                timer = parseInt(images["image3"].timer);
                break;
            }else if(img === "image5"){
                document.getElementById("photo").style.backgroundImage = "url(\""+images["image4"].src+"\")";
                timer = parseInt(images["image4"].timer);
                break;
            }
        }
    }
    setTimer(images);
    $("#photo").fadeIn();
}

function rightArrow(images){
    clearInterval(photos_interval);
    for(img in images){
        if(document.getElementById("photo").style.backgroundImage === "url(\""+images[img].src+"\")"){
            if(img === "image1"){
                document.getElementById("photo").style.backgroundImage = "url(\""+images["image2"].src+"\")";
                timer = parseInt(images["image2"].timer);
                break;                
            }else if(img === "image2"){
                document.getElementById("photo").style.backgroundImage = "url(\""+images["image3"].src+"\")";
                timer = parseInt(images["image3"].timer);
                break;
            }else if(img === "image3"){
                document.getElementById("photo").style.backgroundImage = "url(\""+images["image4"].src+"\")";
                timer = parseInt(images["image4"].timer);
                break;
            }else if(img === "image4"){
                document.getElementById("photo").style.backgroundImage = "url(\""+images["image5"].src+"\")";
                timer = parseInt(images["image5"].timer);
                break;
            }else if(img === "image5"){
                document.getElementById("photo").style.backgroundImage = "url(\""+images["image1"].src+"\")";
                timer = parseInt(images["image1"].timer);
                break;
            }
        }
    }
    setTimer(images);
    $("#photo").fadeIn();
}
function loadJson(){
    var request = new XMLHttpRequest();

    request.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            images = JSON.parse(request.responseText);
            buildHtml(images);
        }
    });

    request.open('GET','images.json');
    request.send();

}

function buildHtml(images){
    if(!document.getElementById("photo")){
        var photos = document.createElement("div");
        photos.id = "photo";

        document.getElementById("gallery").appendChild(photos);
        createBar();

        const keys = Object.keys(images);
        document.getElementById("photo").style.backgroundImage = "url("+images[keys[0]].src+")";
    }
    setTimer(images);
    animateBar(timer);
}

function setTimer(images){
    for(img in images){
        if(document.getElementById("photo").style.backgroundImage === "url(\""+images[img].src+"\")"){
            timer = parseInt(images[img].timer);
        }
    }

    photos_interval = setInterval(
        function(){
            $("#photo").fadeOut(500, function (){
                rightArrow(images);
                animateBar(timer);
            });
        },timer);
}

function animateBar(animateTimer){
    $("#bar").animate({width: "100%"}, animateTimer, function (){document.getElementById("bar").style.width = "0%";});
}

function createBar(){
    var progressBar = document.createElement("div");
    progressBar.id = "progressBar";
    var bar = document.createElement("div");
    bar.id = "bar";

    document.getElementById("gallery").appendChild(progressBar);
    document.getElementById("progressBar").appendChild(bar);
}

function setUpPage(){
    loadJson();

    $("#left").click(function(){
        $("#photo").fadeOut(500, function (){
            leftArrow(images);
            $("#progressBar").remove();
            createBar();
            animateBar(timer);
        });
      });

    $("#right").click(function(){
        $("#photo").fadeOut(500, function (){
            rightArrow(images);
            $("#progressBar").remove();
            createBar();
            animateBar(timer);
        });
      });

    $("#update").click(function(){
        clearInterval(photos_interval);
        $("#photo").remove();
        $("#progressBar").remove();
        buildHtml(images);
    });
    
}

window.addEventListener('load', setUpPage);

