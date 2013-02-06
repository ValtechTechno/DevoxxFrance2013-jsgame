function start(root) {
    root.css({margin:0});
    root.append("<img class='earth'> ");
    root.find(".earth").css({position:"fixed", height:"100%"}).attr("src","img/earth.png");
}