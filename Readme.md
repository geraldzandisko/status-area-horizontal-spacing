This is a GNOME shell extension that reduces the horizontal spacing between status area icons (top-right of the panel: volume indicator, etc). (Tested in GNOME 3.2, 3.4).

Status area before (default 12px hpadding):

![original with 12px padding](http://1.bp.blogspot.com/-Kdw2lhWlwxg/T4fGBVeSycI/AAAAAAAABUk/YuPbxK_HGAw/s320/notification_tray_original.png "Original, 12px padding")

Status area after (6px hpadding):

![after with 6px padding](http://1.bp.blogspot.com/-k61-1F47Ylk/T4fHW1SgdtI/AAAAAAAABUw/ovl51ORLZ0g/s320/notification_tray_after.png "After, 6px padding")

To modify it edit 'stylesheet.js' and change the line:

    -natural-hpadding: 6px;

to whatever spacing you want. The original GNOME-shell value is 12px, and the default for this plugin is 6px.

If you reduce it to less than 6px (it looks kind of funny then) you will also have to change the line:

    -minimum-hpadding: 6px; 

to be the same.


Alternatively, you can just modify `/usr/share/gnome-shell/theme/gnome-shell.css` and change the lines there...

It essentially lets you modify the .panel-button -natural-padding attribute (default 12px).

##Installation

Download the files (go to 'Downloads' &gt; select the zip file).

Either start `gnome-tweak-tool` and select 'Shell Extensions &gt; Install Shell Extension &gt; (zip file you just downloaded', OR you can unzip the file in `~/.local/share/gnome-shell/extensions` and use `dconf-editor` to modify '/org/gnome/shell/enabled-extensions' to include `'status-area-horizontal-spacing@mathematical.coffee.gmail.com'`.

In GNOME 3.4, you could alternatively `gnome-shell-extension-tool --enable status-area-horizontal-spacing@mathematical.coffee.gmail.com`.
