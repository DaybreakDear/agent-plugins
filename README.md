# Agent Plugins

跨 Agent 插件**索引仓库**，用于记录插件的安装来源与适用宿主。这里只收录元数据，不复制第三方源码或本机 Pi 配置。新增插件时在 [`plugins.json`](plugins.json) 增加条目。

> 本仓库不是 Pi 插件包；不要运行 `pi install git:github.com/DaybreakDear/agent-plugins`。请使用各条目的 `install.pi` 命令。安装插件前应检查其代码和权限，尤其是网络、文件及浏览器访问能力。

| 插件 | 类型 | 适用 Agent | Pi 安装命令 |
| --- | --- | --- | --- |
| [billion-context-pi](https://github.com/ranxianglei/billion-context-pi) | Pi 专用 | Pi | `pi install npm:billion-context-pi` |
| [pi-web-access](https://github.com/nicobailon/pi-web-access) | 多 Agent | Pi；其他支持 MCP 的客户端 | `pi install npm:pi-web-access` |
| [rpiv-ask-user-question](https://github.com/juicesharp/rpiv-mono/tree/main/packages/rpiv-ask-user-question) | Pi 专用 | Pi | `pi install npm:@juicesharp/rpiv-ask-user-question` |
| [pi-sandbox](https://github.com/carderne/pi-sandbox) | Pi 专用 | Pi | `pi install npm:pi-sandbox` |
| [pi-open-tui](https://github.com/DaybreakDear/pi-open-tui) | Pi 专用 | Pi | `pi install https://github.com/DaybreakDear/pi-open-tui` |

`pi-web-access` 除 Pi 扩展外还提供 MCP server；**其他 Agent 的接入方法请参考其上游文档**，不能直接使用 Pi 的安装命令。

## 兼容性标记

- `compatibility: "pi-only"`：当前有证据表明插件只能直接在 Pi 中运行。
- `compatibility: "multi-agent"`：提供可供其他 Agent 使用的独立协议/入口（如 MCP）；仍需配置相应客户端。
- `agents` 列出已确认的宿主/协议；仅改名或复用功能不算已适配。
- `install` 按宿主分别列出命令或文档链接；新增条目时填写上游、许可证、兼容性与安装信息，并运行 `node scripts/validate.mjs`。

请不要把 `~/.pi/agent/settings.json`、授权文件、会话日志、沙盒白名单或任何凭据提交到这里。

[Skill 索引：skills-marketplace](https://github.com/DaybreakDear/skills-marketplace)
