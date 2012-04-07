/**
 * jquery.swaptext plugin
 * @autor sergasd
 *
 * Swaps the text blocks. Used to click "more".
 * */


(function($){

'use strict';

    $.fn.swaptext = function(settings){

        var options = $.extend({
            'expandedClass'       : 'expanded',
            'collapsedClass'      : 'collapsed',
            'firstTextClass'      : '.small-text',
            'secondTextClass'     : '.full-text',
            'expandedButtonText'  : 'more...',
            'collapsedButtonText' : 'short...'
        },settings);


        return this.each(function(){
            $(this).bind('click', function(e){
                e.preventDefault();

                var el = $(this),
                    state = $(this).hasClass(options.expandedClass) ? options.expandedClass : options.collapsedClass;

                if(state === options.expandedClass)
                {
                    el.prevAll(options.firstTextClass).show();
                    el.prevAll(options.secondTextClass).hide();
                    el.addClass(options.collapsedClass).removeClass(options.expandedClass);
                    el.text(options.expandedButtonText);
                }
                else if(state === options.collapsedClass)
                {
                    el.prevAll(options.firstTextClass).hide();
                    el.prevAll(options.secondTextClass).show();
                    el.addClass(options.expandedClass).removeClass(options.collapsedClass);
                    el.text(options.collapsedButtonText);
                }

            });
        });

    };

})(jQuery);