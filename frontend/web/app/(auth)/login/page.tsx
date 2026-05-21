import { AuthAccessPanel } from "../../../features/auth/components/auth-access-panel";

export default function LoginPage() {
  return (
    <main className="page-shell">
      <section className="auth-shell">
        <div className="auth-brand">
          <h1 className="headline">供应链导源课程平台</h1>
          <p className="body-copy">
            围绕供应链导源课程内容，完成课程学习、知识梳理、AI 辅助答疑与采购寻源实训。建议登录后开始学习，平台会为你保留学习进度和实训记录。
          </p>

          <div className="token-list">
            <div className="token-item">
              <div className="token-name">课程学习</div>
              <div className="token-value">阅读章节文档，理解供应商选择、市场分析、报价与招标等核心知识。</div>
            </div>
            <div className="token-item">
              <div className="token-name">助学支持</div>
              <div className="token-value">通过知识图谱、AI 助教和数字人助教，快速回顾概念并提出课程相关问题。</div>
            </div>
            <div className="token-item">
              <div className="token-name">模拟实训</div>
              <div className="token-value">在采购寻源案例中完成供应商筛选、商务谈判、报价确认和复盘总结。</div>
            </div>
          </div>
        </div>

        <AuthAccessPanel variant="page" initialMode="login" />
      </section>
      <footer className="site-icp">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
          沪ICP备2024080226号
        </a>
      </footer>
    </main>
  );
}
