/**
 * jquery.advanced_hint plugin
 * @autor sergasd
 *
 * */


(function($){
'use strict';

/**
 * @constructor AdvancedHint
 * @param {Object} options
 * */
var AdvancedHint = function(options){
    this.options = options;
    this.init();
},
_hintIndex = 1;

AdvancedHint.prototype = {

    /**
     * @method init
     * initialize hint object
     * */
    init : function(){
        var o = this.options;

        if(o.auto_create)
        {
            this.autoCreate();
        }

        if(o.auto_style)
        {
            this.autoStyle();
        }

        this.bindEvents();

        this.show();
    },

    /**
     * @method bindEvents
     * create events for plugin elements
     * */
    bindEvents : function(){
        var that = this, o = this.options;

        o.hint_element.bind('click', function(){
            that.hide();
            o.input_element.focus();
        });

        o.input_element.bind('blur', function(){
            that.show();
        });

        o.input_element.bind('focus', function(){
            that.hide();
        });

        $.each(o.states, function(state, config){
            var event = config.event || 'click',
                callback = config.callback || function(){return true};

            $(config.selector).bind(event, {'state' : state, 'callback' : callback}, function(e){
                if(callback())
                {
                    that.changeState(e.data.state);
                    that.show();
                }
            });
        });
    },

    /**
     * @method autoCreate
     * creating hint dom element
     * */
    autoCreate : function(){
        var o = this.options;
        o.hint_element = $('<div class="' + o.hint_class + '" id="advanced_hint' + _hintIndex++ + '" ></div>').insertAfter(o.input_element);
    },

    /**
     * @method autoStyle
     * applying default styles for hint element
     * */
    autoStyle : function(){
        var o = this.options,
            offset = o.input_element.position();

        o.hint_element.css({
            'width'  : o.input_element.css('width'),
            'height' : o.input_element.css('height'),
            'paddingTop' : o.input_element.css('paddingTop'),
            'paddingBottom' : o.input_element.css('paddingBottom'),
            'paddingLeft' : o.input_element.css('paddingLeft'),
            'paddingRight' : o.input_element.css('paddingRight'),
            'border' : '1px transparent solid',
            'position' : 'absolute',
            'left' : offset.left,
            'top' : offset.top,
            'z-index' : '1',
            'display' : 'none'
        });
    },

    /**
     * @method setHint
     * setting hint for current state
     * */
    setHint : function(){
        var o = this.options,
            state = o.current_state,
            html = o.states[state].hint_text;

        o.hint_element.html(html);

        //rebind span event
        o.hint_element.find('span').bind('click', function(){
            $(o.input_element).val($(this).text());
        });

    },

    /**
     * @method changeState
     * changing current state
     * @param {String} state
     * */
    changeState : function(state){
        this.options.current_state = state;
    },

    /**
     * @method show
     * showing hint
     * */
    show : function(){
        if(this.options.input_element.val() == '')
        {
            var showFunction = this.options.show_callback || function(el){ el.fadeIn(); };

            this.setHint();

            showFunction(this.options.hint_element);
        }
    },

    /**
     * @method hide
     * hiding hint
     * */
    hide : function(){
        var hideFunction = this.options.hide_callback || function(el){ el.fadeOut(20); };
        hideFunction(this.options.hint_element);
    }
};

/**
 * main plugin code
 * */
$.fn.advancedHint = function(settings){
    var options;

    //simple
    if(typeof settings === 'string')
    {
        settings = {
            default_state : 'one',
            states: {
                'one' : {hint_text : settings}
            }
        };
    }

    //custom
    options = $.extend({
        input_element: null,
        hint_element : null,
        // hint class, which related with input field
        hint_class : 'advanced_hint',
        //default hint state, this value must be exists in "states"
        default_state : 'default',
        //allow auto creating hint element, you can set this to false,
        // then you must create hint element and  locate his after input
        auto_create : true,
        //allow auto applying default css styles for hint
        auto_style : true,
        //config the elements, which can change this hint state
        states : {
            'default' : {
                selector : '#default',
                event : 'click',
                hint_text : 'default',
                callback : null
            }
        },
        //current hint state
        current_state : 'default',
        //show callback function
        show_callback : null,
        //hide callback function
        hide_callback : null
    }, settings);





    return this.each(function(){
        options.input_element = $(this);
        options.current_state = options.default_state;
        new AdvancedHint(options);
    });
};

})(jQuery);