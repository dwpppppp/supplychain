# Hooks

这里存放全局通用 hooks，只保留真正跨业务复用的能力。

建议范围：

- `use-auth.ts`
- `use-breakpoint.ts`
- `use-persisted-state.ts`

如果某个 hook 只服务单个页面，请优先放回对应的 `features/*/hooks/` 目录。
