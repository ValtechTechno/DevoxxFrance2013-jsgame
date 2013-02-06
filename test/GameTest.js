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



    describe ("the ship is moving from each side a max of 100px on right and left around it's original point", function () {

        it ("the first position is saved", function () {

            setFixtures(sandbox());

            var s = "#sandbox";
            start($(s));

            expect(drone.first).toBeFalsy();
            expect(drone.left0).toBeGreaterThan(0);
            expect(drone.top0).toBeGreaterThan(0);
        });

        it ("the next position has moved from 10px from the first position", function () {

            setFixtures(sandbox());

            var s = "#sandbox";
            start($(s));

            var left0 = drone.left0;

            nextPosition();

            var droneNode = $(s).find(".drone");
            var newLeft = Math.abs(droneNode.position().left-left0);
            expect(newLeft).toBeGreaterThan(1);
            expect(newLeft).toBeLessThan(11);
        });

        it ("if the drone come to the max on one side, the next move must be in the other way", function () {

            setFixtures(sandbox());

            var s = "#sandbox";
            start($(s));

            var left0 = drone.left0;
            var droneNode = $(s).find(".drone");

            droneNode.css("left",left0+99);
            var previousLeft = droneNode.position().left;

            nextPosition();

            expect(droneNode.position().left).toBeLessThan(previousLeft);
            expect(drone.direction).toBe("back");
        });
    });
});