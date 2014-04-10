define(['underscore'], function (_) {
    var board = {};

    board.spaces = _.map(_.range(8), function () {
        return _.map(_.range(8), function (val) { return 'nothin'; })
    })

    return board
})