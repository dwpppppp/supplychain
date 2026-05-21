import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <section className="legal-shell">
        <Link className="legal-back" href="/login">
          返回登录
        </Link>
        <header className="legal-header">
          <div className="eyebrow">数据说明</div>
          <h1>隐私政策</h1>
          <p>说明平台在课程学习、AI 助学、知识图谱和模拟实训过程中会记录和使用哪些数据。</p>
        </header>

        <article className="legal-card">
          <section>
            <h2>一、我们收集的信息</h2>
            <p>
              平台可能收集账号昵称、登录状态、课程章节进度、学习笔记、知识图谱访问记录、AI 对话内容、数字人助教输入内容、实训提交结果、实训评分和必要的系统日志。
            </p>
          </section>

          <section>
            <h2>二、信息使用目的</h2>
            <p>
              这些信息用于账号识别、保存学习进度、恢复会话历史、生成 AI 回答、记录实训过程、展示学习结果、支持教学分析和排查系统问题。
            </p>
          </section>

          <section>
            <h2>三、AI 输入提示</h2>
            <p>
              用户在 AI 助学、划词提问和数字人助教中输入的文本，可能会被用于生成回答和保存对话历史。请勿输入身份证号、银行卡号、密码、个人联系方式等敏感个人信息。
            </p>
          </section>

          <section>
            <h2>四、信息共享</h2>
            <p>
              平台不会主动向无关第三方出售或公开个人学习数据。课程教师、管理员或维护人员可能在教学管理、问题排查和课程改进范围内查看必要数据。
            </p>
          </section>

          <section>
            <h2>五、数据保存与安全</h2>
            <p>
              平台会在课程运行和教学管理需要的期限内保存学习记录，并通过登录验证、权限控制和数据库访问管理降低数据泄露风险。但任何系统都无法保证绝对安全，用户也应妥善保管账号密码。
            </p>
          </section>

          <section>
            <h2>六、用户权利</h2>
            <p>
              如需查询、更正或删除与自己账号相关的学习记录、对话记录或实训记录，可联系课程管理员或平台维护人员。在不影响课程管理和必要留痕的前提下，平台会协助处理。
            </p>
          </section>

          <section>
            <h2>七、政策更新</h2>
            <p>
              当平台功能、数据使用方式或课程管理要求发生变化时，隐私政策可能同步更新。继续使用平台视为已了解更新后的内容。
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}
