var settings_toggle = (function () {

var exports = {};

var toggler;

exports.highlight_toggle = function (tab_name) {
    if (toggler) {
        toggler.goto(tab_name);
    }
};

exports.initialize = function () {
    toggler = components.toggle({
        child_wants_focus: true,
        values: [
            { label: i18n.t("Settings"), key: "settings" },
            { label: i18n.t("Organization"), key: "organization" },
        ],
        callback: function (name, key) {
            if (key === "organization") {
                settings_panel_menu.show_org_settings();
            } else {
                settings_panel_menu.show_normal_settings();
            }
        },
    });

    settings_panel_menu.set_key_handlers(toggler);

    $("#settings_overlay_container .tab-container").append(toggler.get());
};

// Handles the collapse/reveal of some tabs in the org settings for non-admins.
exports.toggle_org_setting_collapse = function () {
    var is_collapsed = $(".collapse-org-settings").hasClass("hide-org-settings");
    var show_fewer_settings_text = i18n.t("Show fewer");
    var show_more_settings_text = i18n.t("Show more");

    if (is_collapsed) {
        _.each($(".collapse-org-settings"), function (elem) {
            $(elem).removeClass("hide-org-settings");
        });

        $("#toggle_collapse_chevron").removeClass("fa-angle-double-down");
        $("#toggle_collapse_chevron").addClass("fa-angle-double-up");

        $("#toggle_collapse").text(show_fewer_settings_text);

    } else {
        _.each($(".collapse-org-settings"), function (elem) {
            $(elem).addClass("hide-org-settings");
        });

        $("#toggle_collapse_chevron").removeClass("fa-angle-double-up");
        $("#toggle_collapse_chevron").addClass("fa-angle-double-down");

        $("#toggle_collapse").text(show_more_settings_text);
    }

    // If current tab is about to be collapsed, go to default tab.
    var current_tab = $(".org-settings-list .active");
    if (current_tab.hasClass("hide-org-settings")) {
        $(location).attr("href", "/#organization/organization-profile");
    }
};

return exports;

}());

if (typeof module !== 'undefined') {
    module.exports = settings_toggle;
}
window.settings_toggle = settings_toggle;
