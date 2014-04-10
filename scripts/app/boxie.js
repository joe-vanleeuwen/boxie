// making a boxie
define(['jquery', 'underscore', 'app/make_svg'], function ($, _, makeSVG) {

    function pos (pos) {
        return [pos[0] * 50, pos[1] * 50];
    }

    function boxie (x, y) {
        var boxie = {};

        boxie.pos = [x, y];
        // special fill for inner arrows
        var fill = '#8FDA8F';

        // box property will be used to move boxie around the board
        boxie.box = $('<div class="box-container" style="left: '+pos(boxie.pos)[0]+'px; top:'+pos(boxie.pos)[1]+'px"></div>');
        boxie.box.append(makeSVG('svg', {class: 'box', width:'45', height:'45'}));
        boxie.box.children().append(makeSVG('g', {transform: 'translate(0, 0)', fill: '#FFF'}));

        // wrapping with jquery so that I can easily add click events
        boxie.up    = $(makeSVG('g', {transform: 'translate(2.5,  0)'}));
        boxie.down  = $(makeSVG('g', {transform: 'translate(2.5, 45)'}));
        boxie.left  = $(makeSVG('g', {transform: 'translate(0,  2.5)'}));
        boxie.right = $(makeSVG('g', {transform: 'translate(45, 2.5)'}));

        // appending big white and small green arrows to each g element (up, down, left, right)
        boxie.up.append(makeSVG(   'path', {d: 'M0 0  h40 l-20 20 z'}), makeSVG('path', {d: 'M12.5 9  h15 l-7.5 -7 z', fill: fill}));
        boxie.down.append(makeSVG( 'path', {d: 'M0 0 h40 l-20 -20 z'}), makeSVG('path', {d: 'M12.5 -9  h15 l-7.5 7 z', fill: fill}));
        boxie.left.append(makeSVG( 'path', {d: 'M0 0  v40 l20 -20 z'}), makeSVG('path', {d: 'M9 12.5  v15 l-7.5 -7 z', fill: fill}));
        boxie.right.append(makeSVG('path', {d: 'M0 0 v40 l-20 -20 z'}), makeSVG('path', {d: 'M-9 12.5  v15 l7.5 -7 z', fill: fill}));

        // appending all for parts to box
        boxie.box.children().children().append(boxie.up, boxie.down, boxie.left, boxie.right);

        return boxie;
    }

    // potential click stuff but most likely will be moved somewhere else. It will be much different
    function clickie (boxie) {
        boxie.up.on('click', function () {
            // var top = +boxie.box.css('top').slice(0, -2)
            // console.log(top)
            boxie.box.css('top', (boxie.pos[1] * 50) - 100);
        })
        return boxie;
    }

    // return a function for making a boxie and placing it at x, y coordinates
    return function (x, y) {
        return clickie(boxie(x, y));
    }
})
