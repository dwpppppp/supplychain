-- 第一章《供应源搜寻的基本流程》知识图谱更新 SQL
-- 使用说明：
-- 1. 将 __CHAPTER_ID__ 替换为本章在 chapters 表中的实际 id
-- 2. 本脚本适用于 MySQL 8+
-- 3. 采用“先删除本章旧数据，再插入新数据”的方式，便于重复执行

START TRANSACTION;

-- 1. 删除与本章节节点相关的旧关系
DELETE FROM knowledge_edges
WHERE source_node_id IN (
    SELECT id FROM (
        SELECT id
        FROM knowledge_nodes
        WHERE chapter_id = __CHAPTER_ID__
    ) AS chapter_nodes
)
OR target_node_id IN (
    SELECT id FROM (
        SELECT id
        FROM knowledge_nodes
        WHERE chapter_id = __CHAPTER_ID__
    ) AS chapter_nodes
);

-- 2. 删除本章节旧节点
DELETE FROM knowledge_nodes
WHERE chapter_id = __CHAPTER_ID__;

-- 3. 插入第一章知识图谱节点
INSERT INTO knowledge_nodes (
    id, title, description, icon, node_type, chapter_id, sort_order
) VALUES
('kn_ch1_001', '供应源搜寻的基本流程', '第一章根节点，概括供应源搜寻的界定、流程、供应商评估与绩效管理等核心内容。', NULL, 'chapter', __CHAPTER_ID__, 1),
('kn_ch1_002', '供应源搜寻', '指围绕采购需求识别、计划制定、供应商识别选择与合同形成的周期性过程。', NULL, 'concept', __CHAPTER_ID__, 2),
('kn_ch1_003', '战术供应源搜寻', '适用于低利润、低风险、日常性采购，强调短期反应与明确规格下的交易决策。', NULL, 'method', __CHAPTER_ID__, 3),
('kn_ch1_004', '战略供应源搜寻', '适用于高利润或高供应风险采购，强调长期、系统性分析和可持续合作。', NULL, 'method', __CHAPTER_ID__, 4),
('kn_ch1_005', '供应源搜寻六步流程', '第一章给出的基础模型，包括需求识别、计划拟定、市场分析、资格预审、报价评估与合同形成。', NULL, 'method', __CHAPTER_ID__, 5),
('kn_ch1_006', '识别需求', '由使用部门提出采购需求，并结合库存与规格对需求规模进行再次界定。', NULL, 'step', __CHAPTER_ID__, 6),
('kn_ch1_007', '拟定搜寻计划', '明确自制或外购、采购类型与规格，并梳理相关国内外政策要求。', NULL, 'step', __CHAPTER_ID__, 7),
('kn_ch1_008', '市场分析', '分析短期与长期需求、市场价格、价格趋势、潜在供应源及其安全性与风险。', NULL, 'step', __CHAPTER_ID__, 8),
('kn_ch1_009', '供应商资格预审', '依据既定标准对潜在供应商进行初步筛选，形成可参与后续采购活动的候选名单。', NULL, 'step', __CHAPTER_ID__, 9),
('kn_ch1_010', '供应商报价评估与选择', '通过询价、谈判或招投标等方式比较合格供应商报价并择优授予合同。', NULL, 'step', __CHAPTER_ID__, 10),
('kn_ch1_011', '合同或合作形成', '通过采购订单、合同或框架协议明确销售、采购与履约条款。', NULL, 'step', __CHAPTER_ID__, 11),
('kn_ch1_012', '帕累托原理', '二八法则用于识别重点供应商，帮助采购方将资源集中于高价值、高风险或高支出的关键部分。', NULL, 'tool', __CHAPTER_ID__, 12),
('kn_ch1_013', 'Kraljic采购定位矩阵', '从采购物品重要性和供应市场复杂性两个维度划分采购类别并匹配对应策略。', NULL, 'tool', __CHAPTER_ID__, 13),
('kn_ch1_014', '潜在供应商信息来源', '包括RFI、宣传资料、互联网、行业名录、会展、行业机构和采购同行交流等渠道。', NULL, 'concept', __CHAPTER_ID__, 14),
('kn_ch1_015', '供应商信息库', '用于系统存储现有、过去和潜在供应商的联系方式、能力、条款、绩效和审计结果。', NULL, 'tool', __CHAPTER_ID__, 15),
('kn_ch1_016', '供应商评估', '在合同授予前或履约过程中对供应商能力与绩效进行评价，是供应商选择与管理的重要环节。', NULL, 'concept', __CHAPTER_ID__, 16),
('kn_ch1_017', '供应商信息收集与验证', '通过问卷、财务评价、认证检查、客户推荐、工作抽样和供应商审核验证供应商信息真实性。', NULL, 'method', __CHAPTER_ID__, 17),
('kn_ch1_018', '供应商绩效管理', '围绕供应商关系、激励、绩效监控、绩效审核和持续改进展开的管理活动。', NULL, 'concept', __CHAPTER_ID__, 18),
('kn_ch1_019', '关键绩效指标', '从价格、质量、交货、服务、财务、创新和技术水平等维度衡量供应商绩效。', NULL, 'metric', __CHAPTER_ID__, 19),
('kn_ch1_020', '供应商激励', '通过财务和非财务方式鼓励供应商提升绩效，同时辅以必要惩罚机制维持最低标准。', NULL, 'method', __CHAPTER_ID__, 20);

-- 4. 插入第一章知识图谱关系
INSERT INTO knowledge_edges (
    source_node_id, target_node_id, relation_type
) VALUES
('kn_ch1_001', 'kn_ch1_002', 'contains'),
('kn_ch1_001', 'kn_ch1_003', 'contains'),
('kn_ch1_001', 'kn_ch1_004', 'contains'),
('kn_ch1_001', 'kn_ch1_005', 'contains'),
('kn_ch1_001', 'kn_ch1_012', 'contains'),
('kn_ch1_001', 'kn_ch1_013', 'contains'),
('kn_ch1_001', 'kn_ch1_014', 'contains'),
('kn_ch1_001', 'kn_ch1_015', 'contains'),
('kn_ch1_001', 'kn_ch1_016', 'contains'),
('kn_ch1_001', 'kn_ch1_017', 'contains'),
('kn_ch1_001', 'kn_ch1_018', 'contains'),
('kn_ch1_001', 'kn_ch1_019', 'contains'),
('kn_ch1_001', 'kn_ch1_020', 'contains'),

('kn_ch1_002', 'kn_ch1_003', 'contains'),
('kn_ch1_002', 'kn_ch1_004', 'contains'),
('kn_ch1_002', 'kn_ch1_005', 'contains'),

('kn_ch1_005', 'kn_ch1_006', 'contains'),
('kn_ch1_005', 'kn_ch1_007', 'contains'),
('kn_ch1_005', 'kn_ch1_008', 'contains'),
('kn_ch1_005', 'kn_ch1_009', 'contains'),
('kn_ch1_005', 'kn_ch1_010', 'contains'),
('kn_ch1_005', 'kn_ch1_011', 'contains'),

('kn_ch1_006', 'kn_ch1_007', 'prerequisite'),
('kn_ch1_007', 'kn_ch1_008', 'prerequisite'),
('kn_ch1_008', 'kn_ch1_009', 'prerequisite'),
('kn_ch1_009', 'kn_ch1_010', 'prerequisite'),
('kn_ch1_010', 'kn_ch1_011', 'prerequisite'),

('kn_ch1_012', 'kn_ch1_013', 'related'),
('kn_ch1_012', 'kn_ch1_018', 'applied_in'),
('kn_ch1_013', 'kn_ch1_004', 'applied_in'),
('kn_ch1_013', 'kn_ch1_018', 'applied_in'),

('kn_ch1_014', 'kn_ch1_015', 'related'),
('kn_ch1_014', 'kn_ch1_009', 'applied_in'),
('kn_ch1_014', 'kn_ch1_016', 'applied_in'),
('kn_ch1_015', 'kn_ch1_009', 'applied_in'),
('kn_ch1_015', 'kn_ch1_018', 'applied_in'),

('kn_ch1_016', 'kn_ch1_009', 'related'),
('kn_ch1_016', 'kn_ch1_017', 'related'),
('kn_ch1_016', 'kn_ch1_018', 'prerequisite'),
('kn_ch1_017', 'kn_ch1_016', 'applied_in'),
('kn_ch1_017', 'kn_ch1_009', 'applied_in'),

('kn_ch1_018', 'kn_ch1_019', 'contains'),
('kn_ch1_018', 'kn_ch1_020', 'contains'),
('kn_ch1_019', 'kn_ch1_020', 'related'),
('kn_ch1_019', 'kn_ch1_016', 'applied_in'),
('kn_ch1_020', 'kn_ch1_018', 'applied_in'),

('kn_ch1_003', 'kn_ch1_004', 'related'),
('kn_ch1_009', 'kn_ch1_010', 'related'),
('kn_ch1_010', 'kn_ch1_016', 'related');

COMMIT;
