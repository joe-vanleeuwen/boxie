define(['app/make_svg'], function (makeSVG) {

    function Base (pos) {
        // type
       this.type = 'base';
        // postiion
       this.pos = pos;

       this.box = $('<div class="box-container" style="left: '+this.posCalc(0)+'px; top:'+this.posCalc(1)+'px"></div>');
       this.box.append(makeSVG('svg', {class: 'box'}));
       this.box.children().append(makeSVG('rect', {x: '0', y: '0', width: '45', height: '45', fill: '#FFF'}));
       this.box.children().append(makeSVG('rect', {x: '8', y: '8', width: '29', height: '29', fill: '#8FDA8F'}));
    }

    Base.prototype.posCalc = function (xy) {
        return this.pos[xy] * 50;
    }

    return function (pos) {
        return new Base(pos);
    }

})