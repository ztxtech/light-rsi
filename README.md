# codex-rsi

Codex 控制逻辑（RSI 循环）：把本仓库 clone 成目标项目的 `.codex_rsi/`，再由项目级 `AGENTS.md` 在每一轮开始时触发。

移植自 aion 的时间序列 RSI 控制逻辑（commit `b28f54e`），去掉全部时间序列内容，并按 Codex 的使用习惯精简：只保留主循环和两个子 Agent，其余能力交给 Codex 内置工具。

## 安装

1. clone 到目标项目根目录下的 `.codex_rsi/`：

```bash
git clone https://github.com/ztxtech/codex-rsi <项目根>/.codex_rsi
```

2. 在目标项目的 `AGENTS.md` 里加一节，让每一轮开始自动进入 RSI：

```markdown
## RSI 控制逻辑

每一轮开始前先读 `.codex_rsi/AGENTS.md`，按其中的 RSI 主循环执行：
诊断问题 → 独立诊断（复杂问题）→ 头脑风暴 → 搜索补证据 → 实现 → 独立评估 → 迭代。
需要外部信息时派 `.codex_rsi/agents/web-research.md` 的联网搜索 Agent；
复杂问题先派 `.codex_rsi/agents/evaluator.md` 的独立诊断 Agent，收口前再用它进入评估模式。
记忆三件套（`doc/tasks/PLAN.md`、`doc/tasks/STATE.md`、`trace.md`）写在项目根，
`.codex_rsi/` 内不写运行记录。
```

## 结构

| 路径 | 说明 |
| --- | --- |
| `AGENTS.md` | 主协议：RSI 循环、角色分工、记忆与 trace 必记清单、可停条件 |
| `agents/web-research.md` | 联网搜索 Agent 提示词 |
| `agents/evaluator.md` | 空白上下文独立诊断与评估 Agent 提示词 |

## 说明

- 本仓库自身的开发记录（台账、日志、决策）在 codex-rsi 工作区外层，不写进本仓库。
- `.codex_rsi/` 只放控制逻辑；运行产物、日志、缓存不进 git。
