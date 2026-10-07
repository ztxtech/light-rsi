# codex-rsi 仓库开发规则（.repo）

本仓库只放产品代码（`harness/`）。开发记录写在外层工作区，不进本仓库：

- 稳定规则：`../AGENTS.md`
- 操作日志：`../trace.md`
- 待办与现状：`../doc/tasks/PLAN.md`、`../doc/tasks/STATE.md`

## 改造对象

`harness/` 是从 aion（commit `b28f54e`）移植并精简的 Codex 控制逻辑。改它的原则：

- 保持主循环与两个子 Agent（联网搜索 / 评估）的骨架。
- 不重新引入已精简掉的角色、协议、技能库和记忆模板；新增能力先判断 Codex 是否内置。
- 新增内容优先写进现有三个文件（`harness/AGENTS.md` + `harness/agents/*.md`），不为小需求新增文件。

## 提交纪律

- 每个稳定步骤及时 commit；一次提交只包含本轮相关文件。
- commit message 用 `type: 简短说明`（type 用英文，说明可用中文）。
- 不提交运行产物、日志、缓存、密钥；大文件不进 git。
