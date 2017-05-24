// Accordion Tool
(function (factory) {

    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}
    (function ($) {
        'use strict';
        var accordionTool = window.accordionTool || {};

        accordionTool = (function() {	
            function accordionTool(element, settings){
            var _ = this;

            //Class Names
            _.classNames = $.extend({
                triggerClass: "js-accBtn",
                contentClass: "js-accContent",
				extraTriggerClass: ''
            }, settings);

            //Nodes and Defaults
            _.$element = $(element);
            _.$triggers = null;
            _.$content = null;
            _.$extraTriggers = null;
            _.hasExtraTriggers = false;

            //Methods with listeners
            _.toggleAccordion = $.proxy(_.toggleAccordion, _);

            //Initalize
            _.init();
        }

        return accordionTool;

    }());


    //Public Methods
    accordionTool.prototype.init = function () {

        var _ = this;

        //Set Up Triggers
        _.$triggers = $(_.$element).find('.' + _.classNames.triggerClass);
        _.$triggers.each(function (index, element) {
            $(element).attr("data-index", index).on('click.accordionTool', _.toggleAccordion);
        });

        if (_.classNames.extraTriggerClass !== '') {
        	_.$extraTriggers = $(_.$element).find('.' + _.classNames.extraTriggerClass);
        	_.$extraTriggers.each(function (index, element) {
        		$(element).attr("data-index", index).on('click.accordionTool', _.toggleAccordion);
        	});
        	_.hasExtraTriggers = true;
        }

        //Grab Content Nodes
        _.$content = $(_.$element).find('.' + _.classNames.contentClass);

    };

    accordionTool.prototype.toggleAccordion = function (e) {

        //Gather the current variables
        var _ = this,
        targetIndex = $(e.delegateTarget).data('index'),
    	$targetContent = $(_.$content[targetIndex]),
		$targetTrigger = $(_.$triggers[targetIndex]),
        oldHeight = $targetContent.outerHeight(true),
        newHeight = (oldHeight <= 0) ? $targetContent.children().outerHeight(true) : 0;

        //Trigger beforeToggle
        _.$element.trigger('beforeToggle', [targetIndex, _.$triggers[targetIndex], _.$content[targetIndex]]);

        //Animate Height
        $targetContent.css({ 'height': (oldHeight + 'px'), 'position': 'relative', 'overflow': 'hidden' }).animate({
            height: newHeight
        }, 250, function () {
        	$targetContent.removeAttr('style');
        	_.$element.trigger('afterToggle', [targetIndex, _.$triggers[targetIndex], _.$content[targetIndex]]);
        });

        //Toggle Active Classes
        $targetContent.toggleClass('active');
        $targetTrigger.toggleClass('active');
        if (_.hasExtraTriggers) {
        	$(_.$extraTriggers[targetIndex]).toggleClass('active');
        }

    };

    $.fn.accordionTool = function() {

        //Puts into jQuery Namespace
        var _ = this, opt = arguments[0], args = Array.prototype.slice.call(arguments, 1), l = _.length, i = 0, ret;

        for(i; i < l; i++) {
            if (typeof opt === 'object' || typeof opt === 'undefined') {
                _[i].accordionTool = new accordionTool(_[i], opt);
            } else {
                ret = _[i].accordionTool[opt].apply(_[i].accordionTool, args);
            }

            if (typeof ret !== 'undefined') return ret;
        }

        return _;

    };

}));
	
