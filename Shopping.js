/* Shopping.js */

/*const celebesKalossiPrdDB = {name: "Celebes Kalossi", type: "Coffee", countryAndRegion: "Sulawesi, Indonesia", price: 16.75};*/

var productDatabase = [
    {
        type: "Coffee",
        productNumber: 0,
        name: "Celebes Kalossi0",
        countryAndRegion: "Sulawesi, Indonesia",
        flavorNotes: "Buttery, Earthy, Muted Fruit",
        priceText: "$16.75",
        price: 16.75,
        get: function(prdDBField) { return this[prdDBField]; }},
    {
        type: "Coffee",
        productNumber: 1,
        name: "Celebes Kalossi1",
        countryAndRegion: "Sulawesi, Indonesia",
        flavorNotes: "Buttery, Earthy, Muted Fruit",
        priceText: "$16.75",
        price: 16.75,
        get: function(prdDBField) { return this[prdDBField]; }},
    {
        type: "Coffee",
        productNumber: 2,
        name: "Celebes Kalossi2",
        countryAndRegion: "Sulawesi, Indonesia",
        flavorNotes: "Buttery, Earthy, Muted Fruit",
        priceText: "$16.75",
        price: 16.75,
        get: function(prdDBField) { return this[prdDBField]; }},
    {
        type: "Coffee",
        productNumber: 3,
        name: "Celebes Kalossi3",
        countryAndRegion: "Sulawesi, Indonesia",
        flavorNotes: "Buttery, Earthy, Muted Fruit",
        priceText: "$16.75",
        price: 16.75,
        get: function(prdDBField) { return this[prdDBField]; }}
];

var ShoppingCartDatabase = new DatabaseTwoDimensionalArray();
var ShoppingCart = new ShoppingCartIconArrowAndDropDownTopAndLeft();
var ShoppingCSSRules = new CSSRulesObject();

/* String function created for GetTextPixelWidth function. It uses empty span to determine pixel width of string. */
String.prototype.pixelWidth = function() {

    var stringSpan = document.getElementById("StringSpan");
    stringSpan.innerHTML = this;
    return stringSpan.offsetWidth; /* OffsetWidth contains pixel width of object. */
};

/* target.addEventListener(type, listener,[, useCapture]): Specified listener is register on event target, type is string representing event type to listen for, listener is object that implements event listener, useCapture is optional and indicates if all events of specified type will be dispatched to registered listener with false meaning no. */
function ConfigureAddEventListener(targetNameOrId, event, eventIE8, idFlag, eventFunction, argumentArray) {

    var target = null;

    /* If flag, target is Id, otherwise target is name such as window or document. */
    if (idFlag)
        target = document.getElementById(targetNameOrId);
    else target = targetNameOrId;

    /* If there are no explicit arguments, event listener is anonymous function with event function.apply in order to implement event as argument and event states as unknown number of arguments to event function. */
    if (argumentArray[0] === null) {

        target.addEventListener(event, function (e) {eventFunction.apply(null, e.state)}, false);
    }
    else { /* If there are arguments in array and IE recognizes addEventListener, anonymous function is called with event function.apply as argument and argument array as unknown number of arguments to event function. */

        if (target.addEventListener) {

            target.addEventListener(event, function () {eventFunction.apply(null, argumentArray)}, false);
        }
        else if (target.attachEvent) { /* Otherwise browser is IE8 and uses attachEvent for addEventListener. */

            target.attachEvent(eventIE8, function () {eventFunction.apply(null, argumentArray)}, false);
        }
    }
}

/* Set header width to quarter of Viewport. */
function SetHeaderWidth(headerId) {

    var header = document.getElementById(headerId);
    /* document.documentElement.clientWidth is Viewport.  */
    var headerWidth = Math.round(parseInt(document.documentElement.clientWidth) / 4);
    header.style.width = headerWidth.toString() + "px";
    var headerHeight =  Math.round(parseInt(document.documentElement.clientHeight));
    header.style.height = headerHeight.toString() + "px";
}

function GetComputedStyleIncludesBoxSizing() {

    var returnValue = false;

    var body = document.body;
    var div = document.createElement("div");
    body.appendChild(div);
    div.style.width = "10px";
    div.style.padding = "2px";
    div.style.border = "1px solid #dccc2b";

    var divWidth = window.getComputedStyle(div).width;
    if (divWidth === "10px")
        returnValue = true;

    body.removeChild(div);

    return returnValue;

}

/* Dynamically set menu width based on menu longest item character length and font size. */
function SetMenuWidth(menuId, menuItemClassName, navId) {

    var menuItemsTextArray = [];

    /* Get list items of menu.  Found all methods of returning HTMLCollection of elements included children list items. Class name eliminates children. */
    var menuItem = document.getElementById(menuId);
    var menuItems = menuItem.getElementsByTagName("li");

    /* Using class name create array of menu items (list elements) without menu's drop down items. */
    AddMenuItemsToArray(menuItems, menuItemsTextArray, menuItemClassName);

    /* Get longest menu item name by sorting menu items in menu items array with function subtracting length of second item from length of first item.  If b > a, sort b to lower index. If b < a, sort a to lower index.  If b == a, leave unchanged. */
    var longestMenuItemText = menuItemsTextArray.sort(function(a, b) {return b.length - a.length;})[0];

    /* Find longest menu item's element and <a> link. Since primitive data type variables pass by value to functions meaning any changes to value of variable will not be kept outside of function, used object as argument to function because items in object are passed by reference and retain value outside of function.  */
    var longestMenu = {item: null, itemLink: null};
    FindLongestMenuItemAndLink(menuItems, menuItemsTextArray, longestMenu);

    /* Set up longest menu item font information for <canvas> element which has  method that returns pixel length of string which will be used to determine width of menu. */
    var font = GetFont(longestMenu.item);

    /* Get link padding to be included in width. */
    var aLinkPaddingLeft = window.getComputedStyle(longestMenu.itemLink).paddingLeft;
    var aLinkPaddingRight = window.getComputedStyle(longestMenu.itemLink).paddingRight;

    /* Determine width of menu by adding text width of first link of first item of drop down menu to left padding of link. */
    var textPixelWidthInt = GetTextPixelWidth(longestMenuItemText, font);
    var menuWidthInt = textPixelWidthInt + parseInt(aLinkPaddingLeft) + parseInt(aLinkPaddingRight);
    menuItem.style.width = menuWidthInt.toString() + "px";

    /* Determine width of nav by adding each menus width to nav elements nav.style.width. If <nav> does have  width, get integer value and add menu width's integer value to <nav> width., otherwise set <nav> width to menu width. */
    var nav = document.getElementById(navId);
    if (!(isNaN(parseInt(nav.style.width)))) {

        var navWidthInt = parseInt(nav.style.width);
        navWidthInt += menuWidthInt;
    }
    else navWidthInt = menuWidthInt;
    nav.style.width = navWidthInt.toString() + "px";
}

/* Find menu items with menu's class name of and add their text content to menu items array.  Since text content of menu item with drop down menu includes text of items of drop down menu, if <li> has  <ul> (drop down menu), get text content from first child of <li>,  link. */
function AddMenuItemsToArray(menuItems, menuItemsTextArray, menuItemClassName) {

    for (var i = 0, j = 0; i < menuItems.length; i++) {

        if (menuItems[i].className == menuItemClassName) {

            if (menuItems[i].children[1])
                menuItemsTextArray[j++] = menuItems[i].children[0].textContent;
            else menuItemsTextArray[j++] = menuItems[i].textContent;
        }
    }
}

/* Match text of longest menu item with text content of one of menu item elements in order to find element of longest item and longest elements <a> link which is first child of longest item's <li> element.  */
function FindLongestMenuItemAndLink(menuItems, menuItemsTextArray, longestMenu) {

    for (var i = 0; i < menuItems.length; i++) {

        if (menuItemsTextArray[0] == menuItems[i].textContent) {

            longestMenu.item = menuItems[i];
            longestMenu.itemLink = menuItems[i].children[0];
        }
    }
}

/* Get font information that used in GetTextPixelWidth. */
function GetFont(object) {

    var fontWeight = window.getComputedStyle(object).fontWeight;
    var fontSize = window.getComputedStyle(object).fontSize;
    var fontFamily = window.getComputedStyle(object).fontFamily;
    return fontWeight + " " + fontSize + " " + fontFamily;
}

/* If not IE8, use measureText method of <canvas> element to get pixel width of text argument. Method uses font CSS info - weight, size and family. Function returns integer value of text pixel width. If IE, use empty <span> under <body> with Id and hidden with left -9999 with String created prototype of
 to get pixel width of text. */
function GetTextPixelWidth(text, font) {

    var textPixelWidthInt = 0;

    if (window.addEventListener) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        context.font = font;
        textPixelWidthInt = context.measureText(text).width;
    }
    else textPixelWidthInt = text.pixelWidth();

    return textPixelWidthInt;

}

/* Dynamically determine top and left positions of drop down menu and parent menu item's arrow and set positions by adding to CSS DOM. */
function SetDropDownMenuAndArrowTopAndLeft(menuId, selector, afterSelector, menuItemId, dropDownMenuItemId, dropDownMenuId, aLinkId) {

    /* Left position of drop down menu is parent menu width. */
    var menu = document.getElementById(menuId);
    var leftInt = parseInt(menu.style.width);
    var left = leftInt.toString() +"px";

    /* Get font weight, font size, and font family of menu item to be used in GetTextPixelWidth to determine menu item's arrow's left position and get line height and font size of both parent menu and it's first drop down menu item to center drop down menu item with parent menu item. */
    var menuItem = document.getElementById(menuItemId);
    var font = GetFont(menuItem);
    var menuItemLH = window.getComputedStyle(menuItem).lineHeight;
    var dropDownMenuItem = document.getElementById(dropDownMenuItemId);
    var dropDownMenuItemFS = window.getComputedStyle(dropDownMenuItem).fontSize;
    var dropDownMenuItemLH = window.getComputedStyle(dropDownMenuItem).lineHeight;
    var aLink = document.getElementById(aLinkId);
    var aLinkPaddingLeft = window.getComputedStyle(aLink).paddingLeft;
    var aLinkPaddingLeftInt = parseInt(aLinkPaddingLeft);
    var aLinkPaddingTop = window.getComputedStyle(aLink).paddingTop;

    /* To center first drop down menu item with parent menu item, since <nav> top is 0, set drop down menu top position to difference in font sizes plus difference in line-heights. */
    var menuItemFS = window.getComputedStyle(menuItem).fontSize;
    var menuItemLHFloat = parseFloat(menuItemLH);
    var topInt = Math.round((parseFloat(menuItemFS) - parseFloat(dropDownMenuItemFS)) + (menuItemLHFloat - parseFloat(dropDownMenuItemLH)));
    var top = topInt.toString() + "px";

    /* To center arrow with parent menu item, since arrow was styled using parent menu item with pseudo-element, set arrow top position to menu item's line height divided by 2 plus pseudo-element's border top width divided by 2. */
    var borderTop = window.getComputedStyle(menuItem, "::after").borderTopWidth;
    var topAfterInt = Math.round((menuItemLHFloat / 2) + (parseInt(borderTop) / 2) + (parseInt(aLinkPaddingTop) / 2));
    var topAfter = topAfterInt.toString() + "px";

    /* Get arrow's left position by setting leftAfter to CSS menuItemId pseudo element's initial left property value (added for spacing) and adding text width of first link of first item of drop down menu and left padding of link. */
    /* Get text content of first link of parent menu item of drop down menu.  */
    var text = menuItem.children[0].textContent;
    /* Get left property value of menuItemId pseudo-element by splitting afterSelector into strings that can be used with getComputedStyle and querySelector. */
    var afterStringArray = afterSelector.split(":", 2);
    var leftAfter = window.getComputedStyle(document.querySelector(afterStringArray[0]), ":" + afterStringArray[1]).left;
    var leftAfterInt = parseInt(leftAfter);
    leftAfterInt = leftAfterInt + GetTextPixelWidth(text, font) + aLinkPaddingLeftInt;
    leftAfter = leftAfterInt.toString() + "px";

    var CSSRulesStart = true;
    AddTopAndLeftObjectPositionsToCSSDOM(dropDownMenuId, selector, top, left, CSSRulesStart);
    var objectId = null;
    CSSRulesStart = false;
    AddTopAndLeftObjectPositionsToCSSDOM(objectId, afterSelector, topAfter, leftAfter, CSSRulesStart);
}

/* Add drop down menu's and arrow's rules to CSS DOM. */
function AddTopAndLeftObjectPositionsToCSSDOM(objectId, CSSSelector, top, left, CSSRulesStart)
{

    var selectorAndRule;
    var selector;
    var rule;

    /* Set up CSS Selectors and Rules for top and left positions of drop down menu and Arrow to add to CSS DOM. ShopAfterSelector and Rule is for IE versions less than 9.  */
    if (objectId) {

        selectorAndRule = CSSSelector + objectId + " {top: " + top + ";" + "left: " + left + ";}";
        selector = CSSSelector + objectId;
    }
    else {

        selectorAndRule = CSSSelector + "{top: " + top + ";" + "left: " + left + ";}";
        selector = CSSSelector;
    }
    rule = "{top: " + top + "; " + "left: " + left + ";}";

    /* Find Shopping.css style sheet in CSS DOM and add selectorAndRule to either top of style sheet or to end of style sheet depending on CSSDOMStart flag (if rule already exists add to end because last value takes precedence) with either insertRule or if IE browser doesn't recognize insertRule, use addRule because it is IE8 or less. */
    for (var i = 0; i < document.styleSheets.length; i++) {

        if (document.styleSheets[i].title == "Shopping.css") {

            var shoppingStyleSheet = document.styleSheets[i];
            ShoppingCSSRules.setStyleSheet(shoppingStyleSheet);

            var CSSRulesPosition;
            if (CSSRulesStart)
                CSSRulesPosition = 0;
            else CSSRulesPosition = shoppingStyleSheet.cssRules.length;

            if (shoppingStyleSheet.insertRule)
               shoppingStyleSheet.insertRule(selectorAndRule, CSSRulesPosition);
            else shoppingStyleSheet.addRule(selector, rule, CSSRulesPosition);
        }
    }
}

function CSSRulesObject() {

    CSSRulesObject. arrowIndex = 0;
    CSSRulesObject.dropDownIndex = 0;
    CSSRulesObject.hoverDropDownIndex = 0;
    CSSRulesObject.stylesheet = null;

    this.setArrowIndex = function(index) {

        CSSRulesObject.arrowIndex = index;
    };

    this.getArrowIndex = function() {

        return(CSSRulesObject.arrowIndex);
    };

    this.setDropDownIndex = function(index) {

        CSSRulesObject.dropDownIndex = index;
    };

    this.getDropDownIndex = function() {

        return(CSSRulesObject.dropDownIndex);
    };

    this.setHoverDropDownIndex = function(index) {

        CSSRulesObject.hoverDropDownIndex = index;
    };

    this.getHoverDropDownIndex = function() {

        return (CSSRulesObject.hoverDropDownIndex);
    };

    this.setStyleSheet = function(styleSheet) {

        CSSRulesObject.styleSheet = styleSheet;
    };

    this.getStyleSheet = function() {

        return(CSSRulesObject.styleSheet);
    };
}

function FindIndex(cssRulesObject, selectorText) {

    var styleSheet = cssRulesObject.getStyleSheet();

    for (var i = 0; i < styleSheet.cssRules.length; i++) {

        if (styleSheet.cssRules[i].selectorText === selectorText)
            break;
    }

    return(i);
}

/*function MakeXMLHttpRequest(url, mainDivId, productDivId, title, historyFlag) {

    var xhr = new XMLHttpRequest();
    xhr.open = ("GET", url, true);

    if (xhr.status === 0) {

        var obj = document.createElement('object');
        //obj.setAttribute('id', 'HTMLObject');
        obj.setAttribute('type', 'text/html');
        obj.setAttribute('data', url);
        obj.setAttribute('style', 'position:absolute; left:-9999px;');
        //obj.setAttribute('hidden', 'true');
        var mainDiv = document.getElementById(mainDivId);
        //mainDiv.innerHTML = "<object type='text/html' data='coffee.html'></object>";
        mainDiv.appendChild(obj);
        //var htmlObject = document.getElementById("HTMLObject");
        //alert(obj);
        var htmlContent = obj.contentDocument;
        //alert(htmlContent);
        var productDiv = htmlContent.getElementById(productDivId);
        //alert(productDiv);
        mainDiv.innerHTML = productDiv.innerHTML;

        if (historyFlag) {

            var popStateData = [url, mainDivId, productDivId, title, true];
            history.pushState(popStateData, title, url);
        }
        else {

            popStateData = [url, mainDivId, productDivId, title, false];
            history.replaceState(popStateData, title, url);
        }

    }
    else {

        xhr.onReadyStateChange = function(){LoadHtmlPageContent(xhr, mainDivId);};
        xhr.send();
    }
}*/

/*function LoadHtmlPageContent(xhr, divId) {

    if (xhr.readyState === 4) {

        if (xhr.status === 404) {

            alert("Resource Not Found");
        }
        else if(xhr.status >= 200 && xhr.status <= 300) {

            var div = document.getElementById(divId);
            div.innerHTML = xhr.responseText;
        }
        //else show error message
    }
}*/

/* Set left margin of <main> to width of left column, <header>. */
function SetMainLeftMargin(mainId, headerId) {

    var main = document.getElementById(mainId);
    var header = document.getElementById(headerId);
    main.style.marginLeft = header.style.width;
}

/* Set Main Width to difference between Viewport and <header> width. Set Main Height for use in other functions. */
function SetMainWidthAndHeight(mainId, headerId) {

    var main = document.getElementById(mainId);
    var header = document.getElementById(headerId);
    var mainWidthInt = parseInt(document.documentElement.clientWidth) - (parseInt(header.style.width));
    var mainHeightInt = parseInt(document.documentElement.clientHeight);
    main.style.width = mainWidthInt.toString() + "px";
    main.style.height = mainHeightInt.toString() + "px";
}

/* SetImageDisplayTop is called on load event. Vertically space images by setting padding top of Main to difference between Viewport and images inclusive of images' borders and margins and Main's padding divided by two. */
function SetImagesDisplayTop(imageIdFirst, imageIdSecond, imageIdThird, mainId) {

    var imagesIdArray = [imageIdFirst, imageIdSecond, imageIdThird];
    var images = [];
    var imagesDisplayHeight = 0;
    for (var i = 0; i < imagesIdArray.length; i++) {

        images[i] = document.getElementById(imagesIdArray[i]);
        images[i].style.marginBottom = window.getComputedStyle(images[i]).marginBottom;
        images[i].style.borderTopWidth = window.getComputedStyle(images[i]).borderTopWidth;
        images[i].style.borderBottomWidth = window.getComputedStyle(images[i]).borderBottomWidth;
        images[i].style.height = window.getComputedStyle(images[i]).height;
        imagesDisplayHeight += parseInt(images[i].style.height) + parseInt(images[i].style.marginBottom) + parseInt(images[i].style.borderTopWidth) + parseInt(images[i].style.borderBottomWidth);
    }

    var main = document.getElementById(mainId);
    var mainHeightInt = parseInt(document.documentElement.clientHeight);
    imagesDisplayHeight += parseInt(window.getComputedStyle(main).paddingTop);
    main.style.paddingTop = DifferenceDividedByTwo(mainHeightInt, imagesDisplayHeight);
}

/* Get difference of two numbers and return string version. */
function DifferenceDividedByTwo(number1, number2) {

    var difference = number1 - number2;

    if (difference > 1) {

        var result = Math.round(difference / 2);
        return result.toString() + "px";
    }
}

/***** Coffee.html Functions *********************************************************************************/
/* Get value of field in object literal product database. */
function GetObjectFieldValueFromDB(objectId, productDB, productDBField) {

    var object= document.getElementById(objectId);
    if (productDBField === "price")
        object.textContent = "$" + productDB.get(productDBField);
    else object.textContent = productDB.get(productDBField);

}

/* Centers text from object literal product database on page in relation to object. Entries in database include tabs and line feeds that need to be removed.  To center, set left padding of text object to width of object inclusive of borders minus width of text
 object divided by two. */
function CenterTextToObject(textObjectId, objectId) {

    var textObject = document.getElementById(textObjectId);
    var text = textObject.textContent;
    /* productDatabase object literal strings include line feed and horizontal tab characters at end. */
    var newText = RemoveTabsAndLineFeeds(text);
    var font = GetFont(textObject);
    var textWidthInt = GetTextPixelWidth(newText, font);
    var object = document.getElementById(objectId);
    var objectWidth = window.getComputedStyle(object).width;
    var borderLeft = window.getComputedStyle(object).borderLeftWidth;
    var borderRight = window.getComputedStyle(object).borderRightWidth;
    var objectWidthInt = parseInt(objectWidth) + parseInt(borderLeft) + parseInt(borderRight);
    /* DifferenceDividedByTwo does math and integer to string. */
    textObject.style.paddingLeft = DifferenceDividedByTwo(objectWidthInt, textWidthInt);
}

/* Regular Expression used to find letters, spaces, and commas that are added to character array. Characters are added one by one in a for loop to newText string and returned. */
function RemoveTabsAndLineFeeds(text) {

    var charArray = [];
    var regExp = /^[A-Za-z ,]+$/;
    var newText = "";

    for (var i = 0, j = 0; i < text.length; i++) {
        if (regExp.test(text[i])) {
            charArray[j] = text[i];
            j++;
        }
    }

    for (i = 0; i < j; i++) {
        newText += charArray[i];
    }

    return newText;
}

/*function ProductSelectionFigures(directionFlag, figureIdArray) {

    this.directionFlag = directionFlag;
    this.figureIdArray = figureIdArray;
    this.displayArrowSelection = DisplayProductSelectionOfArrow(this.directionFlag, this.figureIdArray);
}*/

/* Center figures horizontally on right column of page - Main. */
function CenterFigures(mainId, figureIdArray, arrowNextId, arrowPrevId) {

    var boxSizing = false;
    var totalWidthInt = 0;
    var totalFigureWidthOver = false;

    /* Get figure elements from Ids. */
    var figureArray = GetArrayElements(figureIdArray);

    /* Test if getComputedStyle includes box-sizing. */
    if (GetComputedStyleIncludesBoxSizing())
        boxSizing = true;

    /* Get width, left and right padding, and left border of Main used to determine spacing between figures. */
    var main = document.getElementById(mainId);
    var mainWidthInt = parseInt(main.style.width);
    var mainPdgLeftInt = parseInt(window.getComputedStyle(main).paddingLeft);
    var mainPdgRightInt = parseInt(window.getComputedStyle(main).paddingRight);
    var mainBrdrLeftInt = parseInt(window.getComputedStyle(main).borderLeftWidth);

    /* Get height of product header which is second child of Main after script. */
    var mainHeader = main.children[1];
    var mainHeaderHeight = window.getComputedStyle(mainHeader).height;
    var headerHeightInt = parseInt(mainHeaderHeight);
    /* If box-sizing (padding and borders are included in width and height) is false, add header's padding to height. */
    if (!boxSizing) {

        headerHeightInt += (parseInt(window.getComputedStyle(mainHeader).paddingTop));
        headerHeightInt += (parseInt(window.getComputedStyle(mainHeader).paddingBottom));
        headerHeightInt = Math.round(headerHeightInt);
    }

    /* Get top margin of figures based on  percentage (39.5%: large landscape figure top margin / large landscape product header height) calculated from appropriate spacing determined between large landscape product header and figure. */
    var marginTopInt = Math.round(.395 * headerHeightInt);

    /* Set first figures margin top and left padding. Left margin of first figure based on percentage (1%: large landscape figure
     left margin / large landscape Main left padding; 1% makes them equal) calculated from appropriate spacing determined between large landscape Main and image. */
    figureArray[0].style.marginTop = marginTopInt.toString() + "px";
    figureArray[0].style.marginLeft = window.getComputedStyle(main).paddingLeft;

    /* If there is more than one figure, determine top and left margins of remaining figures. */
    if (figureArray.length > 1) {

        /* Get string version of margin top to be used when setting left and top margins of all figures. */
        var marginTop = marginTopInt.toString() + "px";

        /* Get width of figure to be used when determining left margins of figures. */
        var figureWidthInt = parseInt(window.getComputedStyle(figureArray[0]).width);

        /* Total width of all figures to be used in determining amount of inner spacing between figures. */
        for (var i = 0; i < figureArray.length; i++)
            totalWidthInt += figureWidthInt;
        /* If total width of figures is more than or equal to width of Main, set up to display next and previous arrows and last figure off screen.        */
        if (totalWidthInt >= mainWidthInt) {

            var lastFigureIndex = figureArray.length - 1;

            /* Find figure (last) that does not fit on screen and hide by setting left position to -9999px. */
            for (i = lastFigureIndex; totalWidthInt > mainWidthInt; i--) {

                totalWidthInt = totalWidthInt - figureWidthInt;
                figureArray[i].style.left = "-9999px";
            }
            /* Set last figure's top margin for when it's displayed. */
            figureArray[lastFigureIndex].style.marginTop = marginTop;
            /* Set lastFigureIndex to last figure that fits on screen. */
            lastFigureIndex = i;
            /* Set figure array's length to number of figures that fit on screen. */
            var figureArrayLen = lastFigureIndex + 1;
            /* Set flag that determines if arrows will be displayed. */
            totalFigureWidthOver = true;
        }
        /* If all figures fit on screen, make figure array length exact length of array. */
        else figureArrayLen = figureArray.length;

        /* Make first and last figures' outer margins same. */
        figureArray[lastFigureIndex].style.marginRight = figureArray[0].style.marginLeft;

        /* Integer value of first figure's left margin and last figure's right margin to be used in determining amount of inner spacing between figures. */
        var figureMarginLRInt = parseInt(figureArray[0].style.marginLeft);
        figureMarginLRInt += figureMarginLRInt;

        /* Get spacing that will be used for inner spacing between figures based on amount of space available. Subtract Main's left and right padding and left border, left and right margins of first and last figures, and figures' total width from Main's width and divide by number of figures needing inner spacing. */
        var spacing = Math.round(((mainWidthInt - (mainPdgLeftInt + mainPdgRightInt + mainBrdrLeftInt + figureMarginLRInt)) - totalWidthInt) / (lastFigureIndex));

        /* Set left margin and top margin of remaining figures. First add first figure's left margin to spacing so that second figure's left margin will include first figure and its left margin and the calculated spacing. Keep adding for remaining figures */
        var marginLeftInt = parseInt(figureArray[0].style.marginLeft);
        for (i = 1; i < figureArrayLen; i++) {

            marginLeftInt += (figureWidthInt + spacing);
            figureArray[i].style.marginLeft = marginLeftInt.toString() + "px";
            figureArray[i].style.marginTop = marginTop;
        }
        /* Last figure distance from Main left margin needed to align arrows to end of last displayed figure. */
        var lastDisplayedFigRightInt = marginLeftInt + figureWidthInt;

        /* If figure's total width is more than or equal to Main' width, display next and previous arrows for a gallery of figures that will move when a user hits one of the arrows that will display hidden figure. */
        if (totalFigureWidthOver) {

            DisplayArrowsForProductSelection(mainWidthInt, arrowNextId, arrowPrevId, lastDisplayedFigRightInt, headerHeightInt, marginTopInt)
        }
    }
}

/* Display next and previous arrows for a gallery of figures that will move when a user hits one of the arrows that will display hidden figure. */
function DisplayArrowsForProductSelection(mainWidthInt, arrowNextId, arrowPrevId, lastDisplayedFigRightInt, mainHeaderHeightInt, figureMarginTopInt) {

    /* Get width of arrows. */
    var arrowNext = document.getElementById(arrowNextId);
    var arrowPrev = document.getElementById(arrowPrevId);
    var arrowNextWidthInt = Math.round((mainWidthInt * .0391)); //parseInt(window.getComputedStyle(arrowNext).width);
    var arrowPrevWidthInt = Math.round((mainWidthInt * .0391)); //parseInt(window.getComputedStyle(arrowPrev).width);

    /* Subtract width of next arrow from right pixel position of last displayed figure to determine left position of arrow that will align arrow with end of last figure and subtract previous arrow width from next arrow left position to determine left
     position of previous arrow. */
    var arrowNextLeftInt = Math.round(lastDisplayedFigRightInt - (arrowNextWidthInt / 2));
    var arrowPrevLeftInt = Math.round(arrowNextLeftInt - arrowPrevWidthInt);
    arrowNext.style.left = arrowNextLeftInt.toString() + "px";
    arrowPrev.style.left = arrowPrevLeftInt.toString() + "px";

    /* Set arrows' top position between product header and displayed figures. */
    var arrowTopInt = Math.round(mainHeaderHeightInt - (figureMarginTopInt / 2));
    arrowNext.style.top = arrowTopInt.toString() + "px";
    arrowPrev.style.top = arrowTopInt.toString() + "px";
}

/* Function is called from button code for next and previous arrow in coffee.html. When user hits either arrow, function is
 called to move figures in either direction bringing in hidden figure.  */
function DisplayProductSelectionOfArrow(directionFlag, figureIdArray) {

    var figureArray = GetArrayElements(figureIdArray);
    var figureArrayLen = figureArray.length;
    /* If direction flag is true, next arrow has been hit. */
    if (directionFlag) {

        /* Set left position of hidden figure (last figure in array) to auto so that browsers can determine left position of figure. Set hidden figure's right margin to last displayed figures right margin (outer margins of first and last displayed
         figures are same for even spacing). Set right margin of last displayed figure to 0 since it will not be last displayed figure. */
        figureArray[figureArrayLen - 1].style.left = "auto";
        figureArray[figureArrayLen - 1].style.marginRight = figureArray[figureArrayLen - 2].style.marginRight;
        figureArray[figureArrayLen - 2].style.marginRight = "0";

        /* Shift array so that first figure is removed and returned. Hide removed figure and push it into end of array. */
        var newFigureOffScreen = figureArray.shift();
        newFigureOffScreen.style.left = "-9999px";
        figureArray.push(newFigureOffScreen);

        /* Starting with new last displayed figure, set left margin to left margin of figure before it which used to be last displayed figure (left margins determined in CenterFigures). Do this for each preceding figure until i is 0. Set left margin of
         first figure to left margin of hidden figure that used to be first figure. */
        for (var i = figureArrayLen - 2, j = figureArrayLen - 3; i > 0; i--, j--) {

            figureArray[i].style.marginLeft = figureArray[j].style.marginLeft;
        }
        figureArray[i].style.marginLeft = figureArray[figureArrayLen - 1].style.marginLeft;

    }
    /* if direction flat is false, previous arrow has been hit. */
    else {

        /* Pop last figure (hidden) from array and set left position to auto, then unshift the array to add last figure to beginning of array. Hide new last figure. */
        var newFirstFigure = figureArray.pop();
        newFirstFigure.style.left = "auto";
        figureArray.unshift(newFirstFigure);
        figureArray[figureArrayLen - 1].style.left = "-9999px";

        /* Starting at beginning of array, set new first figure's left margin to next figure's left margin (used to be first vfigure and continue through array until i is more than last figure. Set last displayed figure's right margin to hidden figure's right margin (used to be last displayed figure).  */
        for (i = 0, j = 1; i < figureArrayLen - 1; i++, j++) {

            figureArray[i].style.marginLeft = figureArray[j].style.marginLeft;
        }
        figureArray[i - 1].style.marginRight = figureArray[i].style.marginRight;
    }

    /* Return figure ids in same order as configuration of current displayed figure array so next call if function will start with current configuration. */
    for (i = 0; i < figureIdArray.length; i++) {

        figureIdArray[i] = figureArray[i].id;
    }

    return figureIdArray;
}

/* Get array elements from element Ids. */
function GetArrayElements(elementIdArray) {

    var elementArray = [];

    for (var i = 0; i < elementIdArray.length; i++) {

        elementArray[i] = document.getElementById(elementIdArray[i]);
    }

    return elementArray;
}

/* Called on mouseOver event when user mouses over product figure. Centers and displays flavor notes and price figure captions on figure using left and right positions. */
function DisplayFlavorNotesAndPriceOnImage(figureId) {

    var figure = document.getElementById(figureId);
    var image = figure.children[0];
    var figCaptionFlavorNotes = figure.children[3];
    var figCaptionPrice = figure.children[4];
    var figButtonAddToCart = figure.children[5];

    /* Get width of figure. */
    var width = window.getComputedStyle(figure).width;
    var figureWidthInt = Math.round(parseInt(width));

    /* Get width of flavor Notes, subtract from figure, divide difference by two, and set to figCaptionFlavorNotes left. */
    //width = window.getComputedStyle(figCaptionFlavorNotes).width;
    var flavorNotesWidthInt = Math.round(parseInt(window.getComputedStyle(figCaptionFlavorNotes).width));
    figCaptionFlavorNotes.style.left = DifferenceDividedByTwo(figureWidthInt, flavorNotesWidthInt);

    /* Get width of price, subtract from figure, divide difference by two, and set to figCaptionPrice left. */
    //width = window.getComputedStyle(figCaptionPrice).width;
    var priceWidthInt = Math.round(parseInt(window.getComputedStyle(figCaptionPrice).width));
    figCaptionPrice.style.left = DifferenceDividedByTwo(figureWidthInt, priceWidthInt);

    var buttonAddToCartWidthInt = Math.round(parseInt(window.getComputedStyle(figButtonAddToCart).width));
    figButtonAddToCart.style.left = DifferenceDividedByTwo(figureWidthInt, buttonAddToCartWidthInt);

    /* Get figure height, divide by 4, and set to figCaptionFlavorNotes top in order to center caption in first quarter of
     figure. */
    //var height = window.getComputedStyle(figure).height;
    var figureHeightInt = Math.round(parseInt(window.getComputedStyle(figure).height));
    figureHeightInt = figureHeightInt / 4;
    figCaptionFlavorNotes.style.top = figureHeightInt.toString() + "px";

    /* Get height of flavor notes and set to figCaptionPrice top in order to place price below flavor notes. */
    //height = window.getComputedStyle(figCaptionFlavorNotes).height;
    figureHeightInt += (Math.round(parseInt(window.getComputedStyle(figCaptionFlavorNotes).height)));
    figCaptionPrice.style.top = figureHeightInt.toString() + "px";

    if (!(GetComputedStyleIncludesBoxSizing())) {

        figureHeightInt += Math.round(parseInt(window.getComputedStyle(figButtonAddToCart).paddingTop));
        figureHeightInt += Math.round(parseInt(window.getComputedStyle(figButtonAddToCart).paddingBottom));
        figureHeightInt += Math.round(parseInt(window.getComputedStyle(figButtonAddToCart).paddingLeft));
        figureHeightInt += Math.round(parseInt(window.getComputedStyle(figButtonAddToCart).paddingRight));
    }
    figureHeightInt += Math.round(parseInt(window.getComputedStyle(figButtonAddToCart).height));
    figButtonAddToCart.style.top = figureHeightInt.toString() + "px";
    figButtonAddToCart.style.opacity = "0.77";

    /* Set opacity of image to blur mouse over. Set filter for IE8. */
    image.style.opacity = "0.35";
    image.style.filter = "alpha(opacity=35)";
}

/* Called on mouseleave event when user mouses away from product figure. Removes flavor note and price by setting left of each
 to -9999px, original value and removes blur by setting opacity to original value of 1.0, no blur. */
function RemoveFlavorNotesAndPriceFromImage(figureId) {

    var figure = document.getElementById(figureId);
    var image = figure.children[0];
    var figCaptionFlavorNotes = figure.children[3];
    var figCaptionPrice = figure.children[4];
    var figButtonAddToCart = figure.children[5];

    figCaptionFlavorNotes.style.left = "-9999px";
    figCaptionPrice.style.left = "-9999px";
    figButtonAddToCart.style.left = "-9999px";
    image.style.opacity = "1.0";
    image.style.opacity = "alpha(opacity=100)";
}

function ShoppingCartIconArrowAndDropDownTopAndLeft() {

    ShoppingCartIconArrowAndDropDownTopAndLeft.iconTop = null;
    ShoppingCartIconArrowAndDropDownTopAndLeft.iconLeft = null;
    ShoppingCartIconArrowAndDropDownTopAndLeft.arrowTop = null;
    ShoppingCartIconArrowAndDropDownTopAndLeft.arrowLeft = null;
    ShoppingCartIconArrowAndDropDownTopAndLeft.dropDownTop = null;
    ShoppingCartIconArrowAndDropDownTopAndLeft.dropDownLeft = null;

    this.setIconTop = function(iconTop) {
        ShoppingCartIconArrowAndDropDownTopAndLeft.iconTop = iconTop;
    };

    this.setIconLeft = function(iconLeft) {
        ShoppingCartIconArrowAndDropDownTopAndLeft.iconLeft = iconLeft;
    };

    this.setArrowTop = function(arrowTop) {
        ShoppingCartIconArrowAndDropDownTopAndLeft.arrowTop = arrowTop;
    };

    this.setArrowLeft = function(arrowLeft) {
        ShoppingCartIconArrowAndDropDownTopAndLeft.arrowLeft = arrowLeft;
    };

    this.setDropDownTop = function(dropDownTop) {
        ShoppingCartIconArrowAndDropDownTopAndLeft.dropDownTop = dropDownTop;
    };

    this.setDropDownLeft = function(dropDownLeft) {
        ShoppingCartIconArrowAndDropDownTopAndLeft.dropDownLeft = dropDownLeft;
    };

    this.getIconTop = function() {
        return(ShoppingCartIconArrowAndDropDownTopAndLeft.iconTop);
    };

    this.getIconLeft = function() {
        return(ShoppingCartIconArrowAndDropDownTopAndLeft.iconLeft);
    };

    this.getArrowTop = function() {
        return(ShoppingCartIconArrowAndDropDownTopAndLeft.arrowTop);
    };

    this.getArrowLeft = function() {
        return (ShoppingCartIconArrowAndDropDownTopAndLeft.arrowLeft);
    };

    this.getDropDownTop = function() {
        return (ShoppingCartIconArrowAndDropDownTopAndLeft.dropDownTop);
    };

    this.getDropDownLeft = function() {
        return (ShoppingCartIconArrowAndDropDownTopAndLeft.dropDownLeft);
    }
}

function SetShoppingCartIconArrowAndDropDownTopAndLeft(shoppingCartContainerId, shoppingCartIconId, productHeaderId, arrowPrevId, shoppingCartArrowId, shoppingCartDropDownId, selector) {

    var shoppingCartContainer = document.getElementById(shoppingCartContainerId);
    var shoppingCartDropDown = document.getElementById(shoppingCartDropDownId);
    var dropDownWidthInt = parseInt(window.getComputedStyle(shoppingCartDropDown).width);
    if (!(GetComputedStyleIncludesBoxSizing())) {

        dropDownWidthInt += parseInt(window.getComputedStyle(shoppingCartDropDown).paddingLeft);
        dropDownWidthInt += parseInt(window.getComputedStyle(shoppingCartDropDown).paddingRight);
        dropDownWidthInt += parseInt(window.getComputedStyle(shoppingCartDropDown).borderLeftWidth);
        dropDownWidthInt += parseInt(window.getComputedStyle(shoppingCartDropDown).borderRightWidth);
    }
    shoppingCartContainer.style.width = dropDownWidthInt.toString() + "px";
    var arrowPrev = document.getElementById(arrowPrevId);
    var arrowPrevLeftInt = parseInt(arrowPrev.style.left);
    var shoppingCartContainerLeftInt = arrowPrevLeftInt - (dropDownWidthInt + 40);
    shoppingCartContainer.style.left = shoppingCartContainerLeftInt.toString() + "px";
    shoppingCartContainer.style.top = "0";

    /* ShoppingCartIcon Top */
    var shoppingCartIcon = document.getElementById(shoppingCartIconId);
    var productHeader = document.getElementById(productHeaderId);
    var paddingTopInt = parseInt(window.getComputedStyle(productHeader).paddingTop);
    var topInt = paddingTopInt * 2;
    var top = topInt.toString() + "px";
    ShoppingCart.setIconTop(top);

    /* ShoppingCartIcon Left */
    var leftInt = arrowPrevLeftInt - (shoppingCartContainerLeftInt + 50);
    var left = leftInt.toString() + "px";
    ShoppingCart.setIconLeft(left);

    /* ShoppingCartDropDownArrow Top */
    var shoppingCartArrow = document.getElementById(shoppingCartArrowId);
    topInt = parseInt(window.getComputedStyle(shoppingCartIcon).height);
    top = topInt.toString() + "px";
    ShoppingCart.setArrowTop(top);

    /* ShoppingCartDropDownArrow Left */
    var iconWidthInt = parseInt(window.getComputedStyle(shoppingCartIcon).width);
    leftInt = Math.round((.0625 * iconWidthInt));
    left = leftInt.toString() + "px";
    ShoppingCart.setArrowLeft(left);

    /* ShoppingCartDropDown Top
    var shoppingCartDropDown = document.getElementById(shoppingCartDropDownId);*/
    topInt += parseInt(window.getComputedStyle(shoppingCartArrow).borderBottomWidth);
    var dropDownTop = topInt.toString() + "px";
    ShoppingCart.setDropDownTop(dropDownTop);

    /* ShoppingCartDropDown Left */
    leftInt = iconWidthInt - dropDownWidthInt;
    var dropDownLeft = leftInt.toString() + "px";
    /*ShoppingCart.setDropDownLeft(dropDownLeft);*/

    var CSSRulesStart = false;
    AddTopAndLeftObjectPositionsToCSSDOM(shoppingCartArrowId, selector, top, left, CSSRulesStart);
    AddTopAndLeftObjectPositionsToCSSDOM(shoppingCartDropDownId, selector, dropDownTop, dropDownLeft, CSSRulesStart);

    /* Search for index. */
    var selectorText = "#" + shoppingCartArrowId;
    var index = FindIndex(ShoppingCSSRules, selectorText);
    ShoppingCSSRules.setArrowIndex(index);

    selectorText = "#" + shoppingCartDropDownId;
    index = FindIndex(ShoppingCSSRules, selectorText);
    ShoppingCSSRules.setDropDownIndex(index);

    selectorText = selector + shoppingCartDropDownId;
    index = FindIndex(ShoppingCSSRules, selectorText);
    ShoppingCSSRules.setHoverDropDownIndex(index);
}

function DatabaseTwoDimensionalArray() {

    DatabaseTwoDimensionalArray.array = [[],[]];
    DatabaseTwoDimensionalArray.index = 0;

    this.addToDatabase = function(value1, value2) {

        if (!DatabaseTwoDimensionalArray.array[DatabaseTwoDimensionalArray.index])
            DatabaseTwoDimensionalArray.array[DatabaseTwoDimensionalArray.index] = [];

        DatabaseTwoDimensionalArray.array[DatabaseTwoDimensionalArray.index][0] = value1;
        DatabaseTwoDimensionalArray.array[DatabaseTwoDimensionalArray.index++][1] = value2;
    };

    this.getArrayIndex = function() {

        return(DatabaseTwoDimensionalArray.index);
    };

    this.getArrayEntry = function(arrayIndex, arrayEntryIndex) {

        return DatabaseTwoDimensionalArray.array[arrayIndex][arrayEntryIndex];
    };

    this.getArrayLength = function() {

        var length = 0;

        if ((DatabaseTwoDimensionalArray.index - 1) === 0)
            length = 1;
        else length = DatabaseTwoDimensionalArray.array.length;

        return(length);
    };

    this.increaseIndex = function() {

        DatabaseTwoDimensionalArray.index++;
    };

    this.decreaseIndex = function() {

        DatabaseTwoDimensionalArray.index--;
    };

    this.setIndexToZero = function() {

        DatabaseTwoDimensionalArray.index = 0;
    };
}

function CreateElement(elementName, parentElement, childElement) {

    var element = document.createElement(elementName);
    element.setAttribute("class", "ShoppingCartItem");
    element = parentElement.insertBefore(element, childElement);

    return(element);
}

function DisplayShoppingCartIconArrowAndDropDown(shoppingCartIconId, shoppingCartDropDownId, shoppingCartTotalId, productDatabase) {

    var shoppingStyleSheet = ShoppingCSSRules.getStyleSheet();

    /* ShoppingCartIcon Top and Left */
    var shoppingCartIcon = document.getElementById(shoppingCartIconId);
    shoppingCartIcon.style.top = ShoppingCart.getIconTop();
    shoppingCartIcon.style.left = ShoppingCart.getIconLeft();

    /* ShoppingCartArrow Top and Left */
    /*var shoppingCartArrow = document.getElementById(shoppingCartArrowId);*/
    var index = ShoppingCSSRules.getArrowIndex();
    shoppingStyleSheet.cssRules[index].style.top = ShoppingCart.getArrowTop();
    shoppingStyleSheet.cssRules[index].style.left = ShoppingCart.getArrowLeft();

    /* Shopping Cart Items */
    index = ShoppingCartDatabase.getArrayIndex();
    ShoppingCartDatabase.addToDatabase(productDatabase.name, productDatabase.priceText);

    var shoppingCartDropDown = document.getElementById(shoppingCartDropDownId);
    var shoppingCartTotal = document.getElementById(shoppingCartTotalId);
    var li = CreateElement("li", shoppingCartDropDown, shoppingCartTotal);

    li.textContent = ShoppingCartDatabase.getArrayEntry(index, 0);
    li.textContent += "     ";
    li.textContent += ShoppingCartDatabase.getArrayEntry(index, 1);

    var priceStr = null;
    var priceTempInt = 0;
    var priceInt = 0;
    var shoppingCartDatabaseLength = ShoppingCartDatabase.getArrayLength();
    for (var i = 0; i < shoppingCartDatabaseLength; i++) {

        priceStr = ShoppingCartDatabase.getArrayEntry(i, 1);
        priceTempInt = parseFloat((priceStr.substring(1)));
        priceInt += priceTempInt;
    }
    shoppingCartTotal.textContent = "Total: " + "$" + (priceInt.toFixed(2));

    /* ShoppingCartDropDown Top and Left */
    index = ShoppingCSSRules.getDropDownIndex();
    shoppingStyleSheet.cssRules[index].style.top = ShoppingCart.getDropDownTop();
    var iconWidthInt = parseInt(window.getComputedStyle(shoppingCartIcon).width);
    var dropDownWidthInt = parseInt(window.getComputedStyle(shoppingCartDropDown).width);
    if (!(GetComputedStyleIncludesBoxSizing())) {

        dropDownWidthInt += parseInt(window.getComputedStyle(shoppingCartDropDown).paddingLeft);
        dropDownWidthInt += parseInt(window.getComputedStyle(shoppingCartDropDown).paddingRight);
        dropDownWidthInt += parseInt(window.getComputedStyle(shoppingCartDropDown).borderLeftWidth);
        dropDownWidthInt += parseInt(window.getComputedStyle(shoppingCartDropDown).borderRightWidth);
    }
    var leftInt = iconWidthInt - (dropDownWidthInt - 20);
    /*shoppingStyleSheet.cssRules[index].style.left = ShoppingCart.getDropDownLeft();*/
    var left = leftInt.toString() + "px";
    shoppingStyleSheet.cssRules[index].style.left = left;
    index = ShoppingCSSRules.getHoverDropDownIndex();
    shoppingStyleSheet.cssRules[index].style.left = left;

    /*var width = window.getComputedStyle(shoppingCartTotal).width;
    var height = window.getComputedStyle(shoppingCartTotal).height;
    alert(width);
    alert(height);*/

    window.setTimeout(function() {RemoveShoppingCartArrowAndDropDown();}, 3500);
}

function RemoveShoppingCartArrowAndDropDown() {

    var shoppingStyleSheet = ShoppingCSSRules.getStyleSheet();

    /* ShoppingCart Arrow  */
    var index = ShoppingCSSRules.getArrowIndex();
    shoppingStyleSheet.cssRules[index].style.top = "0";
    shoppingStyleSheet.cssRules[index].style.left = "-9999px";

    /* ShoppingCart DropDown */
    index = ShoppingCSSRules.getDropDownIndex();
    shoppingStyleSheet.cssRules[index].style.top = "0";
    shoppingStyleSheet.cssRules[index].style.left = "-9999px";
}