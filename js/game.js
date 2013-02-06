drone = {
    first:true,
    left0:0,
    right0:0,
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

    setTimeout(nextPosition,40);
}

function start(root) {

    function moveDrone() {
        var droneNode = root.find(".drone");

        drone.left0 = droneNode.position().left;
        drone.top0 = droneNode.position().top;
        drone.first = false;

        setTimeout(nextPosition,200);
    }

    root.css({margin:0});
    root.append("<img class='earth'> ").append("<img class='devoxx'>").append("<img class='drone'>");
    root.find(".earth").css({position:"fixed", height:"100%"}).attr("src","img/earth.png");
    root.find(".devoxx").css({position:"fixed", height:"100%",opacity:0}).attr("src","img/bg.jpg");
    root.find(".drone").css({position:"fixed", top: 380, left: 120, zIndex:3}).attr("src","img/heli1.png");

    moveDrone();
}