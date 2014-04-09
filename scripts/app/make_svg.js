// stolen from stack overflow: http://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
// appending SVG's does not work out of the box. SVG elements are not recognized by the innnerHTML parser. So, the must be recorded as elements.
define(function () {
    return function (tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs)
            el.setAttribute(k, attrs[k]);
        return el;
    }
})