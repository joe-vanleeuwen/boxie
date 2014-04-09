require.config({
    baseUrl: 'scripts/lib',
    paths: {
        'app': '../app'
    }
})

require(['jquery', 'underscore', 'app/boxie'], function ($, _, boxie) {
    // appends a boxie to the board
    $('#board').append(boxie(0, 0).box)
})