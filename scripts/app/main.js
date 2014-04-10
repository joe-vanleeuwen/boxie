require.config({
    baseUrl: 'scripts/lib',
    paths: {
        'app': '../app'
    }
})

require(['jquery', 'underscore', 'app/boxie', 'app/block', 'app/base', 'app/board'], function ($, _, boxie, block, base, board) {
    board.spaces[0][0] = boxie([0,0]);
    board.spaces[0][2] = block([0,2]);
    board.spaces[4][0] = block([4,0]);
    board.spaces[6][0] = boxie([6,0]);
    // appends a boxie to the board
    $('#board').append(board.spaces[0][0].box, board.spaces[0][2].box, board.spaces[6][0].box, board.spaces[4][0].box);

})