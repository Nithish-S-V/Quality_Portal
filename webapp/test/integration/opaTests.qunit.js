/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["com/kaar/qualityportal/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
