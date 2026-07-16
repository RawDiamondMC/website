---
title: aosc-buildit-bot 用法指南
description: 但是 GitHub 上 bot 太难用了，最好还是注册一个 Telegram 账号吧（
date: 2025-07-16
categories: [AOSC]
tags: [开发]
cover: https://aosc.io/download/oma-mascot.svg
---

记录一下 aosc-buildit-bot 的用法（因为完全没有文档！），参考来源是 [buildit 的源码](https://github.com/AOSC-Dev/buildit/blob/bf5abff82bd2ad31fe4786dc7b8bbc787a6c30df/server/src/routes/webhook.rs#L66)

- @aosc-buildit-bot build [架构1, 架构2, ...]

  所有支持的架构 [source](https://github.com/AOSC-Dev/buildit/blob/bf5abff82bd2ad31fe4786dc7b8bbc787a6c30df/buildit-utils/src/lib.rs#L33)：amd64, arm64, loongarch64, loongarch64_nosimd, loongson3, ppc64el, riscv64

  别名/特殊架构：
  - noarch：相当于 debian 的 all，当包含 noarch 不能指定更多架构
  - mainline：相当于把前面这些全部指定

  考虑到 Retro 目前还是`不存在`状态，兴许将来会有更多

- @aosc-buildit-bot dickens

  给当前 pr 生成一份 Dickens-topic report
