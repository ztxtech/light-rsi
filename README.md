# codex-rsi

Codex 控制逻辑（RSI 循环）的开发仓库。

移植自 aion 的时间序列 RSI 控制逻辑（commit `b28f54e`），去掉全部时间序列内容，并按 Codex 的使用习惯做了大幅精简：只保留主循环和两个子 Agent，其余能力交给 Codex 内置工具。

## 结构

| 路径 | 说明 |
| --- | --- |
| `harness/AGENTS.md` | 主协议：RSI 循环、角色分工、记忆三件套、可停条件 |
| `harness/agents/web-research.md` | 联网搜索 Agent 提示词 |
| `harness/agents/evaluator.md` | 空白上下文评估 Agent 提示词 |
| `AGENTS.md` | 本仓库自身的开发规则（开发记录在外层，仓库只放代码） |

## 使用

把 `harness/` 里的内容拷到目标项目根目录（`AGENTS.md` 放项目根，`agents/` 一并放入）。之后对着 Codex 说需求即可：主 Agent 按循环迭代推进，需要外部信息时派联网搜索 Agent，收口前派评估 Agent 独立核验。

## 开发

- 开发记录（待办、现状、操作日志、决策）在本仓库外的工作区，不写进本仓库。
- 仓库只放控制逻辑与说明；运行产物、日志、缓存不进 git。
