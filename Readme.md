This merely reduces horizontal spacing between notification icons.

Notification tray before (default 12px hpadding):

![original with 12px padding](http://1.bp.blogspot.com/-Kdw2lhWlwxg/T4fGBVeSycI/AAAAAAAABUk/YuPbxK_HGAw/s320/notification_tray_original.png "Original, 12px padding")

Notification tray after (6px hpadding):

![after with 6px padding](http://1.bp.blogspot.com/-k61-1F47Ylk/T4fHW1SgdtI/AAAAAAAABUw/ovl51ORLZ0g/s320/notification_tray_after.png "After, 6px padding")

To modify it edit 'stylesheet.js' and change the line:

    -natural-hpadding: 6px;

to whatever spacing you want. The original GNOME-shell value is 12px, and the default for this plugin is 6px.

If you reduce it to less than 6px (it looks kind of funny then) you will also have to change the line:

    -minimum-hpadding: 6px; 

to be the same.


Alternatively, you can just modify `/usr/share/gnome-shell/theme/gnome-shell.css`
 and change the lines there...

It essentially lets you modify the .panel-button -natural-padding attribute (default 12px).
