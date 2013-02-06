function start(root) {

    function moveDrone() {
        var droneNode = root.find(".drone");

        drone.left0 = droneNode.position().left;
        drone.top0 = droneNode.position().top;
        drone.first = false;
    }

    root.css({margin:0});
    root.append("<img class='earth'> ").append("<img class='devoxx'>").append("<img class='drone'>");
    root.find(".earth").css({position:"fixed", height:"100%"}).attr("src","img/earth.png");
    root.find(".devoxx").css({position:"fixed", height:"100%",opacity:0}).attr("src","img/bg.jpg");
    root.find(".drone").css({position:"fixed", top: 380, left: 120, zIndex:3}).attr("src","img/heli1.png");


    moveDrone();
}