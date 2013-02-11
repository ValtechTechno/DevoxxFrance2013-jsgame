var timerPosition;

drone = {
    first:true,
    left0:0,
    right0:0,
    power:0,
    direction:""
};

function dronePosition() {
    function add(a1,a2) {
        return a1+a2;
    }
    function sub(a1,a2) {
        return a1-a2;
    }

    var func, func2;
    if (drone.direction === "back") {
        func = sub;
        func2 = add;
    } else {
        func = add;
        func2 = sub;
    }

    var droneNode = $(".drone");
    var rand = 3;
    if (Math.abs(drone.left0 - func(droneNode.position().left,rand)) > 100) {
        drone.direction = drone.direction === "back" ? "":"back";
        func = func2;
    }
    droneNode.css("left",func(droneNode.position().left,rand));
}

function csspx(node,prop) {
    return parseInt(node.css(prop).replace("px",""),10);
}

function reduceEarth() {
    var $earth = $(".earth");
    if ($earth.length !== 0) {
        $earth.css({bottom:csspx($earth,"bottom")-3, height:csspx($earth,"height")*0.99});
        if (csspx($earth,"height") < 400) {
            $earth.remove();
        }
    }
}

function dispalySpace() {
    var $space = $(".devoxx");
    var newWidth = csspx($space,"width")-10;
    if (newWidth > 1500) {
        $space.css("width",newWidth);
    }
    var opacity = parseFloat($space.css("opacity"));
    if (opacity < 1) {
        $space.css("opacity",opacity+0.01)
    }
}

function nextPosition() {
    if (drone.power > 0) {
        reduceEarth();
        dispalySpace();
        return;
    }
    dronePosition();
}

function run() {
    timerPosition = setInterval(nextPosition,40);
}

function start(root) {

    function initDrone() {
        var droneNode = root.find(".drone");

        drone.left0 = droneNode.position().left;
        drone.top0 = droneNode.position().top;
        drone.first = false;

        run();
    }

    root.css({margin:0});
    root.append("<img class='earth'> ").append("<img class='devoxx'>").append("<img class='drone'>");
    root.find(".earth").css({position:"fixed", height:1800, bottom:0}).attr("src","img/earth.png");
    root.find(".devoxx").css({position:"fixed",opacity:0, width: 6000, bottom:0}).attr("src","img/bg.jpg");
    root.find(".drone").css({position:"fixed", top: 380, left: 120, zIndex:3}).attr("src","img/heli1.png");

    initDrone();

    root.keydown(function (e) {
        switch (String.fromCharCode(e.which)) {
            case "I":
                drone.power = 1;
                break;
        }
    });
}