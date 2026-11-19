---
title: "How to Permanently Stop Motorola Android 14 System Update Popups (No Root)"
description: "Fix Motorola Android 14's non-disableable com.motorola.ccc.ota update banner without root using ADB notification snoozing, AppOps restrictions, and background network blocking."
pubDate: 2026-11-18
tags: ["android", "motorola", "adb", "debugging"]
featured: true
---

If you own a Motorola phone running **Android 14**, you've probably run into one of the most annoying system behaviors on modern Android: once an OTA update is pending, Motorola's updater (`com.motorola.ccc.ota`) pops up an intrusive high-priority heads-up banner every **20 to 40 minutes** via a locked-priority channel (`NOTIFICATION_INTERRUPTION`).

Normally on Android, you would just disable or uninstall the updater package via ADB. On Motorola Android 14, however, Motorola added system-level anti-disable protection to `com.motorola.ccc.ota`. Running `pm disable-user` or `pm uninstall` without root immediately fails with:

```text
Failure: package is non-disable
```

Instead of unlocking the bootloader or rooting the device, here is a **3-part ADB workaround** that stops the popups cleanly and has been verified on a live device.

## Prerequisites

1. Enable **Developer Options** and **USB Debugging** on your Motorola phone.
2. Download Google's [Android SDK Platform-Tools](https://developer.android.com/tools/releases/platform-tools) on your computer.
3. Connect your phone via USB and verify `adb devices` shows your device.

> **Windows PowerShell tip:** If `adb` isn't in your system `PATH`, navigate to your `platform-tools` folder and replace `adb` with `.\adb.exe` (or the full path to `adb.exe`).

## Step 0: Check Your Device's UID and Notification Key

In my test device, `com.motorola.ccc.ota` had UID `10320` and notification key `0|com.motorola.ccc.ota|1729|null|10320`. Because UIDs and notification IDs can vary slightly across models or firmware builds, double-check yours first while the update notification is present:

```powershell
# Find the package UID (e.g. uid:10320)
adb shell pm list packages -U com.motorola.ccc.ota

# Find the active notification key (look for key=0|com.motorola.ccc.ota|...)
adb shell "dumpsys notification --noredact | grep -i 'com.motorola.ccc.ota'"
```

Replace `10320` and `0|com.motorola.ccc.ota|1729|null|10320` in the commands below if your device outputs different values.

## The Verified 3-Part Solution

### 1. Silently Snooze the Update Notification for 1 Year

Android's `cmd notification snooze` accepts a duration in milliseconds (`31536000000` ms = 365 days). Telling the system notification manager to snooze the exact OTA notification key intercepts it at the OS level:

```powershell
adb shell "cmd notification snooze --for 31536000000 '0|com.motorola.ccc.ota|1729|null|10320'"
```

**Verification:** After running this command, I force-stopped and restarted the `com.motorola.ccc.ota` process. Its new popup attempt was immediately intercepted and silently swallowed by Android's notification service — no banner, no interruption.

### 2. Disable Automatic System Updates on Reboot

Prevent Android from automatically applying pending OTA updates the next time the phone restarts:

```powershell
adb shell settings put global ota_disable_automatic_update 1
```

### 3. Restrict Background Wakeups, Alarms, Overlays, and Background Networking

Even with the notification snoozed, we don't want `com.motorola.ccc.ota` waking the CPU, scheduling exact alarms, showing full-screen overlays, or downloading update packages in the background.

Restrict its `appops` permissions on the primary profile (**User 0** — and repeat with `--user 10` if you also have a secondary space / work profile):

```powershell
# Primary user (User 0)
adb shell 'for op in SCHEDULE_EXACT_ALARM WAKE_LOCK RUN_IN_BACKGROUND RUN_ANY_IN_BACKGROUND SYSTEM_ALERT_WINDOW USE_FULL_SCREEN_INTENT; do cmd appops set --user 0 com.motorola.ccc.ota $op ignore; done'

# Optional: Secondary space / Work profile (User 10)
adb shell 'for op in SCHEDULE_EXACT_ALARM WAKE_LOCK RUN_IN_BACKGROUND RUN_ANY_IN_BACKGROUND SYSTEM_ALERT_WINDOW USE_FULL_SCREEN_INTENT; do cmd appops set --user 10 com.motorola.ccc.ota $op ignore; done'
```

Then block background networking for its UID (`10320`):

```powershell
adb shell "cmd connectivity set-background-networking-enabled-for-uid 10320 false; cmd netpolicy add restrict-background-blacklist 10320"
```

## Important Note: After a Full Phone Reboot

Some Android builds clear the active notification snooze list after a full power cycle or reboot. If the popup ever reappears after restarting your phone, simply plug it in and run this single command in PowerShell to silence it for another year:

```powershell
adb shell "cmd notification snooze --for 31536000000 '0|com.motorola.ccc.ota|1729|null|10320'"
```

## How to Revert Everything (Restore System Updates)

If you ever want to install a future security patch or Android upgrade, run this one-liner to undo all changes and restore OTA behavior cleanly:

```powershell
adb shell "settings put global ota_disable_automatic_update 0; cmd appops reset com.motorola.ccc.ota; cmd connectivity set-background-networking-enabled-for-uid 10320 true; cmd netpolicy remove restrict-background-blacklist 10320; cmd notification unsnooze '0|com.motorola.ccc.ota|1729|null|10320'"
```

If you also restricted a secondary user space (`User 10`), reset its AppOps as well:

```powershell
adb shell cmd appops reset --user 10 com.motorola.ccc.ota
```
