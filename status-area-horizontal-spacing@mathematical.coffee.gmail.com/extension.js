/**
 * StatusAreaHorizontalSpacing extension
 * v1.0
 *
 * This extension essentially modifies the "-natural-hpadding" 
 * attribute of panel-buttons (i.e. indicators in the status area)
 * so that they can be closer together.
 *
 * The default is 12.
 *
 * It does this by using 'set_style' to override the '-natural-hpadding'
 * property of anything added to Main.panel._rightBox.
 * It listens to the 'add-actor' signal of Main.panel._rightBox to override
 * the style.
 *
 * 2012 mathematical.coffee@gmail.com
 */

/// Set the padding between icons in pixels here.
/// Default for gnome-shell is 12, and 6 or more is recommended.
const HPADDING = 6;

/****************************
 * CODE
 ****************************/
/* Option 1:
 * - create a new theme, application stylesheet is mine,
 *   demote all others, load custom stylesheets, replace current theme.
 * Option 2:
 * - listen to Main.panel._rightBox add-actor and do set_style.
 */
const Mainloop = imports.mainloop;
const St = imports.gi.St;
const Shell = imports.gi.Shell;

const Main = imports.ui.main;
let actorAddedID,
    styleLine = '-natural-hpadding: %dpx'.format(HPADDING);

/* Note: the gnome-shell class always overrides any you add in the extension.
 * So doing add_style_class(my_style_with_less_hpadding) doesn't work.
 * However set_style sets the inline style and that works.
 */
function overrideStyle(container, actor) {
    if (actor.has_style_class_name('panel-button')) {
        if (actor._original_inline_style_ === undefined) {
            actor._original_inline_style_ = actor.get_style();
        }
        actor.set_style(styleLine + '; ' + (actor._original_inline_style_ || ''));
    }
}

function restoreOriginalStyle(actor) {
    if (actor.has_style_class_name('panel-button') && actor._original_inline_style_ !== undefined) {
        actor.set_style(actor._original_inline_style_);
        delete actor._original_inline_style_;
    }
}

function init(extensionMeta) {
    // if you set it below 6 and it looks funny, that's your fault!
    if (HPADDING < 6) {
        styleLine += '; -minimum-hpadding: %dpx'.format(HPADDING);
    }
}

function enable() {
    /* set style for everything in _rightBox */
    let children = Main.panel._rightBox.get_children();
    for (let i = 0; i < children.length; ++i) {
        overrideStyle(Main.panel._rightBox, children[i]);
    }

    /* connect signal */
    actorAddedID = Main.panel._rightBox.connect('actor-added', overrideStyle);
}

function disable() {
    /* disconnect signal */
    if (actorAddedID) {
        Main.panel._rightBox.disconnect(actorAddedID);
    }
    /* remove style class name. */
    let children = Main.panel._rightBox.get_children();
    for (let i = 0; i < children.length; ++i) {
        restoreOriginalStyle(children[i]);
    }
}
