from sqlalchemy import func, select

from app.core.database import AsyncSessionLocal
from app.models.models import (
    TrainingCase,
    TrainingCaseNegotiationOption,
    TrainingCaseNegotiationSupplier,
    TrainingStepConfig,
    TrainingSupplier,
)


DEFAULT_NEGOTIATION_OPTIONS = [
    (1, "我们希望先确认年度合作框架。如果首批按计划稳定供货,能否把单价下调 0.40 元/kg?", "年度框架可以降低排产波动,这部分成本我们可以让出 0.40 元/kg。", "price", -0.40),
    (1, "本次新品上市节奏紧,我们更看重交付稳定。价格先不压,请你们承诺锁产能。", "可以锁定首批产能,但价格和账期暂时保持原条件。", "price", 0),
    (1, "我们直接要求降价 1.20 元/kg,否则会优先考虑其他供应商。", "这个降幅超出成本空间,我们只能象征性下调 0.10 元/kg。", "price", -0.10),
    (2, "如果我们把年度预测量提前给到你们,付款账期能否从 30 天延长到 45 天?", "有明确滚动预测的话,我们可以接受 45 天账期。", "payment_days", 15),
    (2, "账期不变,但希望你们承担首批到仓后的复检等待成本。", "复检等待成本不可控,我们只能维持原账期和费用边界。", "payment_days", 0),
    (2, "我们希望账期直接延长到 60 天,作为进入供应商池的条件。", "60 天会明显增加资金压力,暂时无法接受。", "payment_days", 0),
    (3, "新品首批风险高,请把质量保证期从 12 个月延长到 18 个月。", "只要仓储条件符合要求,我们可以把质保延长到 18 个月。", "warranty_months", 6),
    (3, "我们不改质保,但要求每批随货提供 COA 和糖度检测记录。", "检测资料可以随货提供,但质保周期保持 12 个月。", "warranty_months", 0),
    (3, "请承诺 24 个月质保,否则我们会担心食品安全责任。", "24 个月超出产品稳定性验证范围,我们不能承诺。", "warranty_months", 0),
    (4, "若我们接受你们推荐的标准包装规格,单价还能否再下调 0.30 元/kg?", "标准包装能减少换线损耗,可以再降 0.30 元/kg。", "price", -0.30),
    (4, "我们希望保持定制包装,同时获得同等降价。", "定制包装会增加换线和备料成本,无法按标准包装降价。", "price", 0),
    (4, "我们要求你们承担全部运输费用,单价不变。", "运输费用受区域和批次影响较大,无法全部承担。", "price", 0),
    (5, "如果最终条款一次性确认,请在报价单中再给 0.20 元/kg 的合作让利。", "为了推进长期合作,我们可以做最后 0.20 元/kg 让利。", "price", -0.20),
    (5, "价格不再调整,但请把账期再延长 10 天。", "在当前价格基础上,账期最多维持已确认条件。", "payment_days", 0),
    (5, "请同时降价、延长账期、延长质保,否则我们不会签约。", "一次性叠加三项让步风险太高,我们无法接受这样的收口方式。", "price", 0),
]

DEFAULT_QUOTE_SPEC_SCHEMA = {
    "specs": [
        {
            "orderIndex": 1,
            "fieldKey": "brix",
            "label": "糖度要求",
            "value": "65",
            "unit": "Brix",
            "requirementType": "quality",
            "inputType": "number",
            "numericMin": 65,
            "isRequired": True,
        },
        {
            "orderIndex": 2,
            "fieldKey": "preservative",
            "label": "防腐剂要求",
            "value": "no_artificial",
            "requirementType": "compliance",
            "inputType": "select",
            "expectedValue": "no_artificial",
            "options": [
                {"label": "不得使用人工防腐剂", "value": "no_artificial"},
                {"label": "允许使用合规防腐剂", "value": "allowed_legal"},
                {"label": "未明确限制", "value": "not_specified"},
            ],
            "isRequired": True,
        },
        {
            "orderIndex": 3,
            "fieldKey": "food_standard",
            "label": "执行标准",
            "value": "gb2760",
            "requirementType": "compliance",
            "inputType": "select",
            "expectedValue": "gb2760",
            "options": [
                {"label": "符合 GB 2760", "value": "gb2760"},
                {"label": "按供应商企业标准", "value": "supplier_standard"},
                {"label": "未明确执行标准", "value": "not_specified"},
            ],
            "isRequired": True,
        },
        {
            "orderIndex": 4,
            "fieldKey": "certification",
            "label": "供应商认证",
            "value": "haccp_iso22000_valid",
            "requirementType": "qualification",
            "inputType": "select",
            "expectedValue": "haccp_iso22000_valid",
            "options": [
                {"label": "HACCP 与 ISO22000 均在有效期内", "value": "haccp_iso22000_valid"},
                {"label": "仅 HACCP 有效", "value": "haccp_only"},
                {"label": "仅 ISO22000 有效", "value": "iso22000_only"},
            ],
            "isRequired": True,
        },
        {
            "orderIndex": 5,
            "fieldKey": "inspection_documents",
            "label": "验收资料",
            "value": "coa_test_production_date",
            "requirementType": "document",
            "inputType": "select",
            "expectedValue": "coa_test_production_date",
            "options": [
                {"label": "COA、批次检测报告和生产日期记录", "value": "coa_test_production_date"},
                {"label": "仅提供 COA", "value": "coa_only"},
                {"label": "到货后按需补充资料", "value": "provide_on_request"},
            ],
            "isRequired": True,
        },
        {
            "orderIndex": 6,
            "fieldKey": "shelf_life",
            "label": "保质与追溯",
            "value": "",
            "unit": "%",
            "requirementType": "traceability",
            "inputType": "number",
            "numericMin": 67,
            "numericMax": 100,
            "isRequired": True,
        },
    ]
}

MOTOR_CASE = {
    "slug": "motor",
    "title": "电机采购寻源实训",
    "category": "industrial",
    "difficulty": 2,
    "status": "published",
    "total_steps": 5,
    "max_attempts": 4,
    "background": (
        "公司计划为新增自动包装线采购三相异步电机，预计年需求 80 台。"
        "设备部门要求额定功率不低于 5.5 kW，额定电压 380 V，能效等级达到 IE3，"
        "防护等级不低于 IP55，绝缘等级不低于 F 级。首批 20 台需在合同签署后 30 天内到厂，"
        "采购单价目标不超过 1,250 元/台，优先争取 45 天账期。"
        "质量部门要求供应商具备 ISO9001 认证，产品需提供 CCC 认证、出厂检测报告和电机铭牌参数记录。"
        "此前曾出现供应商交付的样机温升偏高，导致产线调试延期，因此本次要求质保期不少于 18 个月。"
    ),
    "objective": "完成工业电机采购中的需求识别、供应商筛选、商务谈判、结构化报价和复盘评分。",
    "cover_image_url": "/static/training/training2.svg",
    "scoring_weights": {
        "compliance": 0.25,
        "quality": 0.25,
        "cost": 0.25,
        "delivery": 0.15,
        "negotiation": 0.1,
    },
    "case_config": {
        "trainingLabel": "电机采购寻源实训",
        "unitPriceUnit": "台",
        "quoteDefaults": {
            "category": "工业品",
            "itemName": "三相异步电机",
            "annualQuantity": "80",
            "unit": "台",
            "deliveryCycle": "30",
            "quoteValidity": "30",
            "taxMode": "含税含运",
            "remarks": "供应商需提供 ISO9001、CCC 认证文件，随货提供出厂检测报告和铭牌参数记录。",
        },
        "quoteOptions": {
            "category": ["工业品", "设备备件", "机电物料"],
            "itemName": ["三相异步电机", "变频电机", "伺服电机"],
            "unit": ["台", "套", "件"],
        },
    },
}

MOTOR_QUOTE_SPEC_SCHEMA = {
    "specs": [
        {
            "orderIndex": 1,
            "fieldKey": "power_kw",
            "label": "额定功率",
            "value": "5.5",
            "unit": "kW",
            "requirementType": "technical",
            "inputType": "number",
            "numericMin": 5.5,
            "isRequired": True,
        },
        {
            "orderIndex": 2,
            "fieldKey": "voltage",
            "label": "额定电压",
            "value": "380",
            "unit": "V",
            "requirementType": "technical",
            "inputType": "number",
            "numericMin": 380,
            "numericMax": 380,
            "isRequired": True,
        },
        {
            "orderIndex": 3,
            "fieldKey": "efficiency_grade",
            "label": "能效等级",
            "value": "ie3",
            "requirementType": "energy",
            "inputType": "select",
            "expectedValue": "ie3",
            "options": [
                {"label": "IE3 及以上", "value": "ie3"},
                {"label": "IE2", "value": "ie2"},
                {"label": "未明确能效等级", "value": "not_specified"},
            ],
            "isRequired": True,
        },
        {
            "orderIndex": 4,
            "fieldKey": "protection_grade",
            "label": "防护等级",
            "value": "ip55",
            "requirementType": "quality",
            "inputType": "select",
            "expectedValue": "ip55",
            "options": [
                {"label": "IP55 及以上", "value": "ip55"},
                {"label": "IP44", "value": "ip44"},
                {"label": "未明确防护等级", "value": "not_specified"},
            ],
            "isRequired": True,
        },
        {
            "orderIndex": 5,
            "fieldKey": "certification",
            "label": "认证资料",
            "value": "iso9001_ccc",
            "requirementType": "qualification",
            "inputType": "select",
            "expectedValue": "iso9001_ccc",
            "options": [
                {"label": "ISO9001 与 CCC 均有效", "value": "iso9001_ccc"},
                {"label": "仅 ISO9001 有效", "value": "iso9001_only"},
                {"label": "仅提供企业合格证", "value": "factory_only"},
            ],
            "isRequired": True,
        },
        {
            "orderIndex": 6,
            "fieldKey": "warranty_months",
            "label": "质保要求",
            "value": "18",
            "unit": "月",
            "requirementType": "warranty",
            "inputType": "number",
            "numericMin": 18,
            "numericMax": 36,
            "isRequired": True,
        },
    ]
}

MOTOR_STEPS = [
    {
        "step": 1,
        "step_key": "case_brief",
        "title": "需求分析",
        "scene_description": "阅读电机采购需求说明，理解核心规格、交付和资质约束。",
        "interaction_type": "read",
        "sort_order": 1,
        "form_schema": None,
        "scoring_rules": {"score": 100},
        "resources": {"cover_image_url": MOTOR_CASE["cover_image_url"]},
    },
    {
        "step": 2,
        "step_key": "market_sourcing",
        "title": "市场寻源",
        "scene_description": "从候选电机供应商中筛选一家最适合进入谈判。",
        "interaction_type": "supplier_select",
        "sort_order": 2,
        "form_schema": None,
        "scoring_rules": {"qualified_supplier_score": 100, "unqualified_supplier_score": 0},
        "resources": None,
    },
    {
        "step": 3,
        "step_key": "negotiation",
        "title": "商务谈判",
        "scene_description": "围绕单价、账期和质保进行 5 轮谈判。",
        "interaction_type": "option_dialogue",
        "sort_order": 3,
        "form_schema": None,
        "scoring_rules": {"price": 60, "payment": 20, "warranty": 20},
        "resources": None,
    },
    {
        "step": 4,
        "step_key": "purchase_quote",
        "title": "采购报价单",
        "scene_description": "把谈判结果写入结构化电机采购报价单。",
        "interaction_type": "quote_form",
        "sort_order": 4,
        "form_schema": MOTOR_QUOTE_SPEC_SCHEMA,
        "scoring_rules": {"required_specs": 6},
        "resources": None,
    },
    {
        "step": 5,
        "step_key": "review",
        "title": "决策复盘",
        "scene_description": "查看寻源、谈判和报价单综合结果。",
        "interaction_type": "report",
        "sort_order": 5,
        "form_schema": None,
        "scoring_rules": None,
        "resources": None,
    },
]

MOTOR_SUPPLIERS = [
    {
        "code": "A",
        "name": "华东电机科技",
        "location": "江苏苏州",
        "certifications": ["ISO9001", "CCC", "IE3 检测报告"],
        "capacity": "月产 600 台，支持 30 天首批交付",
        "price_text": "¥1,180 / 台",
        "brief": "自动化产线电机供应商，具备 IE3 系列量产经验，检测资料完整，交付记录稳定。",
        "risk_note": "资料齐全，交付与价格均符合本次采购要求。",
        "supplier_type": "motor",
        "is_candidate": True,
        "is_qualified": True,
        "is_recommended": True,
        "sort_order": 1,
        "profile": {"founded": 2012, "employees": 260, "focus": "IE3 工业电机"},
        "latitude": 31.2989,
        "longitude": 120.5853,
        "image_url": "/static/training/suppliers/motor_a.svg",
    },
    {
        "code": "B",
        "name": "津北驱动设备",
        "location": "天津",
        "certifications": ["ISO9001"],
        "capacity": "月产 420 台，首批预计 28 天",
        "price_text": "¥1,120 / 台",
        "brief": "价格低，但本批 IE3 电机 CCC 认证资料仍在换证中，批量供货存在合规风险。",
        "risk_note": "CCC 资料不完整，不满足质量部门要求。",
        "supplier_type": "motor",
        "is_candidate": True,
        "is_qualified": False,
        "is_recommended": False,
        "sort_order": 2,
        "profile": {"risk": "CCC 换证中"},
        "latitude": 39.3434,
        "longitude": 117.3616,
        "image_url": "/static/training/suppliers/motor_b.svg",
    },
    {
        "code": "C",
        "name": "南岭机电制造",
        "location": "广东佛山",
        "certifications": ["ISO9001", "CCC"],
        "capacity": "月产 300 台，首批交付 42 天",
        "price_text": "¥1,260 / 台",
        "brief": "技术资料较完整，但价格超过目标上限，且首批交付周期无法满足 30 天要求。",
        "risk_note": "价格与交付均偏离本次要求。",
        "supplier_type": "motor",
        "is_candidate": True,
        "is_qualified": False,
        "is_recommended": False,
        "sort_order": 3,
        "profile": {"risk": "交付周期偏长"},
        "latitude": 23.0215,
        "longitude": 113.1214,
        "image_url": "/static/training/suppliers/motor_c.svg",
    },
    {
        "code": "D",
        "name": "皖江智能电机",
        "location": "安徽芜湖",
        "certifications": ["ISO9001", "CCC", "IP55 测试报告"],
        "capacity": "月产 500 台，首批 30 天",
        "price_text": "¥1,205 / 台",
        "brief": "交付稳定，IP55 与绝缘等级资料完整，价格略高于华东电机但仍在目标范围内。",
        "risk_note": "符合核心要求，可作为谈判候选。",
        "supplier_type": "motor",
        "is_candidate": True,
        "is_qualified": True,
        "is_recommended": False,
        "sort_order": 4,
        "profile": {"focus": "包装设备电机"},
        "latitude": 31.3525,
        "longitude": 118.4331,
        "image_url": "/static/training/suppliers/motor_d.svg",
    },
    {
        "code": "E",
        "name": "海西工控动力",
        "location": "浙江宁波",
        "certifications": ["ISO9001", "CCC"],
        "capacity": "月产 520 台，首批 25 天",
        "price_text": "¥1,150 / 台",
        "brief": "响应速度快，但当前标准质保仅 12 个月，且 IP55 测试报告无法覆盖本次型号。",
        "risk_note": "质保与防护等级证明不足。",
        "supplier_type": "motor",
        "is_candidate": True,
        "is_qualified": False,
        "is_recommended": False,
        "sort_order": 5,
        "profile": {"risk": "质保短"},
        "latitude": 29.8683,
        "longitude": 121.5440,
        "image_url": "/static/training/suppliers/motor_e.svg",
    },
    {
        "code": "F",
        "name": "中原电机装备",
        "location": "河南郑州",
        "certifications": ["ISO9001", "CCC", "IE3 检测报告"],
        "capacity": "月产 700 台，首批 30 天",
        "price_text": "¥1,235 / 台",
        "brief": "产能充足，认证资料完整，价格接近上限但有账期谈判空间。",
        "risk_note": "符合核心要求，可作为备选谈判对象。",
        "supplier_type": "motor",
        "is_candidate": True,
        "is_qualified": True,
        "is_recommended": False,
        "sort_order": 6,
        "profile": {"focus": "批量工业电机"},
        "latitude": 34.7466,
        "longitude": 113.6254,
        "image_url": "/static/training/suppliers/motor_f.svg",
    },
]

MOTOR_NEGOTIATION_SUPPLIERS = [
    {"supplier_code": "A", "supplier_name": "华东电机科技", "init_price": 1180, "init_payment_days": 30, "init_warranty_months": 18},
    {"supplier_code": "D", "supplier_name": "皖江智能电机", "init_price": 1205, "init_payment_days": 30, "init_warranty_months": 18},
    {"supplier_code": "F", "supplier_name": "中原电机装备", "init_price": 1235, "init_payment_days": 30, "init_warranty_months": 18},
]

MOTOR_NEGOTIATION_OPTIONS = [
    (1, "我们可以给出全年 80 台预测并优先锁定首批 20 台，单价能否下调 60 元/台?", "年度预测能降低排产不确定性，我们可以下调 60 元/台。", "price", -60),
    (1, "价格暂不调整，但请你们承诺 30 天内完成首批交付。", "首批交付可以锁定，但价格条件暂时保持不变。", "price", 0),
    (1, "我们直接要求降价 180 元/台，否则会转向低价供应商。", "这个降幅超过成本空间，只能象征性下调 20 元/台。", "price", -20),
    (2, "如果我们提供滚动排产计划，付款账期能否从 30 天延长到 45 天?", "有稳定排产计划的话，可以接受 45 天账期。", "payment_days", 15),
    (2, "账期不变，但希望你们承担到厂抽检等待期间的仓储费用。", "抽检等待成本不可控，费用边界暂时无法扩大。", "payment_days", 0),
    (2, "进入合格供应商池的条件是账期 60 天，请直接确认。", "60 天账期会明显增加资金压力，暂时无法接受。", "payment_days", 0),
    (3, "考虑到前期样机温升风险，请把质保从 18 个月延长到 24 个月。", "如果使用环境符合铭牌参数，我们可以把质保延长到 24 个月。", "warranty_months", 6),
    (3, "质保不变，但每批必须提供出厂检测报告和铭牌参数记录。", "检测报告和铭牌参数记录可以随货提供，质保保持 18 个月。", "warranty_months", 0),
    (3, "请承诺 36 个月质保，否则我们无法承担产线停机风险。", "36 个月超出当前型号验证范围，暂时无法承诺。", "warranty_months", 0),
    (4, "若我们接受你们标准安装法兰和接线盒方向，单价还能否再降 35 元/台?", "标准配置可以减少改制成本，我们可以再下调 35 元/台。", "price", -35),
    (4, "我们要求定制铭牌和特殊喷涂，同时获得同等降价。", "定制铭牌和喷涂会增加小批量成本，无法按标准配置降价。", "price", 0),
    (4, "请你们承担全部运输和卸货费用，单价不变。", "长途运输和卸货费用波动较大，无法全部承担。", "price", 0),
    (5, "如果今天确认最终条款，请在报价单中再给 25 元/台项目让利。", "为了推进合作，我们可以做最后 25 元/台让利。", "price", -25),
    (5, "价格不再调整，但请把账期再延长 10 天。", "在当前价格基础上，账期最多维持已确认条件。", "payment_days", 0),
    (5, "请同时降价、延长账期、延长质保，否则本轮不会定点。", "一次性叠加三项让步风险太高，我们无法接受这样的收口方式。", "price", 0),
]

DANGEROUS_GOODS_CASE = {
    "slug": "dangerous_goods",
    "title": "危险品采购寻源实训",
    "category": "industrial",
    "difficulty": 3,
    "status": "published",
    "total_steps": 5,
    "max_attempts": 4,
    "background": (
        "公司计划采购 2-丙醇（异丙醇，IPA）用于电子清洗工序，预计年需求 60 吨。"
        "安全环保部要求产品纯度不低于 99.8%，水分不高于 0.2%，必须提供中文 SDS、COA、危化品安全标签和批次追溯记录。"
        "供应商需具备危险化学品经营许可，承运方需具备危险货物道路运输资质，包装需使用 UN 认证包装并满足第 3 类易燃液体运输要求。"
        "首批 8 吨需在合同签署后 20 天内到厂，采购单价目标不超过 8,200 元/吨，优先争取 30 天账期。"
        "此前有供应商因 SDS 版本过期和运输车辆资质不符导致入厂受阻，因此本次把合规资料完整性作为准入条件。"
    ),
    "objective": "完成危险化学品采购中的合规识别、供应商筛选、商务谈判、报价单填写和复盘评分。",
    "cover_image_url": "/static/training/training3.svg",
    "scoring_weights": {
        "compliance": 0.35,
        "quality": 0.2,
        "cost": 0.2,
        "delivery": 0.15,
        "negotiation": 0.1,
    },
    "case_config": {
        "trainingLabel": "危险品采购寻源实训",
        "unitPriceUnit": "吨",
        "quoteDefaults": {
            "category": "危化品",
            "itemName": "2-丙醇（IPA）",
            "annualQuantity": "60",
            "unit": "吨",
            "deliveryCycle": "20",
            "quoteValidity": "15",
            "taxMode": "含税含危运",
            "remarks": "供应商需提供危化品经营许可、中文 SDS、COA、安全标签、UN 包装证明及承运资质文件。",
        },
        "quoteOptions": {
            "category": ["危化品", "化工原料", "电子化学品"],
            "itemName": ["2-丙醇（IPA）", "乙醇", "丙酮"],
            "unit": ["吨", "桶", "千克"],
        },
    },
}

DANGEROUS_GOODS_QUOTE_SPEC_SCHEMA = {
    "specs": [
        {
            "orderIndex": 1,
            "fieldKey": "purity",
            "label": "产品纯度",
            "value": "99.8",
            "unit": "%",
            "requirementType": "quality",
            "inputType": "number",
            "numericMin": 99.8,
            "numericMax": 100,
            "isRequired": True,
        },
        {
            "orderIndex": 2,
            "fieldKey": "water_content",
            "label": "水分上限",
            "value": "0.2",
            "unit": "%",
            "requirementType": "quality",
            "inputType": "number",
            "numericMin": 0,
            "numericMax": 0.2,
            "isRequired": True,
        },
        {
            "orderIndex": 3,
            "fieldKey": "supplier_permit",
            "label": "经营许可",
            "value": "hazchem_permit_valid",
            "requirementType": "compliance",
            "inputType": "select",
            "expectedValue": "hazchem_permit_valid",
            "options": [
                {"label": "危险化学品经营许可有效", "value": "hazchem_permit_valid"},
                {"label": "仅普通化工品经营资质", "value": "general_chemical"},
                {"label": "许可文件待补充", "value": "pending"},
            ],
            "isRequired": True,
        },
        {
            "orderIndex": 4,
            "fieldKey": "transport_qualification",
            "label": "危运资质",
            "value": "licensed_hazmat_transport",
            "requirementType": "logistics",
            "inputType": "select",
            "expectedValue": "licensed_hazmat_transport",
            "options": [
                {"label": "承运方具备危险货物道路运输资质", "value": "licensed_hazmat_transport"},
                {"label": "供应商自提普通货车运输", "value": "ordinary_transport"},
                {"label": "运输资质待确认", "value": "pending"},
            ],
            "isRequired": True,
        },
        {
            "orderIndex": 5,
            "fieldKey": "documents",
            "label": "随货资料",
            "value": "sds_coa_label_trace",
            "requirementType": "document",
            "inputType": "select",
            "expectedValue": "sds_coa_label_trace",
            "options": [
                {"label": "中文 SDS、COA、安全标签和批次追溯记录齐全", "value": "sds_coa_label_trace"},
                {"label": "仅提供 COA 和安全标签", "value": "coa_label_only"},
                {"label": "SDS 到货后补发", "value": "sds_later"},
            ],
            "isRequired": True,
        },
        {
            "orderIndex": 6,
            "fieldKey": "un_packaging",
            "label": "包装要求",
            "value": "un_certified",
            "requirementType": "packaging",
            "inputType": "select",
            "expectedValue": "un_certified",
            "options": [
                {"label": "UN 认证包装，适配第 3 类易燃液体", "value": "un_certified"},
                {"label": "普通镀锌桶包装", "value": "ordinary_drum"},
                {"label": "包装证明待补充", "value": "pending"},
            ],
            "isRequired": True,
        },
    ]
}

DANGEROUS_GOODS_STEPS = [
    {
        "step": 1,
        "step_key": "case_brief",
        "title": "需求分析",
        "scene_description": "阅读危险品采购需求说明，识别质量、合规、运输和资料要求。",
        "interaction_type": "read",
        "sort_order": 1,
        "form_schema": None,
        "scoring_rules": {"score": 100},
        "resources": {"cover_image_url": DANGEROUS_GOODS_CASE["cover_image_url"]},
    },
    {
        "step": 2,
        "step_key": "market_sourcing",
        "title": "市场寻源",
        "scene_description": "从候选危险品供应商中筛选合规供应商。",
        "interaction_type": "supplier_select",
        "sort_order": 2,
        "form_schema": None,
        "scoring_rules": {"qualified_supplier_score": 100, "unqualified_supplier_score": 0},
        "resources": None,
    },
    {
        "step": 3,
        "step_key": "negotiation",
        "title": "商务谈判",
        "scene_description": "围绕价格、账期和合规服务边界进行 5 轮谈判。",
        "interaction_type": "option_dialogue",
        "sort_order": 3,
        "form_schema": None,
        "scoring_rules": {"price": 60, "payment": 20, "warranty": 20},
        "resources": None,
    },
    {
        "step": 4,
        "step_key": "purchase_quote",
        "title": "采购报价单",
        "scene_description": "把谈判结果写入危险品结构化报价单。",
        "interaction_type": "quote_form",
        "sort_order": 4,
        "form_schema": DANGEROUS_GOODS_QUOTE_SPEC_SCHEMA,
        "scoring_rules": {"required_specs": 6},
        "resources": None,
    },
    {
        "step": 5,
        "step_key": "review",
        "title": "决策复盘",
        "scene_description": "查看危险品采购的合规、谈判和报价结果。",
        "interaction_type": "report",
        "sort_order": 5,
        "form_schema": None,
        "scoring_rules": None,
        "resources": None,
    },
]

DANGEROUS_GOODS_SUPPLIERS = [
    {
        "code": "A",
        "name": "华安化学品供应",
        "location": "江苏南京",
        "certifications": ["危化品经营许可", "ISO9001", "SDS/COA 齐全"],
        "capacity": "月供 120 吨，首批 18 天",
        "price_text": "¥8,050 / 吨",
        "brief": "电子级 IPA 稳定供应商，危化经营许可、中文 SDS、COA、安全标签和危运合作资料完整。",
        "risk_note": "资质、价格和交付均符合本次准入要求。",
        "supplier_type": "dangerous_goods",
        "is_candidate": True,
        "is_qualified": True,
        "is_recommended": True,
        "sort_order": 1,
        "profile": {"focus": "电子化学品", "hazmat_class": "第 3 类易燃液体"},
        "latitude": 32.0603,
        "longitude": 118.7969,
        "image_url": "/static/training/suppliers/hazmat_a.svg",
    },
    {
        "code": "B",
        "name": "北辰化工贸易",
        "location": "天津",
        "certifications": ["ISO9001"],
        "capacity": "月供 90 吨，首批 15 天",
        "price_text": "¥7,860 / 吨",
        "brief": "报价较低，但危险化学品经营许可正在续期，当前无法提供有效许可扫描件。",
        "risk_note": "危化品经营许可不完整，不满足准入要求。",
        "supplier_type": "dangerous_goods",
        "is_candidate": True,
        "is_qualified": False,
        "is_recommended": False,
        "sort_order": 2,
        "profile": {"risk": "许可续期中"},
        "latitude": 39.0842,
        "longitude": 117.2009,
        "image_url": "/static/training/suppliers/hazmat_b.svg",
    },
    {
        "code": "C",
        "name": "粤安新材料",
        "location": "广东东莞",
        "certifications": ["危化品经营许可", "ISO9001", "COA"],
        "capacity": "月供 80 吨，首批 28 天",
        "price_text": "¥8,300 / 吨",
        "brief": "质量资料较完整，但报价超过目标上限，且首批交付周期不能满足 20 天要求。",
        "risk_note": "价格与交付偏离本次要求。",
        "supplier_type": "dangerous_goods",
        "is_candidate": True,
        "is_qualified": False,
        "is_recommended": False,
        "sort_order": 3,
        "profile": {"risk": "交付周期偏长"},
        "latitude": 23.0207,
        "longitude": 113.7518,
        "image_url": "/static/training/suppliers/hazmat_c.svg",
    },
    {
        "code": "D",
        "name": "江浙危化物流联供",
        "location": "浙江嘉兴",
        "certifications": ["危化品经营许可", "危运合作资质", "SDS/COA"],
        "capacity": "月供 100 吨，首批 20 天",
        "price_text": "¥8,120 / 吨",
        "brief": "供应与危运服务一体化，资料齐全，交付刚好满足要求，价格在目标范围内。",
        "risk_note": "符合核心要求，可作为谈判候选。",
        "supplier_type": "dangerous_goods",
        "is_candidate": True,
        "is_qualified": True,
        "is_recommended": False,
        "sort_order": 4,
        "profile": {"focus": "危化品供应与配送"},
        "latitude": 30.7461,
        "longitude": 120.7555,
        "image_url": "/static/training/suppliers/hazmat_d.svg",
    },
    {
        "code": "E",
        "name": "川渝溶剂材料",
        "location": "重庆",
        "certifications": ["危化品经营许可", "ISO9001"],
        "capacity": "月供 110 吨，首批 22 天",
        "price_text": "¥7,980 / 吨",
        "brief": "价格有优势，但当前仅能提供英文 SDS，中文 SDS 需额外翻译审核。",
        "risk_note": "中文 SDS 不完整，入厂合规风险高。",
        "supplier_type": "dangerous_goods",
        "is_candidate": True,
        "is_qualified": False,
        "is_recommended": False,
        "sort_order": 5,
        "profile": {"risk": "中文 SDS 待补充"},
        "latitude": 29.5630,
        "longitude": 106.5516,
        "image_url": "/static/training/suppliers/hazmat_e.svg",
    },
    {
        "code": "F",
        "name": "鲁东电子化学品",
        "location": "山东烟台",
        "certifications": ["危化品经营许可", "ISO9001", "UN 包装证明"],
        "capacity": "月供 130 吨，首批 19 天",
        "price_text": "¥8,180 / 吨",
        "brief": "电子清洗溶剂供货经验充足，UN 包装证明与批次追溯记录齐全，价格接近上限。",
        "risk_note": "符合核心要求，可作为备选谈判对象。",
        "supplier_type": "dangerous_goods",
        "is_candidate": True,
        "is_qualified": True,
        "is_recommended": False,
        "sort_order": 6,
        "profile": {"focus": "电子清洗溶剂"},
        "latitude": 37.4638,
        "longitude": 121.4479,
        "image_url": "/static/training/suppliers/hazmat_f.svg",
    },
]

DANGEROUS_GOODS_NEGOTIATION_SUPPLIERS = [
    {"supplier_code": "A", "supplier_name": "华安化学品供应", "init_price": 8050, "init_payment_days": 15, "init_warranty_months": 12},
    {"supplier_code": "D", "supplier_name": "江浙危化物流联供", "init_price": 8120, "init_payment_days": 15, "init_warranty_months": 12},
    {"supplier_code": "F", "supplier_name": "鲁东电子化学品", "init_price": 8180, "init_payment_days": 15, "init_warranty_months": 12},
]

DANGEROUS_GOODS_NEGOTIATION_OPTIONS = [
    (1, "如果我们确认全年 60 吨滚动预测，单价能否下调 180 元/吨?", "年度预测能帮助我们锁定上游货源，可以下调 180 元/吨。", "price", -180),
    (1, "价格先不压，但请承诺首批 20 天内到厂，并提前寄送合规资料。", "首批交付和资料预审可以配合，价格暂时保持不变。", "price", 0),
    (1, "我们直接要求降价 500 元/吨，否则优先考虑低价供应商。", "这个降幅超过安全库存和危运成本空间，只能下调 60 元/吨。", "price", -60),
    (2, "若我们提前提供月度提货计划，账期能否从 15 天延长到 30 天?", "有稳定提货计划的话，可以接受 30 天账期。", "payment_days", 15),
    (2, "账期不变，但希望你们承担全部资料预审和危运备案沟通成本。", "资料预审可以配合，但备案沟通成本无法全部承担。", "payment_days", 0),
    (2, "进入合格供应商池的条件是账期 45 天，请直接确认。", "45 天账期对危化品供应资金占用过高，暂时无法接受。", "payment_days", 0),
    (3, "请把批次质量争议响应期从 12 个月延长到 18 个月。", "在保存样品和批次记录完整的前提下，可以延长到 18 个月。", "warranty_months", 6),
    (3, "质保响应期不变，但每批必须随货提供中文 SDS、COA 和安全标签。", "这些合规资料可以随货提供，响应期保持 12 个月。", "warranty_months", 0),
    (3, "请承诺 24 个月质量追溯，否则我们担心安全责任。", "24 个月超出常规留样和追溯周期，暂时无法承诺。", "warranty_months", 0),
    (4, "若我们接受你们标准 160kg 桶装规格，单价还能否再降 120 元/吨?", "标准桶装能减少换包装成本，可以再降 120 元/吨。", "price", -120),
    (4, "我们要求小包装分装，同时获得同等降价。", "小包装会增加危化分装和包装合规成本，无法同等降价。", "price", 0),
    (4, "请你们承担全部危运费用和卸货安全指导，单价不变。", "危运费用受线路和批次影响较大，无法全部承担。", "price", 0),
    (5, "如果今天确认最终条款，请在报价单中再给 80 元/吨合作让利。", "为了推进长期合作，我们可以做最后 80 元/吨让利。", "price", -80),
    (5, "价格不再调整，但请把账期再延长 10 天。", "在当前价格基础上，账期最多维持已确认条件。", "payment_days", 0),
    (5, "请同时降价、延长账期、扩大追溯责任，否则本轮不定点。", "一次性叠加三项让步风险过高，我们无法接受这样的收口方式。", "price", 0),
]


async def _ensure_motor_case(db) -> None:
    case = await db.scalar(select(TrainingCase).where(TrainingCase.slug == MOTOR_CASE["slug"]))
    if not case:
        case = TrainingCase(**MOTOR_CASE)
        db.add(case)
        await db.flush()

    existing_steps = await db.scalar(
        select(func.count(TrainingStepConfig.id)).where(TrainingStepConfig.case_id == case.id)
    )
    existing_suppliers = await db.scalar(
        select(func.count(TrainingSupplier.id)).where(TrainingSupplier.case_id == case.id)
    )
    existing_neg_suppliers = await db.scalar(
        select(func.count(TrainingCaseNegotiationSupplier.id)).where(
            TrainingCaseNegotiationSupplier.case_id == case.id
        )
    )
    existing_options = await db.scalar(
        select(func.count(TrainingCaseNegotiationOption.id)).where(
            TrainingCaseNegotiationOption.case_id == case.id
        )
    )

    if not existing_steps:
        for item in MOTOR_STEPS:
            db.add(TrainingStepConfig(case_id=case.id, **item))

    if not existing_suppliers:
        for item in MOTOR_SUPPLIERS:
            db.add(TrainingSupplier(case_id=case.id, **item))

    if not existing_neg_suppliers:
        for item in MOTOR_NEGOTIATION_SUPPLIERS:
            db.add(TrainingCaseNegotiationSupplier(case_id=case.id, **item))

    if not existing_options:
        for index, (round_no, ask, answer, affect_field, delta_value) in enumerate(
            MOTOR_NEGOTIATION_OPTIONS,
            start=1,
        ):
            db.add(
                TrainingCaseNegotiationOption(
                    case_id=case.id,
                    round_no=round_no,
                    ask=ask,
                    answer=answer,
                    affect_field=affect_field,
                    delta_value=delta_value,
                    sort_order=((index - 1) % 3) + 1,
                )
            )

async def _ensure_dangerous_goods_case(db) -> None:
    case = await db.scalar(
        select(TrainingCase).where(TrainingCase.slug == DANGEROUS_GOODS_CASE["slug"])
    )
    if not case:
        case = TrainingCase(**DANGEROUS_GOODS_CASE)
        db.add(case)
        await db.flush()

    existing_steps = await db.scalar(
        select(func.count(TrainingStepConfig.id)).where(TrainingStepConfig.case_id == case.id)
    )
    existing_suppliers = await db.scalar(
        select(func.count(TrainingSupplier.id)).where(TrainingSupplier.case_id == case.id)
    )
    existing_neg_suppliers = await db.scalar(
        select(func.count(TrainingCaseNegotiationSupplier.id)).where(
            TrainingCaseNegotiationSupplier.case_id == case.id
        )
    )
    existing_options = await db.scalar(
        select(func.count(TrainingCaseNegotiationOption.id)).where(
            TrainingCaseNegotiationOption.case_id == case.id
        )
    )

    if not existing_steps:
        for item in DANGEROUS_GOODS_STEPS:
            db.add(TrainingStepConfig(case_id=case.id, **item))

    if not existing_suppliers:
        for item in DANGEROUS_GOODS_SUPPLIERS:
            db.add(TrainingSupplier(case_id=case.id, **item))

    if not existing_neg_suppliers:
        for item in DANGEROUS_GOODS_NEGOTIATION_SUPPLIERS:
            db.add(TrainingCaseNegotiationSupplier(case_id=case.id, **item))

    if not existing_options:
        for index, (round_no, ask, answer, affect_field, delta_value) in enumerate(
            DANGEROUS_GOODS_NEGOTIATION_OPTIONS,
            start=1,
        ):
            db.add(
                TrainingCaseNegotiationOption(
                    case_id=case.id,
                    round_no=round_no,
                    ask=ask,
                    answer=answer,
                    affect_field=affect_field,
                    delta_value=delta_value,
                    sort_order=((index - 1) % 3) + 1,
                )
            )


async def seed_training_defaults() -> None:
    """Fill small default training data that old databases may miss."""
    async with AsyncSessionLocal() as db:
        case = await db.scalar(select(TrainingCase).where(TrainingCase.slug == "strawberry_jam"))
        if case:
            step4 = await db.scalar(
                select(TrainingStepConfig).where(
                    TrainingStepConfig.case_id == case.id,
                    TrainingStepConfig.step == 4,
                )
            )
            if step4:
                schema = step4.form_schema or {}
                specs = schema.get("specs") or []
                corrupted_schema = any(
                    str(item.get("label", "")).count("?") >= 2
                    or any(str(option.get("label", "")).count("?") >= 2 for option in item.get("options", []))
                    for item in specs
                )
                if not specs or corrupted_schema:
                    step4.form_schema = DEFAULT_QUOTE_SPEC_SCHEMA

            existing_codes = {
                item[0]
                for item in (
                    await db.execute(
                        select(TrainingCaseNegotiationSupplier.supplier_code).where(
                            TrainingCaseNegotiationSupplier.case_id == case.id
                        )
                    )
                ).all()
            }
            suppliers = (
                await db.execute(
                    select(TrainingSupplier).where(TrainingSupplier.case_id == case.id)
                )
            ).scalars().all()
            for supplier in suppliers:
                if supplier.code in existing_codes:
                    continue
                price_text = supplier.price_text or ""
                price = 18.0
                for token in price_text.replace("元/kg", "").split():
                    try:
                        price = float(token)
                        break
                    except ValueError:
                        continue
                db.add(
                    TrainingCaseNegotiationSupplier(
                        case_id=case.id,
                        supplier_code=supplier.code,
                        supplier_name=supplier.name,
                        init_price=price,
                        init_payment_days=30,
                        init_warranty_months=12,
                    )
                )

            existing_options = (
                await db.execute(
                    select(TrainingCaseNegotiationOption).where(
                        TrainingCaseNegotiationOption.case_id == case.id
                    )
                )
            ).scalars().all()
            corrupted_options = any(
                option.ask.count("?") >= 5 or option.answer.count("?") >= 5
                for option in existing_options
            )
            if not existing_options or corrupted_options:
                for option in existing_options:
                    await db.delete(option)
                await db.flush()

                for index, (round_no, ask, answer, affect_field, delta_value) in enumerate(
                    DEFAULT_NEGOTIATION_OPTIONS,
                    start=1,
                ):
                    db.add(
                        TrainingCaseNegotiationOption(
                            case_id=case.id,
                            round_no=round_no,
                            ask=ask,
                            answer=answer,
                            affect_field=affect_field,
                            delta_value=delta_value,
                            sort_order=((index - 1) % 3) + 1,
                        )
                    )

        await _ensure_motor_case(db)
        await _ensure_dangerous_goods_case(db)
        await db.commit()
