This is a GNOME shell extension that reduces the horizontal spacing between status area icons (top-right of the panel: volume indicator, etc). (Tested in GNOME 3.2, 3.4).

Status area before (default 12px hpadding):

![original (12px padding)](http://cdn.bitbucket.org/mathematicalcoffee/status-area-horizontal-spacing-gnome-shell-extension/downloads/status_area_original.png)

Status area after (6px hpadding):

![after with 6px padding](http://cdn.bitbucket.org/mathematicalcoffee/status-area-horizontal-spacing-gnome-shell-extension/downloads/status_area_6px.png)

To modify it edit `extension.js` and change the line:

    const HPADDING = 6;

to whatever spacing you want. The original GNOME-shell value is 12px, and the default for this plugin is 6px.
At least 6px is recommended.

(If you do not want to use the extension, you can modify `/usr/share/gnome-shell/theme/gnome-shell.css`: change the `-natural-hpadding` property of `.panel-button`, i.e.:

    .panel-button {
        -natural-hpadding: 12px;

could become

    .panel-button {
        -natural-hpadding: 6px;

to change the padding to 6 pixels. If you change this below 6 pixels, you will also have to modify the `-minimum-hpadding` value to accommodate it.

However this will be lost every time you change themes, upgrade gnome-shell, etc.)

##Installation

Download the files (go to 'Downloads' and select the zip file).

Start `gnome-tweak-tool` and select 'Shell Extensions > Install Shell Extension > (zip file you just downloaded)'. 
