describe ("When the game has not started", function () {
    it ("the earth is displayed", function () {

        setFixtures(sandbox());

        var s = "#sandbox";

        start($(s));
        expect($(s)).toExist();
        expect($(s)).toHaveCss({margin:"0px"});

        var earth = $(s).find(".earth");
        expect(earth).toExist();
        expect(earth).toBe("img");
        expect(earth).toBeVisible();
        expect(earth).toHaveCss({position:'fixed'});
        expect(earth).toHaveAttr("src","img/earth.png");

    });

    it ("devoxx is hidden", function () {

        setFixtures(sandbox());

        var s = "#sandbox";

        start($(s));
        expect($(s)).toExist();
        expect($(s)).toHaveCss({margin:"0px"});

        var devoxx = $(s).find(".devoxx");
        expect(devoxx).toExist();
        expect(devoxx).toBe("img");
        expect(devoxx).toBeVisible();
        expect(devoxx).toHaveCss({position:'fixed', opacity:'0'});
        expect(devoxx).toHaveAttr("src","img/bg.jpg");
    });

    it ("the ship is simply over the earth and waiting for start",function () {

        setFixtures(sandbox());

        var s = "#sandbox";

        start($(s));
        expect($(s)).toExist();
        expect($(s)).toHaveCss({margin:"0px"});

        var drone = $(s).find(".drone");
        expect(drone).toExist();
        expect(drone).toBe("img");
        expect(drone).toHaveCss({position:'fixed'});
        expect(drone).toHaveCss({top:'380px'});
        expect(drone).toHaveCss({left:'120px'});
        expect(drone).toHaveAttr("src","img/heli1.png");
    });
});