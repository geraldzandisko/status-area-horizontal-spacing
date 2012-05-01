This is a GNOME shell extension that reduces the horizontal spacing between status area icons (top-right of the panel: volume indicator, etc). (Tested in GNOME 3.2, 3.4).

Status area before (default 12px hpadding):

![original (12px padding)](http://cdn.bitbucket.org/mathematicalcoffee/status-area-horizontal-spacing-gnome-shell-extension/downloads/status_area_original.png)

Status area after (6px hpadding):

![after with 6px padding](http://cdn.bitbucket.org/mathematicalcoffee/status-area-horizontal-spacing-gnome-shell-extension/downloads/status_area_6px.png)

To modify it edit 'stylesheet.js' and change the line:

    -natural-hpadding: 6px;

to whatever spacing you want. The original GNOME-shell value is 12px, and the default for this plugin is 6px.

If you reduce it to less than 6px (it looks kind of funny then) you will also have to change the line:

    -minimum-hpadding: 6px; 

to be the same.


Alternatively, you can just modify `/usr/share/gnome-shell/theme/gnome-shell.css` and change the lines there...

It essentially lets you modify the .panel-button -natural-padding attribute (default 12px).

##Installation

Download the files (go to 'Downloads' and select the zip file).

Start `gnome-tweak-tool` and select 'Shell Extensions > Install Shell Extension > (zip file you just downloaded)'. 
