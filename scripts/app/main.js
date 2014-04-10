require.config({
    baseUrl: 'scripts/lib',
    paths: {
        'app': '../app'
    }
})

require(['jquery', 'underscore', 'app/boxie', 'app/block', 'app/base'], function ($, _, boxie, block, base) {
    // appends a boxie to the board
    $('#board').append(boxie(0,0).box).append(block(0,1).box).append(base(0,2).box);
})