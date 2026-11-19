---
title: "免 Root 彻底停止摩托罗拉 Android 14 烦人的系统更新弹窗"
description: "摩托罗拉 Android 14 对 com.motorola.ccc.ota 加了防禁用保护导致无法 disable-user？分享一套实测生效的 ADB 组合方案：静默休眠 1 年、禁止自动更新并限制后台唤醒与联网。"
pubDate: 2026-11-18
category: "tech"
tags: ["android", "motorola", "adb", "debugging"]
featured: true
---

如果你在用 **Android 14 的摩托罗拉手机**，大概率被它的系统更新提醒折磨过：一旦检测到可用 OTA 更新，系统的更新服务 `com.motorola.ccc.ota` 就会每隔 **20～40 分钟**，通过锁死优先级的紧急通道（`NOTIFICATION_INTERRUPTION`）强行弹出横幅打断你。

更头疼的是，摩托罗拉在 Android 14 底层对 `com.motorola.ccc.ota` 加了**防禁用保护**——在无 Root 情况下，常规的 ADB `pm disable-user` 或 `pm uninstall` 都会直接报错失败：

```text
Failure: package is non-disable
```

不想解锁 Bootloader、也不想折腾 Root，我改用了一套 **ADB 组合方案**，实测完全生效，且随时可以一条命令完整还原。

## 准备工作

1. 在手机上开启 **开发者选项** 和 **USB 调试**。
2. 电脑下载 Google 官方的 [Android SDK Platform-Tools](https://developer.android.com/tools/releases/platform-tools)。
3. 数据线连接电脑，确认 `adb devices` 能正常识别设备。

> **Windows PowerShell 提示**：如果 `adb` 没有加进环境变量，直接把下面命令里的 `adb` 替换为你本地 `platform-tools` 目录里的 `adb.exe` 路径（例如 `.\adb.exe`）即可。

## 第 0 步：确认自己设备的 UID 和通知 Key

在我的测试机上，`com.motorola.ccc.ota` 的 UID 是 `10320`，通知 Key 是 `0|com.motorola.ccc.ota|1729|null|10320`。不同机型或固件版本可能会有细微差异，建议在弹窗出现时先查一下自己机器的实际值：

```powershell
# 查看包对应的 UID（例如 uid:10320）
adb shell pm list packages -U com.motorola.ccc.ota

# 查看当前通知 Key（查找 key=0|com.motorola.ccc.ota|...）
adb shell "dumpsys notification --noredact | grep -i 'com.motorola.ccc.ota'"
```

如果你查出来的 UID 或通知 ID 不同，替换下面命令中的对应字段即可。

## 实测生效的三步组合方案

### 1. 静默休眠该更新弹窗 1 年

Android 通知服务支持通过 `cmd notification snooze` 指定毫秒级休眠时长（`31536000000` 毫秒 = 365 天）。直接将这条系统更新通知在底层挂起休眠 1 年：

```powershell
adb shell "cmd notification snooze --for 31536000000 '0|com.motorola.ccc.ota|1729|null|10320'"
```

**实测验证**：执行完后我专门重启了一次 `com.motorola.ccc.ota` 进程，它再次发出的更新弹窗请求已被 Android 系统通知服务直接拦截吞掉，屏幕完全无打扰。

### 2. 关闭重启自动系统更新

把系统全局配置中的 `ota_disable_automatic_update` 设为 `1`，防止手机重启时偷偷自动装更新：

```powershell
adb shell settings put global ota_disable_automatic_update 1
```

### 3. 限制后台唤醒、精确闹钟、悬浮窗与后台联网

为了避免更新服务继续在后台高频唤醒 CPU、抢占全屏意图或在后台偷跑流量下载更新包，我们对**主空间（User 0）**和**副空间（User 10，如有开启）**一并收回其精确闹钟（`SCHEDULE_EXACT_ALARM`）、唤醒锁（`WAKE_LOCK`）、后台运行、悬浮窗（`SYSTEM_ALERT_WINDOW`）及全屏弹窗（`USE_FULL_SCREEN_INTENT`）权限：

```powershell
# 主空间（User 0）
adb shell 'for op in SCHEDULE_EXACT_ALARM WAKE_LOCK RUN_IN_BACKGROUND RUN_ANY_IN_BACKGROUND SYSTEM_ALERT_WINDOW USE_FULL_SCREEN_INTENT; do cmd appops set --user 0 com.motorola.ccc.ota $op ignore; done'

# 可选：副空间 / 工作资料（User 10）
adb shell 'for op in SCHEDULE_EXACT_ALARM WAKE_LOCK RUN_IN_BACKGROUND RUN_ANY_IN_BACKGROUND SYSTEM_ALERT_WINDOW USE_FULL_SCREEN_INTENT; do cmd appops set --user 10 com.motorola.ccc.ota $op ignore; done'
```

接着禁止其 UID（`10320`）的后台联网：

```powershell
adb shell "cmd connectivity set-background-networking-enabled-for-uid 10320 false; cmd netpolicy add restrict-background-blacklist 10320"
```

## 备用命令：关机重启后如何一键续期

部分 Android 系统在手机完全关机重启后会清空通知休眠列表。如果以后重启手机后弹窗再次出现，插上电脑在 PowerShell 里跑这一条命令即可再次静默 1 年：

```powershell
adb shell "cmd notification snooze --for 31536000000 '0|com.motorola.ccc.ota|1729|null|10320'"
```

## 一键全部还原（恢复系统更新）

如果以后你想升级系统或安装安全补丁，执行下面这条命令即可把所有修改全部还原：

```powershell
adb shell "settings put global ota_disable_automatic_update 0; cmd appops reset com.motorola.ccc.ota; cmd connectivity set-background-networking-enabled-for-uid 10320 true; cmd netpolicy remove restrict-background-blacklist 10320; cmd notification unsnooze '0|com.motorola.ccc.ota|1729|null|10320'"
```

如果之前也限制过副空间（User 10），顺手重置一下它的 AppOps 即可：

```powershell
adb shell cmd appops reset --user 10 com.motorola.ccc.ota
```

---

> **免责声明**：本文仅供学习与技术交流参考。通过 ADB 修改系统配置或延迟系统更新存在一定风险（包括可能延迟接收官方安全补丁），请在操作前备份重要数据，自行评估并承担操作风险。
