define(['app/make_svg'], function (makeSVG) {

    function Block (pos) {
        // type
        this.type = 'block';
        // block position
        this.pos = pos;

        this.box = $('<div class="box-container" style="left: '+this.posCalc(0)+'px; top:'+this.posCalc(1)+'px"></div>');
        this.box.append(makeSVG('svg', {class: 'box'}));
        // append r rect elements in positions base on xy array
        var xy = [['0','0'],['25','0'],['0','25'],['25','25']];
        for (var i = 0; i < 4; i++) {
            this.box.children().append(makeSVG('rect', {x: xy[i][0], y: xy[i][1], width: '20', height: '20', fill: '#FFF'}));
        }
    }

    Block.prototype.posCalc = function (xy) {
        return this.pos[xy] * 50;
    }

    return function (pos) {
        return new Block(pos);
    }
})