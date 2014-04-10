require.config({
    baseUrl: 'scripts/lib',
    paths: {
        'app': '../app'
    }
})

require(['jquery', 'underscore', 'app/boxie', 'app/block'], function ($, _, boxie, block) {
    // appends a boxie to the board
    $('#board').append(boxie(0,0).box)
    $('#board').append(block(0,1).box)
})