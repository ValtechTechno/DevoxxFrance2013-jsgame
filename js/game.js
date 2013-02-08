var timerPosition;

drone = {
    first:true,
    left0:0,
    right0:0,
    power:0,
    direction:"",
    move:function() {
        var droneNode = $(".drone");

        var rand = 3;
        var func, func2;
        function add(a1,a2) {
            return a1+a2;
        }
        function sub(a1,a2) {
            return a1-a2;
        }

        if (drone.direction === "back") {
            func = sub;
            func2 = add;
        } else {
            func = add;
            func2 = sub;
        }

        if (Math.abs(drone.left0 - func(droneNode.position().left,rand)) > 100) {
            drone.direction = drone.direction === "back" ? "":"back";
            func = func2;
        }
        droneNode.css("left",func(droneNode.position().left,rand));
    }
};

function nextPosition() {
    drone.move();
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
    root.find(".earth").css({position:"fixed", height:"100%"}).attr("src","img/earth.png");
    root.find(".devoxx").css({position:"fixed", height:"100%",opacity:0}).attr("src","img/bg.jpg");
    root.find(".drone").css({position:"fixed", top: 380, left: 120, zIndex:3}).attr("src","img/heli1.png");

    initDrone();

    root.keydown(function (e) {
        switch (String.fromCharCode(e.which)) {
            case "I":
                drone.power = 1;
                break;
            default:
                console.log(String.fromCharCode(e.witch));
                break;
        }
    });
}