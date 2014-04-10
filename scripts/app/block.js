define(['app/make_svg'], function (makeSVG) {

    function pos (pos) {
        return [pos[0] * 50, pos[1] * 50];
    }

    return function (x, y) {
        var block = {};
        // block position
        block.pos = [x, y];

        block.box = $('<div class="box-container" style="left: '+pos(block.pos)[0]+'px; top:'+pos(block.pos)[1]+'px"></div>');
        block.box.append(makeSVG('svg', {class: 'box'}));
        // append r rect elements in positions base on xy array
        var xy = [['0','0'],['25','0'],['0','25'],['25','25']];
        for (var i = 0; i < 4; i++) {
            block.box.children().append(makeSVG('rect', {x: xy[i][0], y: xy[i][1], width: '20', height: '20', fill: '#FFF'}));
        }

        return block;
    }
})