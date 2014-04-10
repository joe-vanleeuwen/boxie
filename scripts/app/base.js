define(['app/make_svg'], function (makeSVG) {

    function pos (pos) {
        return [pos[0] * 50, pos[1] * 50];
    }

    return function (x, y) {
        var base = {};
        base.pos = [x, y];

        base.box = $('<div class="box-container" style="left: '+pos(base.pos)[0]+'px; top:'+pos(base.pos)[1]+'px"></div>');
        base.box.append(makeSVG('svg', {class: 'box'}));
        base.box.children().append(makeSVG('rect', {x: '0', y: '0', width: '45', height: '45', fill: '#FFF'}));
        base.box.children().append(makeSVG('rect', {x: '8', y: '8', width: '29', height: '29', fill: '#8FDA8F'}));

        return base;
    }
})