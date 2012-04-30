// -*- mode: js2; indent-tabs-mode: nil; js2-basic-offset: 4 -*-
/**
 * StatusAreaHorizontalSpacing extension
 * v0.1
 *
 * This extension essentially modifies the "-natural-hspacing" 
 * attribute of panel-buttons (i.e. indicators in the status area)
 * so that they can be closer together.
 *
 * The default is 12.
 *
 * Code shamelessy modified from
 * http://blog.fpmurphy.com/2011/06/patching-a-gnome-shell-theme.html
 * 2011 Finnbarr P. Murphy
 * which is further modified in:
 * http://rlog.rgtti.com/2011/12/06/a-gnome-shell-extension-to-change-the-top-panel-look/
 * 2011 Romani Gianetti
 *
 * 2012 mathematical.coffee@gmail.com
 */
const St = imports.gi.St;
const Main = imports.ui.main;
const Shell = imports.gi.Shell;

// GNOME 3.4:
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;
// NOTE: if using schemas, I think I need to use the makefile to
// somehow "install" it for use - increases user experience *only* if
// they install from gnome-shell-extensions website! o'wise they have to 
// make/make install....
// So, do I want to upload to the website? & mantain a different version with
// the preferences in the file?

/****************************
 * CODE
 ****************************/

let defaultStylesheet, patchStylesheet;

function init(extensionMeta) {
    // Convenience.initTranslations();

    // store the location of the stylesheet
    defaultStylesheet = Main._defaultCssStylesheet;
    patchStylesheet = extensionMeta.path + '/stylesheet.css';
}

function enable() {
    //let settings = Convenience.getSettings();
    //let padding = settings.get_string('padding') || _("6");

    let themeContext = St.ThemeContext.get_for_stage(global.stage);
    // make a new theme, remember to load our own stylesheet.css which
    // has the -natural-hspacing modified.
    let theme = new St.Theme ({ application_stylesheet: patchStylesheet,
                                theme_stylesheet: defaultStylesheet });
    try {
            themeContext.set_theme(theme);
        } catch (e) {
            global.logError('Stylesheet parse error: ' + e);
        }

}

function disable() {
    // Undo the changes we did with the stylesheet
    let themeContext = St.ThemeContext.get_for_stage(global.stage);
    // just restore the default style sheet
    let theme = new St.Theme( {theme_stylesheet: defaultStylesheet} )
    try {
            themeContext.set_theme(theme);
        } catch (e) {
            global.logError('Stylesheet parse error: ' + e);
        }
}
