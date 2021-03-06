describe ("When the game has not started", function () {
    describe("Init the game", function () {
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
            expect(earth).toHaveCss({position:'fixed', height: "1800px", bottom: "0px"});
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
            expect(devoxx).toHaveCss({position:'fixed', opacity:'0', width: "6000px"});
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

        it ("if the drone has direction back, it has to keep it on the next run", function () {

            setFixtures(sandbox());

            var s = "#sandbox";
            start($(s));

            drone.direction = "back";
            var droneNode = $(s).find(".drone");

            var previousLeft = droneNode.position().left;

            nextPosition();

            expect(droneNode.position().left).toBeLessThan(previousLeft);
            expect(drone.direction).toBe("back");
        });

        it ("if the drone has direction back, and gone to max, it has to come back", function () {

            setFixtures(sandbox());

            var s = "#sandbox";
            start($(s));

            var left0 = drone.left0;
            drone.direction = "back";
            var droneNode = $(s).find(".drone");

            droneNode.css("left",left0-99);
            var previousLeft = droneNode.position().left;

            nextPosition();

            expect(droneNode.position().left).toBeGreaterThan(previousLeft);
            expect(drone.direction).toBe("");
        });

        describe("When loading the page, the nextPosition should be called, all over the time", function() {
            var timerCallBack, functionNextPosition;
            beforeEach(function () {
                timerCallBack = jasmine.createSpy("timerCallBack");
                jasmine.Clock.useMock();

                functionNextPosition = nextPosition;

                nextPosition = function leakFunctionToOverrideTheRealOne() {
                    timerCallBack();
                }
            });

            it ("interval is set", function () {

                expect(timerCallBack).not.toHaveBeenCalled();

                var previousTimer = timerPosition;
                run();

                jasmine.Clock.tick(81);

                expect(timerPosition).not.toBe(previousTimer);

                expect(timerCallBack).toHaveBeenCalled();

                expect(timerCallBack.callCount).toBe(2);
            });

            afterEach(function restoreFunctionForOthers() {
                nextPosition = functionNextPosition;
            });
        })
    });
});

describe ("Start the game", function() {
    it ("On keypress I, the drone has power increase", function () {
        setFixtures(sandbox());
        var $sandbox = $("#sandbox");

        start($sandbox);

        var keydown = $.Event("keydown");
        keydown.which = "I".charCodeAt(0);
        $sandbox.trigger(keydown);

        expect(drone.power).toBeGreaterThan(0);
    });

    it ("The drone doesn't move anymore right or left but the earth begin to get smaller and go down, ", function () {

        setFixtures(sandbox());
        var timerCallBack = jasmine.createSpy("timerCallBack");
        jasmine.Clock.useMock();

        functionNextPosition = nextPosition;

        nextPosition = function leakFunctionToOverrideTheRealOne() {
            timerCallBack();
            functionNextPosition();
        };

        drone.power = 1;
        start($("#sandbox"));
        var $drone = $(".drone");
        var previousPos = $drone.css("left");
        var $earth = $(".earth");
        var $devoxx = $(".devoxx");
        var previousHeight = $earth.height();
        var devoxxPreviousCss = $devoxx.css(["opacity","width"]);

        jasmine.Clock.tick(81);

        expect($earth).toHaveCss({bottom:"-6px"});
        expect($earth.height()).toBeLessThan(previousHeight);
        expect($devoxx.css("opacity")).toBeGreaterThan(devoxxPreviousCss.opacity);
        expect($devoxx.css("width")).toBeLessThan(devoxxPreviousCss.width);
        expect($drone.css("left")).toBe(previousPos);


        nextPosition = functionNextPosition;
    });

    it ("and a little time after that, the earth is removed, no more need to handle this, too little to display", function () {
        setFixtures(sandbox());
        var timerCallBack = jasmine.createSpy("timerCallBack");
        jasmine.Clock.useMock();

        functionNextPosition = nextPosition;

        nextPosition = function leakFunctionToOverrideTheRealOne() {
            timerCallBack();
            functionNextPosition();
        };

        drone.power = 1;
        start($("#sandbox"));

        jasmine.Clock.tick(8100);

        expect($("#sandbox").find(".earth").length).toBe(0);

        jasmine.Clock.tick(8100);

        expect($("#sandbox").find(".devoxx")).toHaveCss({width:"1510px",bottom:"0px"});

        nextPosition = functionNextPosition;
    });
});