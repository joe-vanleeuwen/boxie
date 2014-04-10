// making a boxie
define(['jquery', 'underscore', 'app/make_svg', 'app/board'], function ($, _, makeSVG, board) {

    function Boxie (pos) {
        // type
        this.type = 'boxie';
        // position
        this.pos = pos;
        // special fill for inner arrows
        var fill = '#8FDA8F';

        // box property will be used to move boxie around the board
        this.box = $('<div class="box-container boxie" style="left: '+this.posCalc(0)+'px; top:'+this.posCalc(1)+'px"></div>');
        this.box.append(makeSVG('svg', {class: 'box', width:'45', height:'45'}));
        this.box.children().append(makeSVG('g', {transform: 'translate(0, 0)', fill: '#FFF'}));

        // wrapping with jquery so that I can easily add click events
        this.up    = $(makeSVG('g', {transform: 'translate(2.5,  0)'}));
        this.down  = $(makeSVG('g', {transform: 'translate(2.5, 45)'}));
        this.left  = $(makeSVG('g', {transform: 'translate(0,  2.5)'}));
        this.right = $(makeSVG('g', {transform: 'translate(45, 2.5)'}));

        // appending big white and small green arrows to each g element (up, down, left, right)
        this.up.append(makeSVG(   'path', {d: 'M0 0  h40 l-20 20 z'}), makeSVG('path', {d: 'M12.5 9  h15 l-7.5 -7 z', fill: fill}));
        this.down.append(makeSVG( 'path', {d: 'M0 0 h40 l-20 -20 z'}), makeSVG('path', {d: 'M12.5 -9  h15 l-7.5 7 z', fill: fill}));
        this.left.append(makeSVG( 'path', {d: 'M0 0  v40 l20 -20 z'}), makeSVG('path', {d: 'M9 12.5  v15 l-7.5 -7 z', fill: fill}));
        this.right.append(makeSVG('path', {d: 'M0 0 v40 l-20 -20 z'}), makeSVG('path', {d: 'M-9 12.5  v15 l7.5 -7 z', fill: fill}));

        // appending all four parts to box
        this.box.children().children().append(this.up, this.down, this.left, this.right);
    }

    Boxie.prototype.posCalc = function (xy) {
        return this.pos[xy] * 50;
    }

    Boxie.prototype.posChange = function (newPos) {
        this.pos = newPos;
        return this;
    }

    // potential click stuff but most likely will be moved somewhere else. It will be much different
    Boxie.prototype.clickie = function (directions) {
        var that = this;
        // mapping the side and change values base on direction
        var map = { up: {side: 'top', change: -1}, down: {side: 'top', change: 1}, left: {side: 'left', change: -1}, right: {side: 'left', change: 1} }
        // for each direction, add click event
        _.each(directions, function (dir) {
            that[dir].on('click', function () {
                that.box.css(map[dir].side, that.findie(dir, board, map));
            })
        })
        return this;
    }

    // determine distance for boxie to travel
    Boxie.prototype.findie = function (dir, board, map) {
        var that = this;
        // c stands for constant -> the dir is either horizontal (x, therefore c === 0) or vertical (y, therefore c === 1) meaning one will remain constant while the other changes
        var c = dir === 'up' || dir === 'down' ? 0 : 1;
        // xy will return an x or y index value to a matrix[][] assuming matrix[x][y]. xy takes to args. xOrY assumes 0 or 1; 0 for x, 1 for y (definining the intended matrix[x?][y?]). i assumes the current value of i in a loop. If c === xOrY, return this boxie's constant orthoganl (it's either the x or y value of boxie's position), otherwise return i (the changing orthogonal);
        // more simply, xy will return the constant orthogonal value or the changing orthogonal value depending on which orthogonal is requested (x or y), and if that orthogonal is the constant or not.
        function xy (xOrY, i) {
            return c === xOrY ? that.pos[c] : i;
        }
        // c (constant) is either 0 or 1. So, 1-c will produce the opposite value of c, 0 if c is 1, 1 if c is 0 (stolen from stackoverflow: http://stackoverflow.com/questions/7978575/change-a-value-from-0-1-or-1-0-with-only-mathematic-operations)
        var i = this.pos[1-c] + map[dir].change;
        var box;
        // loop over the board in the prescribe dir from this boxie's position
        while(board.spaces[xy(0,i)] && (box = board.spaces[xy(0,i)][xy(1,i)])) {
            // if box is a base, move boxie onto base
            if (box.type === 'base') return Boxie.prototype.posCalc.call(box, [1-c]);
            // if box is a block, move boxie next to block
            if (box.type === 'block') return Boxie.prototype.posCalc.call(box, [1-c]) - map[dir].change*50;
            // iterate in the dir
            i += map[dir].change;
        }
        return map[dir].change > 0 ? 400 : -50;
    }

    // return a function for making a boxie and placing it at x, y coordinates
    return function (x, y) {
        return new Boxie(x,y).clickie(['up', 'down', 'left', 'right']);
    }
})


