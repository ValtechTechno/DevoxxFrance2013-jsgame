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
});