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
const Mainloop = imports.mainloop;
const St = imports.gi.St;
const Shell = imports.gi.Shell;

const Main = imports.ui.main;

/****************************
 * CODE
 ****************************/
/* Option 1:
 * - set application/theme/default_stylesheet, load custom ones.
 * Option 2:
 * - listen to/patch Main._rightBox.add... and add
 *   a style with natural-hpadding.
 * TODO: listen to signal for add to status area?
 */
const HPADDING = 6;
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
