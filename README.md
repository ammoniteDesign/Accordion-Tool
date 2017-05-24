# Accordion-Tool
A lightweight jQuery accordion that can be used across multiple JavaScript frameworks.

##Basic Set Up
The plugin should be called via jQuery as a method on a DOM element or collection of DOM elements. 

The HTML:
'''
<element>
	<button class="js-accBtn">Button</button>
	<content class="js-accContent">
		<div>
			CONTENT HERE
		</div>
	</content>
</element>
'''
Notice the blank div around the content. I purposefully did not have the plug in create it because I assume that you want as much control as possible over your own HTML/CSS. Please note that if all the content is floated inside that <div> the accordion will break; please use your own float fixes to ensure this div has a height.

The buttons and content elements can be set up however you like. Such as:
'''
<element>
	<button class="js-accBtn">Button</button>
	<button class="js-accBtn">Button</button>
	<button class="js-accBtn">Button</button>
	<content class="js-accContent">
		<div>
			CONTENT HERE
		</div>
	</content>
	<content class="js-accContent">
		<div>
			CONTENT HERE
		</div>
	</content>
	<non-accordion element></non-accordion element>
	<content class="js-accContent">
		<div>
			CONTENT HERE
		</div>
	</content>
</element>
'''

The plug-in finds all DOM nodes within the passed element with the classes so only the order matters when setting the accordion up.



##Settings
If you need to rename the classes the plug-in looks for you can pass an object to the method
'''
$('yourElement').accordionTool({
   triggerClass: "js-accButtonCustom",
   contentClass: "js-accContentCustom",
   extraTriggerClass: "js-accSecondaryButtonCustom",
});
'''

###Extra Triggers
In case you need to have two triggers for your accordion, pass in a class name via the settings object. 

##Nested Accordions
You cannot nest the accordions without renaming the classes. 


##Events
There are two event triggers: "beforeToggle" and "afterToggle". You can call them via jQuery.
Example: 
'''
$('yourElement').on('beforeToggle', function (event, targetIndex, trigger, content) {
	Code here.
});
'''

Please contact me with any issues or bugs, thanks!