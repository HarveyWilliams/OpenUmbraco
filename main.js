"use strict";

/**
 * Main extension code.
 */
var main = function() {
    let clickTimeout = null;
    let delay = 300;

    /**
     * The button click event.
     * Also tracks if the user has clicked or double clicked.
     * - single click: toggle Umbraco
     * - double click: open Umbraco node
     * @private
     */
    let clickEvent = () => {
        if (!urlTracker.valid()) {
            log('Not a valid URL.');

            return;
        }

        if (clickTimeout != null) {
            clearTimeout(clickTimeout);

            clickTimeout = null;

            shared.openUmbracoNode();
        } else {
            clickTimeout = setTimeout(() => {
                shared.toggleUmbraco();

                clearTimeout(clickTimeout);

                clickTimeout = null;
            }, settings.delayTime.get());
        }
    };

    browser.browserAction.onClicked.addListener(clickEvent);
    shared.setIcon();
    shared.contextMenus().setup();

    return {
        name: 'Umbraco Helper Extension',
        version: '0.8.1'
    };
}();