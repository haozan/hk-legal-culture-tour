/* global document, console, structuredClone, fetch, URLSearchParams, clearTimeout, setTimeout, Blob, URL */

const PAPER_NAME = "保險原理及實務";
const PAPER_NAMES = ["保險原理及實務", "人壽保險", "一般保險", "法規與合規", "風險管理"];

const TRADITIONAL_CHARACTERS = {
  "与": "與",
  "专": "專",
  "业": "業",
  "两": "兩",
  "个": "個",
  "为": "為",
  "么": "麼",
  "义": "義",
  "习": "習",
  "买": "買",
  "于": "於",
  "产": "產",
  "从": "從",
  "价": "價",
  "优": "優",
  "会": "會",
  "伤": "傷",
  "体": "體",
  "余": "餘",
  "佣": "傭",
  "侧": "側",
  "偿": "償",
  "储": "儲",
  "关": "關",
  "内": "內",
  "写": "寫",
  "决": "決",
  "况": "況",
  "准": "準",
  "击": "擊",
  "划": "劃",
  "则": "則",
  "删": "刪",
  "别": "別",
  "务": "務",
  "动": "動",
  "区": "區",
  "协": "協",
  "单": "單",
  "厘": "釐",
  "参": "參",
  "发": "發",
  "台": "臺",
  "号": "號",
  "后": "後",
  "吗": "嗎",
  "启": "啟",
  "员": "員",
  "响": "響",
  "团": "團",
  "围": "圍",
  "场": "場",
  "处": "處",
  "备": "備",
  "复": "復",
  "够": "夠",
  "学": "學",
  "实": "實",
  "对": "對",
  "导": "導",
  "寿": "壽",
  "尝": "嘗",
  "层": "層",
  "属": "屬",
  "巩": "鞏",
  "并": "並",
  "广": "廣",
  "库": "庫",
  "应": "應",
  "开": "開",
  "张": "張",
  "弥": "彌",
  "当": "當",
  "录": "錄",
  "态": "態",
  "户": "戶",
  "托": "託",
  "执": "執",
  "护": "護",
  "报": "報",
  "担": "擔",
  "择": "擇",
  "挂": "掛",
  "损": "損",
  "据": "據",
  "摊": "攤",
  "数": "數",
  "无": "無",
  "旧": "舊",
  "时": "時",
  "暂": "暫",
  "术": "術",
  "机": "機",
  "权": "權",
  "条": "條",
  "来": "來",
  "构": "構",
  "标": "標",
  "树": "樹",
  "样": "樣",
  "检": "檢",
  "污": "汙",
  "没": "沒",
  "济": "濟",
  "润": "潤",
  "潜": "潛",
  "点": "點",
  "状": "狀",
  "现": "現",
  "监": "監",
  "确": "確",
  "离": "離",
  "种": "種",
  "积": "積",
  "称": "稱",
  "稳": "穩",
  "笔": "筆",
  "筹": "籌",
  "签": "籤",
  "类": "類",
  "红": "紅",
  "约": "約",
  "级": "級",
  "纪": "紀",
  "纯": "純",
  "纲": "綱",
  "线": "線",
  "练": "練",
  "组": "組",
  "终": "終",
  "绍": "紹",
  "经": "經",
  "结": "結",
  "络": "絡",
  "继": "繼",
  "续": "續",
  "维": "維",
  "综": "綜",
  "缓": "緩",
  "编": "編",
  "缴": "繳",
  "网": "網",
  "职": "職",
  "联": "聯",
  "节": "節",
  "范": "範",
  "荐": "薦",
  "获": "獲",
  "营": "營",
  "虑": "慮",
  "补": "補",
  "见": "見",
  "规": "規",
  "览": "覽",
  "计": "計",
  "订": "訂",
  "认": "認",
  "让": "讓",
  "训": "訓",
  "议": "議",
  "记": "記",
  "设": "設",
  "证": "證",
  "评": "評",
  "识": "識",
  "诈": "詐",
  "诉": "訴",
  "试": "試",
  "诚": "誠",
  "该": "該",
  "说": "說",
  "请": "請",
  "诺": "諾",
  "读": "讀",
  "财": "財",
  "责": "責",
  "败": "敗",
  "质": "質",
  "贪": "貪",
  "购": "購",
  "贯": "貫",
  "贴": "貼",
  "费": "費",
  "资": "資",
  "赔": "賠",
  "转": "轉",
  "轮": "輪",
  "辑": "輯",
  "输": "輸",
  "过": "過",
  "运": "運",
  "还": "還",
  "这": "這",
  "违": "違",
  "连": "連",
  "适": "適",
  "选": "選",
  "钱": "錢",
  "销": "銷",
  "键": "鍵",
  "问": "問",
  "间": "間",
  "际": "際",
  "险": "險",
  "难": "難",
  "雇": "僱",
  "静": "靜",
  "页": "頁",
  "项": "項",
  "须": "須",
  "预": "預",
  "频": "頻",
  "题": "題",
  "颜": "顏",
  "额": "額",
  "风": "風",
  "验": "驗",
  "骗": "騙",
  "骤": "驟"
};

function traditionalizeData(value) {
  if (typeof value === "string") return [...value].map(character => TRADITIONAL_CHARACTERS[character] || character).join("");
  if (Array.isArray(value)) return value.map(traditionalizeData);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, traditionalizeData(item)]));
  return value;
}

const seedSnapshot = {
  version: "draft-2026.10.16",
  chapterNames: PAPER_NAMES,
  questions: [
    question(1, "1.1.1", "保險的最大誠信原則要求投保人如實披露重要事實。以下哪項最符合該原則？", "單選題", ["只披露對自己有利的資料", "投保時披露足以影響承保決定的所有重要事實", "簽約後才披露重要事實", "由保險代理人代為決定披露範圍"], ["B"], "最大誠信原則貫穿訂立合約的全過程，投保人、被保險人及保險人都應披露重要事實。", ["核心概念", "卷一"]),
    question(2, "1.2", "以下哪些屬於釐定一般保險保費時通常考慮的因素？", "多選題", ["風險發生的機率", "潛在損失幅度", "營運費用", "投保人的幸運顏色"], ["A", "B", "C"], "保費通常綜合風險機率、損失幅度、營運費用、資本成本及所需利潤等因素。", ["多選", "卷一"]),
    question(3, "2.1.1", "在合約成立時，哪一項屬於有效合約的重要元素？", "單選題", ["要約與承諾", "幸運數字", "廣告顏色", "代理人的個人偏好"], ["A"], "合約通常需要具備要約、承諾、代價及建立法律關係的意向等元素。", ["法律原則", "卷一"]),
    question(4, "4.1", "保險中介人向客戶介紹產品時，哪些做法符合客戶為本原則？", "多選題", ["瞭解客戶的需要和財務狀況", "說明產品的主要風險和費用", "只推薦傭金最高的產品", "提供與客戶情況相稱的建議"], ["A", "B", "D"], "銷售過程應充分了解客戶需要、風險承受能力及支付能力，並提供合適、清晰的建議。", ["合規", "卷一"]),
    question(5, "3.1.1", "人壽保險的保險利益通常須在何時存在？", "單選題", ["訂立保單時", "每次繳費時", "理賠完成後", "保單失效後"], ["A"], "人壽保險的保險利益須在保單訂立時存在。", ["高頻考點", "卷一"]),
    question(6, "5.1.1", "風險管理的首要步驟通常是什麼？", "單選題", ["識別和分析風險", "立即購買最高保額的保單", "忽略低機率風險", "只記錄已經發生的損失"], ["A"], "風險管理通常先識別、分析和評估風險，再決定處理方法。", ["風險管理", "卷一"])
  ],
  paperOneSyllabus: [
    chapter("1", "風險及保險", "12%", [
      topic("1.1.1", "風險的意義", [topic("1.1.1.1", "風險與損失", [topic("1.1.1.1.1", "損失發生的可能性"), topic("1.1.1.1.2", "損失的經濟後果")]), topic("1.1.1.2", "風險的不確定性"), topic("1.1.1.3", "可保風險的基本條件", [topic("1.1.1.3.1", "損失可以用金錢衡量"), topic("1.1.1.3.2", "風險發生具有偶然性")])]),
      topic("1.1.2", "風險的類別", [topic("1.1.2.1", "純粹風險與投機風險"), topic("1.1.2.2", "靜態風險與動態風險")]),
      topic("1.1.3", "風險管理", [topic("1.1.3.1", "識別、分析及評估風險"), topic("1.1.3.2", "風險處理方法")]),
      topic("1.2", "保險功能及好處", [topic("1.2.1", "風險轉移與分散"), topic("1.2.2", "經濟保障及社會功能")])
    ]),
    chapter("2", "法律原則", "16%", [topic("2.1.1", "合約法：定義"), topic("2.1.2", "合約種類"), topic("2.1.3", "合約元素和要點"), topic("2.1.4", "合約的相對性"), topic("2.2.1", "代理法：定義"), topic("2.2.2", "代理關係如何產生"), topic("2.2.3", "代理人的許可權"), topic("2.2.4", "代理人對委託人的責任"), topic("2.2.5", "委託人對代理人的責任"), topic("2.2.6", "終止代理")]),
    chapter("3", "保險原則", "30%", [topic("3.1.1", "可保權益"), topic("3.1.2", "可保權益的重要性"), topic("3.1.3", "可保權益的必要條件"), topic("3.1.4", "可保權益如何產生"), topic("3.1.5", "可保權益何時需要"), topic("3.1.6", "轉讓"), topic("3.2.1–3.2.2", "一般誠信及最高誠信"), topic("3.2.3", "重要事實"), topic("3.2.4", "何時披露重要事實"), topic("3.2.5", "違反最高誠信"), topic("3.2.6", "違反最高誠信的補救方法"), topic("3.3.1", "近因"), topic("3.3.2", "危險的種類"), topic("3.3.3", "近因原則的應用"), topic("3.3.4", "保單對原則的更改")]),
    chapter("4", "保險公司的主要功能", "9%", [topic("4.1", "產品的開發"), topic("4.2", "客戶服務"), topic("4.3", "市場營銷及促銷"), topic("4.4", "保險的銷售"), topic("4.5", "核保"), topic("4.6", "保單的處理"), topic("4.7", "理賠"), topic("4.8", "再保險"), topic("4.9", "精算支援"), topic("4.10", "會計及投資"), topic("4.11", "培訓及發展"), topic("4.12", "管控要員")]),
    chapter("5", "香港保險業結構", "5%", [topic("5.1.1", "保險業務種類：法定分類"), topic("5.1.2", "保險業務種類：實務分類"), topic("5.1.3", "保險業務種類：學術分類"), topic("5.1.4", "再保險"), topic("5.2", "行業規模"), topic("5.3", "保險公司"), topic("5.4", "保險中介人"), topic("5.5.1", "香港保險業聯會"), topic("5.5.2", "認可保險經紀團體")]),
    chapter("6", "保險業的規管架構", "21%", [topic("6.1.1", "《保險業條例》"), topic("6.1.2", "《承保商專業守則》"), topic("6.1.3", "保險投訴局"), topic("6.2.1", "監管保險中介人的持牌制度"), topic("6.2.2", "獲授權保險人與其代理人的關係"), topic("6.2.3", "持牌保險中介人的多重角色"), topic("6.2.4", "發牌"), topic("6.2.5", "其他監管措施")]),
    chapter("7", "職業道德及其他有關問題", "7%", [topic("7.1", "保險中介人對保單持有人的責任"), topic("7.2", "保護個人資料"), topic("7.3", "平等機會事宜"), topic("7.4", "打擊洗錢及恐怖分子資金籌集"), topic("7.5", "防止貪汙"), topic("7.6", "防止保險詐騙")])
  ]
};

function question(id, chapterNumber, title, type, optionTexts, correctOptionIDs, explanation, tags) {
  return { id, chapter: PAPER_NAME, chapterNumber, title, type, options: optionTexts.map((text, index) => ({ id: String.fromCharCode(65 + index), text })), correctOptionIDs, explanation, tags };
}
function topic(number, title, children = [], keyPoints = [], contents = []) { return { id: number, number, title, keyPoints, contents, children }; }
function chapter(number, title, weight, topics) { return { id: number, number, title, weight, topics }; }

const state = {
  data: loadData(),
  selectedKey: "chapter:1",
  editingQuestionId: null,
  expandedChapters: new Set(["1"]),
  expandedNodes: new Set(["1.1.1"]),
  search: "",
  contextMenuKey: null,
  linkQuery: "",
  chapterPickerOpen: false,
  chapterPickerQuery: "",
  referenceDraft: null
};

function loadData() {
  try {
    const serialized = document.querySelector("#gangxian-content-data")?.textContent;
    if (serialized) return traditionalizeData(JSON.parse(serialized));
  } catch (error) { console.warn(error); }
  return traditionalizeData(structuredClone(seedSnapshot));
}

function saveData(message = "伺服器草稿 · 儲存中") {
  const status = document.querySelector("#saveStatus");
  const saveUrl = document.querySelector(".content-admin")?.dataset.saveUrl;
  const token = document.querySelector("meta[name='csrf-token']")?.content;
  if (!saveUrl || !token) return;
  status.textContent = message;
  fetch(saveUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", "X-CSRF-Token": token, Accept: "application/json" },
    body: new URLSearchParams({ snapshot_json: JSON.stringify(state.data) })
  }).then(response => {
    if (!response.ok) throw new Error("儲存失敗");
    status.textContent = "伺服器草稿 · 已儲存";
  }).catch(error => {
    console.error(error);
    status.textContent = "伺服器草稿 · 儲存失敗";
    showToast("伺服器儲存失敗，請檢查網路連線");
  });
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
}

function referenceNumbers(value = "") {
  return [...String(value).replaceAll(" ", "").matchAll(/\d+(?:\.\d+)+/g)].map(match => match[0]);
}

function descendants(node) {
  return (node.children || []).flatMap(child => [child, ...descendants(child)]);
}

function nodeQuestions(node) {
  const scope = Array.isArray(node.topics) ? node.topics.flatMap(topic => [topic, ...descendants(topic)]) : [node, ...descendants(node)];
  const contentQuestionIDs = new Set(scope.flatMap(item => (item.contents || []).flatMap(content => content.questionIDs || [])).map(Number));
  if (contentQuestionIDs.size) return state.data.questions.filter(questionItem => contentQuestionIDs.has(Number(questionItem.id)));
  const numbers = scope.map(item => item.number);
  return state.data.questions.filter(questionItem => referenceNumbers(questionItem.chapterNumber).some(reference => numbers.some(number => reference === number || reference.startsWith(`${number}.`) || number.startsWith(`${reference}.`))));
}

function chapterQuestionCount(chapterItem) {
  return new Set(chapterItem.topics.flatMap(nodeQuestions).map(item => item.id)).size;
}

function findNode(key) {
  if (!key || typeof key !== "string") return null;
  if (key.startsWith("chapter:")) {
    const chapterItem = state.data.paperOneSyllabus.find(item => item.id === key.slice(8));
    return chapterItem ? { node: chapterItem, kind: "chapter", chapter: chapterItem, parent: null, collection: state.data.paperOneSyllabus } : null;
  }
  const nodeID = key.slice(6);
  for (const chapterItem of state.data.paperOneSyllabus) {
    const location = findTopicLocation(chapterItem.topics, nodeID, chapterItem, null);
    if (location) return location;
  }
  return null;
}

function findTopicLocation(collection, nodeID, chapter, parent) {
  for (const node of collection) {
    if (node.id === nodeID) return { node, kind: "topic", chapter, parent, collection };
    const location = findTopicLocation(node.children || [], nodeID, chapter, node);
    if (location) return location;
  }
  return null;
}

function totalNodeCount() {
  return state.data.paperOneSyllabus.reduce((total, chapterItem) => total + chapterItem.topics.reduce((count, node) => count + 1 + descendants(node).length, 0), 0);
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function render() {
  renderPapers();
  renderMetrics();
  renderOutline();
  renderEditor();
}

function renderPapers() {
  document.querySelector("#paperList").innerHTML = PAPER_NAMES.map((name, index) => `
    <button class="paper-item ${index === 0 ? "active" : ""}" ${index === 0 ? "" : "disabled"}>
      <span class="paper-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="paper-copy"><strong>${escapeHtml(name)}</strong><span>${index === 0 ? "可編輯" : "待錄入"}</span></span>
    </button>
  `).join("");
}

function renderMetrics() {
  const totalQuestions = state.data.questions.length;
  const unresolvedCount = unresolvedQuestionCount();
  document.querySelector("#headMetrics").innerHTML = `
    <div class="metric"><strong>${state.data.paperOneSyllabus.length}</strong><span>章節</span></div>
    <div class="metric"><strong>${totalNodeCount()}</strong><span>大綱節點</span></div>
    <div class="metric"><strong>${totalQuestions}</strong><span>題目</span></div>
    <div class="metric ${unresolvedCount ? "metric-warning" : ""}"><strong>${unresolvedCount}</strong><span>待關聯</span></div>
  `;
}

function renderOutline() {
  const query = state.search.trim().toLowerCase();
  const chapters = state.data.paperOneSyllabus.filter(chapterItem => !query || JSON.stringify(chapterItem).toLowerCase().includes(query));
  document.querySelector("#outlineTree").innerHTML = chapters.map(renderChapter).join("") || `<div class="empty-state"><h3>沒有匹配的大綱</h3><p>嘗試搜尋章節編號或標題。</p></div>`;
}

function renderChapter(chapterItem) {
  const expanded = state.expandedChapters.has(chapterItem.id);
  const topicMarkup = expanded ? `<div class="chapter-children">${chapterItem.topics.map(node => renderNode(node, 0)).join("")}</div>` : "";
  return `<div class="tree-chapter" data-node-key="chapter:${escapeHtml(chapterItem.id)}">
    <button class="chapter-row" data-action="toggle-chapter" data-id="${escapeHtml(chapterItem.id)}">
      <span class="chevron">${expanded ? "⌄" : "›"}</span>
      <span class="chapter-number">第${escapeHtml(chapterItem.number)}章</span>
      <span class="chapter-title">${escapeHtml(chapterItem.title)}</span>
      <span class="chapter-weight">${chapterItem.topics.length}節 · ${chapterQuestionCount(chapterItem)}題 · ${escapeHtml(chapterItem.weight || "—")}</span>
    </button>
    ${topicMarkup}
  </div>`;
}

function renderNode(node, depth) {
  const expanded = state.expandedNodes.has(node.id);
  const children = node.children || [];
  const childrenMarkup = expanded && children.length ? `<div class="node-children">${children.map(child => renderNode(child, depth + 1)).join("")}</div>` : "";
  const contentMarkup = (node.contents || []).map(content => {
    const bells = (content.questionIDs || []).map(id => `<button class="question-link" data-action="edit-question" data-id="${escapeHtml(id)}" data-node-key="topic:${escapeHtml(node.id)}" title="編輯題目 #${escapeHtml(id)}">🔔</button>`).join("");
    return `<div class="node-content"><span class="node-content-text">${escapeHtml(content.text)}</span><span class="node-content-bells">${bells}</span></div>`;
  }).join("");
  return `<div class="tree-node" data-depth="${depth}" data-node-key="topic:${escapeHtml(node.id)}">
    <div class="node-row">
      <button class="node-main" data-action="select-node" data-key="topic:${escapeHtml(node.id)}">
        <span class="node-chevron">${children.length ? (expanded ? "⌄" : "›") : "·"}</span>
        <span class="node-copy"><span class="node-number">${escapeHtml(node.number)}</span><span class="node-title">${escapeHtml(node.title)}</span></span>
      </button>
    </div>
    ${contentMarkup}
    ${childrenMarkup}
  </div>`;
}

function renderEditor() {
  const context = findNode(state.selectedKey);
  const button = document.querySelector("#newQuestionButton");
  button.disabled = !context;
  if (!context) {
    document.querySelector("#selectionEyebrow").textContent = "選擇一個大綱節點";
    document.querySelector("#selectionTitle").textContent = "開始錄入內容";
    document.querySelector("#selectionHint").textContent = "從左側選擇章節或小節。";
    document.querySelector("#editorContent").className = "editor-content empty-state";
    document.querySelector("#editorContent").innerHTML = `<div class="empty-illustration">✦</div><h3>從大綱開始</h3><p>選擇一個章節或小節，維護標題、比重與題目。</p>`;
    return;
  }
  const node = context.node;
  document.querySelector("#selectionEyebrow").textContent = context.kind === "chapter" ? `第${node.number}章 · 章節設定` : `參考章節 ${node.number}`;
  document.querySelector("#selectionTitle").textContent = node.title;
  document.querySelector("#selectionHint").textContent = `${nodeQuestions(node).length} 道題目 · ${context.kind === "chapter" ? node.topics.length : (node.children || []).length} 個下級節點`;
  document.querySelector("#editorContent").className = "editor-content";
  if (state.editingQuestionId === "link") {
    document.querySelector("#editorContent").innerHTML = renderQuestionLinkEditor(context);
  } else if (state.editingQuestionId !== null) {
    document.querySelector("#editorContent").innerHTML = renderQuestionEditor(context);
  } else {
    document.querySelector("#editorContent").innerHTML = renderNodeEditor(context);
  }
}

function renderNodeEditor(context) {
  const node = context.node;
  const isChapter = context.kind === "chapter";
  const keyPoints = (node.keyPoints || []).join("\n");
  const contents = node.contents || [];
  const questions = nodeQuestions(node);
  return `<div class="editor-section">
    <div class="form-label">基本資訊</div>
    <div class="field-row"><label>編號</label><input class="field" id="nodeNumber" value="${escapeHtml(node.number)}" ${isChapter ? "" : ""} /></div>
    <div class="field-row"><label>標題</label><input class="field" id="nodeTitle" value="${escapeHtml(node.title)}" /></div>
    ${isChapter ? `<div class="field-row"><label>考試比重</label><input class="field" id="nodeWeight" value="${escapeHtml(node.weight || "")}" placeholder="例如 12%" /></div>` : `<div class="field-row"><label>上級章節</label><div class="outline-path">第${escapeHtml(context.chapter.number)}章 · ${escapeHtml(context.chapter.title)}</div></div>`}
  </div>
  <div class="editor-section">
    <div class="form-label">大綱層級</div>
    <div class="field-row"><label>下級節點</label><div class="outline-path">${isChapter ? node.topics.length : (node.children || []).length} 個</div></div>
    ${!isChapter ? `<label class="form-label" for="nodeKeyPoints">補充要點（可選，每行一條）</label><textarea class="textarea" id="nodeKeyPoints" placeholder="用於舊版資料相容；正式層級請使用“新增下級大綱”。">${escapeHtml(keyPoints)}</textarea>` : ""}
    <div class="form-actions"><button class="button small" data-action="add-child">＋ 新增下級大綱</button><button class="button small danger" data-action="delete-node">⌫ 刪除節點</button><button class="button small primary" data-action="save-node">儲存大綱</button></div>
  </div>
  <div class="editor-section">
    <div class="form-label">解析內容 · ${contents.length} 條</div>
    ${contents.length ? `<div class="content-list">${contents.map(content => `<div class="content-list-row"><span>${escapeHtml(content.text)}</span><span class="content-list-bells">${(content.questionIDs || []).map(id => `🔔 #${escapeHtml(id)}`).join(" ")}</span></div>`).join("")}</div>` : `<div class="outline-path">此節點暫無題目解析內容。</div>`}
  </div>
  <div class="editor-section">
    <div class="form-label">關聯題目 · ${questions.length} 道</div>
    <div class="question-list">${questions.length ? questions.map(renderQuestionRow).join("") : `<div class="outline-path">當前節點還沒有題目，點選右上角“新題目”開始錄入。</div>`}</div>
  </div>`;
}

function renderQuestionLinkEditor(context) {
  return `<div class="editor-section">
    <div class="form-label">關聯已有試題</div>
    <p class="form-help">選擇後會把題目掛到“${escapeHtml(context.node.title)}”，原題目不會被刪除。</p>
    <label class="search-box link-question-search"><span>⌕</span><input id="linkQuestionSearch" type="search" value="${escapeHtml(state.linkQuery)}" placeholder="搜尋題號、題目或解析" /></label>
  </div>
  ${renderLinkQuestionList(context)}
  <div class="form-actions"><button class="button small" data-action="cancel-question">返回節點</button></div>`;
}

function renderLinkQuestionList(context) {
  const associatedIDs = new Set(nodeQuestions(context.node).map(item => Number(item.id)));
  const query = state.linkQuery.trim().toLowerCase();
  const candidates = state.data.questions.filter(item => {
    if (associatedIDs.has(Number(item.id))) return false;
    if (!query) return true;
    return [item.id, item.title, item.chapterNumber, item.explanation].join(" ").toLowerCase().includes(query);
  });
  return `<div class="editor-section" id="linkQuestionList">
    <div class="form-label">可關聯題目 · ${candidates.length} 道</div>
    <div class="question-list">${candidates.length ? candidates.map(item => `<div class="question-row"><div class="question-row-main"><div class="question-row-title">#${escapeHtml(item.id)} · ${escapeHtml(item.title)}</div><div class="question-row-meta"><span class="tag">${escapeHtml(item.type)}</span><span>參考章節 ${escapeHtml(item.chapterNumber)}</span></div></div><button class="button small" data-action="link-question-item" data-id="${escapeHtml(item.id)}">關聯</button></div>`).join("") : `<div class="outline-path">沒有可關聯的題目。</div>`}</div>
  </div>`;
}

function renderQuestionRow(item) {
  const unresolved = unresolvedQuestionReferences(item);
  return `<div class="question-row"><div class="question-row-main"><div class="question-row-title">#${escapeHtml(item.id)} · ${escapeHtml(item.title)}</div><div class="question-row-meta"><span class="tag">${escapeHtml(item.type)}</span><span>參考章節 ${escapeHtml(item.chapterNumber)}</span>${unresolved.length ? `<span class="question-warning">未對應大綱</span>` : ""}</div></div><button class="icon-button" data-action="edit-question" data-id="${item.id}" title="編輯">✎</button></div>`;
}

function renderQuestionEditor(context) {
  const existing = state.editingQuestionId === "new" ? null : state.data.questions.find(item => String(item.id) === String(state.editingQuestionId));
  const defaultReference = context.kind === "chapter" ? (context.node.topics[0]?.number || context.node.number) : context.node.number;
  const item = existing || { id: "new", chapter: PAPER_NAME, chapterNumber: defaultReference, title: "", type: "單選題", options: [{ id: "A", text: "" }, { id: "B", text: "" }, { id: "C", text: "" }, { id: "D", text: "" }], correctOptionIDs: [], explanation: "", tags: [] };
  const chapterNumber = state.referenceDraft ?? item.chapterNumber;
  const options = item.options || [];
  const unresolved = unresolvedQuestionReferences({ ...item, chapterNumber });
  return `<div class="editor-section">
    <div class="form-label">題目設定 ${existing ? `· #${item.id}` : "· 新題目"}</div>
    <div class="field-row"><label>試題編號</label><input class="field" id="questionID" value="${escapeHtml(existing ? item.id : nextQuestionID())}" inputmode="numeric" ${existing ? "readonly" : ""} /></div>
    <div class="field-row"><label>題型</label><select class="select" id="questionType"><option ${item.type === "單選題" ? "selected" : ""}>單選題</option><option ${item.type === "多選題" ? "selected" : ""}>多選題</option></select></div>
    <div class="field-row"><label>參考章節</label><div class="reference-editor"><input class="field" id="questionChapterNumber" value="${escapeHtml(chapterNumber || context.node.number)}" placeholder="可手填，例如 1.1.1" /><button class="button small" type="button" data-action="toggle-reference-picker">從大綱選擇</button></div></div>
    ${unresolved.length ? `<div class="unresolved-warning">未找到對應大綱：${unresolved.map(escapeHtml).join("、")}。可以繼續儲存，或用“從大綱選擇”完成關聯。</div>` : ""}
    ${state.chapterPickerOpen ? renderReferencePicker(chapterNumber) : ""}
    <label class="form-label" for="questionTitle">題目正文</label><textarea class="textarea" id="questionTitle" placeholder="輸入題目正文">${escapeHtml(item.title)}</textarea>
  </div>
  <div class="editor-section"><div class="form-label">選項與答案</div><div class="options" id="questionOptions">${options.map(option => `<div class="option-row"><input type="radio" name="correctOption" value="${escapeHtml(option.id)}" ${item.correctOptionIDs.includes(option.id) ? "checked" : ""} /><span class="option-id">${escapeHtml(option.id)}</span><input class="field option-text" data-option-id="${escapeHtml(option.id)}" value="${escapeHtml(option.text)}" placeholder="選項內容" /></div>`).join("")}</div><button class="add-option" data-action="add-option">＋ 新增選項</button>${item.type === "多選題" ? `<div class="form-help">多選題按原卷組合選項錄入，A/B/C/D 中選擇一個組合答案。</div>` : ""}</div>
  <div class="editor-section"><label class="form-label" for="questionExplanation">解析</label><textarea class="textarea" id="questionExplanation" placeholder="輸入答案解析">${escapeHtml(item.explanation)}</textarea></div>
  <div class="form-actions"><button class="button small" data-action="cancel-question">取消</button>${existing ? `<button class="button small danger" data-action="delete-question" data-id="${item.id}">刪除題目</button>` : ""}<button class="button small primary" data-action="save-question" data-id="${item.id}">儲存題目</button></div>`;
}

function renderReferencePicker(chapterNumber) {
  const selected = new Set(referenceNumbers(chapterNumber));
  const query = state.chapterPickerQuery.trim().toLowerCase();
  const items = allTopicNodes().filter(node => !query || `${node.number} ${node.title}`.toLowerCase().includes(query));
  return `<div class="outline-picker"><div class="outline-picker-head"><strong>選擇參考大綱</strong><button class="text-button" data-action="toggle-reference-picker">收起</button></div><input class="field" id="chapterPickerSearch" value="${escapeHtml(state.chapterPickerQuery)}" placeholder="搜尋大綱編號或標題" /><div class="outline-picker-list">${items.length ? items.map(node => `<label class="outline-picker-item"><input type="checkbox" data-action="toggle-question-reference" data-number="${escapeHtml(node.number)}" ${selected.has(node.number) ? "checked" : ""} /><span><b>${escapeHtml(node.number)}</b>${escapeHtml(node.title)}</span></label>`).join("") : `<div class="outline-path">沒有匹配的大綱節點。</div>`}</div></div>`;
}

function selectNode(key) {
  state.selectedKey = key;
  state.contextMenuKey = null;
  state.editingQuestionId = null;
  state.chapterPickerOpen = false;
  state.chapterPickerQuery = "";
  state.referenceDraft = null;
  renderEditor();
}

function addChild() {
  const context = findNode(state.selectedKey);
  if (!context) return;
  const node = context.node;
  const base = node.number.replace(/[^\d.].*$/, "");
  const children = node.topics || node.children || [];
  const next = children.length + 1;
  const newNumber = `${base}.${next}`;
  const child = topic(newNumber, "新大綱節點");
  if (context.kind === "chapter") node.topics.push(child); else node.children.push(child);
  state.expandedChapters.add(context.chapter.id);
  state.expandedNodes.add(node.id);
  state.selectedKey = `topic:${child.id}`;
  saveData();
  render();
  showToast("已新增下級大綱");
}

function ensureNodeContents(node) {
  if (!Array.isArray(node.contents)) node.contents = [];
  return node.contents;
}

function allTopicNodes() {
  return state.data.paperOneSyllabus.flatMap(chapterItem => chapterItem.topics.flatMap(node => [node, ...descendants(node)]));
}

function outlineNodesForReference(reference) {
  const nodes = allTopicNodes();
  const exact = nodes.filter(node => node.number === reference);
  if (exact.length) return exact;
  const descendantsForReference = nodes.filter(node => node.number.startsWith(`${reference}.`));
  if (!descendantsForReference.length) return [];
  const minimumDepth = Math.min(...descendantsForReference.map(node => node.number.split(".").length));
  return descendantsForReference.filter(node => node.number.split(".").length === minimumDepth).slice(0, 1);
}

function questionReferenceNodes(question) {
  return [...new Set(referenceNumbers(question.chapterNumber).flatMap(outlineNodesForReference))];
}

function unresolvedQuestionReferences(question) {
  return referenceNumbers(question.chapterNumber).filter(reference => outlineNodesForReference(reference).length === 0);
}

function unresolvedQuestionCount() {
  return state.data.questions.filter(question => unresolvedQuestionReferences(question).length).length;
}

function attachQuestionToNode(question, node) {
  const contents = ensureNodeContents(node);
  const text = String(question.explanation || "").trim();
  if (text) {
    let content = contents.find(item => item.text === text);
    if (!content) {
      content = { id: `content-${node.id}-${Date.now()}-${question.id}`, text, questionIDs: [] };
      contents.push(content);
    }
    content.questionIDs = [...new Set([...(content.questionIDs || []).map(Number), Number(question.id)])];
  }
}

function removeQuestionFromContents(questionID) {
  const removeFrom = node => {
    if (Array.isArray(node.contents)) {
      node.contents = node.contents
        .map(content => ({ ...content, questionIDs: (content.questionIDs || []).filter(id => Number(id) !== Number(questionID)) }))
        .filter(content => content.questionIDs.length);
    }
    (node.children || []).forEach(removeFrom);
  };
  state.data.paperOneSyllabus.forEach(chapterItem => chapterItem.topics.forEach(removeFrom));
}

function linkQuestion(questionID) {
  const context = findNode(state.selectedKey);
  const question = state.data.questions.find(item => Number(item.id) === Number(questionID));
  if (!context || !question) return;
  const targetNode = context.kind === "chapter" ? context.node.topics[0] : context.node;
  if (!targetNode) return;
  const references = referenceNumbers(question.chapterNumber);
  if (!references.includes(String(targetNode.number))) question.chapterNumber = [...references, String(targetNode.number)].join(" & ");
  attachQuestionToNode(question, targetNode);
  state.linkQuery = "";
  saveData();
  renderEditor();
  renderOutline();
  showToast(`題目 #${question.id} 已關聯到「${context.node.title}」`);
}

function deleteNode() {
  const context = findNode(state.contextMenuKey || state.selectedKey);
  if (!context) return;
  const descendantCount = context.kind === "chapter" ? context.node.topics.length : descendants(context.node).length;
  const questionCount = nodeQuestions(context.node).length;
  const detail = questionCount ? `\n\n節點下的 ${questionCount} 道題目會保留，但會失去這個大綱節點的關聯。` : "";
  const label = context.kind === "chapter" ? `第${context.node.number}章 ${context.node.title}` : `${context.node.number} ${context.node.title}`;
  if (!window.confirm(`確定刪除「${label}」嗎？${descendantCount ? `\n\n這會同時刪除 ${descendantCount} 個下級節點。` : ""}${detail}`)) return;

  if (context.kind === "chapter") {
    const index = state.data.paperOneSyllabus.indexOf(context.node);
    if (index >= 0) state.data.paperOneSyllabus.splice(index, 1);
  } else {
    const index = context.collection.indexOf(context.node);
    if (index >= 0) context.collection.splice(index, 1);
  }
  state.selectedKey = null;
  state.contextMenuKey = null;
  state.editingQuestionId = null;
  closeContextMenu();
  saveData();
  render();
  showToast(`已刪除「${label}」`);
}

function saveNode() {
  const context = findNode(state.selectedKey);
  if (!context) return;
  const title = document.querySelector("#nodeTitle").value.trim();
  const number = document.querySelector("#nodeNumber").value.trim();
  if (!title || !number) return showToast("編號和標題不能為空");
  context.node.title = title;
  context.node.number = number;
  context.node.id = number;
  if (context.kind === "chapter") context.node.weight = document.querySelector("#nodeWeight").value.trim();
  if (context.kind === "topic" && document.querySelector("#nodeKeyPoints")) context.node.keyPoints = document.querySelector("#nodeKeyPoints").value.split("\n").map(value => value.trim()).filter(Boolean);
  state.selectedKey = `${context.kind === "chapter" ? "chapter" : "topic"}:${number}`;
  saveData();
  render();
  showToast("大綱已儲存");
}

function saveQuestion() {
  const context = findNode(state.selectedKey);
  if (!context) return;
  const questionID = Number(document.querySelector("#questionID").value);
  const title = document.querySelector("#questionTitle").value.trim();
  const type = document.querySelector("#questionType").value;
  const chapterNumber = document.querySelector("#questionChapterNumber").value.trim();
  const options = [...document.querySelectorAll(".option-row")].map(row => ({ id: row.querySelector("[data-option-id]").dataset.optionId, text: row.querySelector("[data-option-id]").value.trim() })).filter(option => option.text);
  const correctOptionIDs = [...document.querySelectorAll("input[name='correctOption']:checked")].map(input => input.value);
  if (!Number.isInteger(questionID) || questionID <= 0) return showToast("試題編號必須是正整數");
  const duplicate = state.data.questions.find(questionItem => Number(questionItem.id) === questionID && String(questionItem.id) !== String(state.editingQuestionId));
  if (duplicate) return showToast(`試題編號 #${questionID} 已存在`);
  if (!title || !chapterNumber || options.length < 2 || !correctOptionIDs.length) return showToast("請填寫題目、參考章節、至少兩個選項和正確答案");
  if (correctOptionIDs.length !== 1) return showToast("每題只能選擇一個答案");
  const item = { id: questionID, chapter: PAPER_NAME, chapterNumber, title, type, options, correctOptionIDs, explanation: document.querySelector("#questionExplanation").value.trim(), tags: [] };
  if (state.editingQuestionId !== "new") removeQuestionFromContents(item.id);
  const index = state.data.questions.findIndex(questionItem => questionItem.id === item.id);
  if (index >= 0) state.data.questions[index] = item; else state.data.questions.push(item);
  const references = referenceNumbers(item.chapterNumber);
  const targetNodes = questionReferenceNodes(item);
  if (!targetNodes.length && context.kind === "topic" && references.includes(context.node.number)) targetNodes.push(context.node);
  targetNodes.forEach(node => attachQuestionToNode(item, node));
  state.editingQuestionId = null;
  state.chapterPickerOpen = false;
  state.chapterPickerQuery = "";
  state.referenceDraft = null;
  saveData();
  render();
  const unresolved = unresolvedQuestionReferences(item);
  showToast(unresolved.length ? `題目已儲存，未對應大綱：${unresolved.join("、")}` : "題目已儲存並關聯大綱");
}

function nextQuestionID() { return Math.max(0, ...state.data.questions.map(item => Number(item.id) || 0)) + 1; }

function addOption() {
  const options = document.querySelectorAll(".option-row");
  const id = String.fromCharCode(65 + options.length);
  const row = document.createElement("div");
  row.className = "option-row";
  row.innerHTML = `<input type="radio" name="correctOption" value="${id}" /><span class="option-id">${id}</span><input class="field option-text" data-option-id="${id}" placeholder="選項內容" />`;
  document.querySelector("#questionOptions").append(row);
}

function exportSnapshot() {
  const blob = new Blob([JSON.stringify(state.data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `gangxian-content-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  saveData("伺服器草稿 · 已匯出");
  showToast("已匯出 App 可用的題庫快照");
}

function importSnapshot(file) {
  if (!file) return;
  document.querySelector("#importForm")?.requestSubmit();
}

function closeContextMenu() {
  const menu = document.querySelector("#outlineContextMenu");
  if (menu) menu.hidden = true;
}

function openContextMenu(event, key) {
  event.preventDefault();
  selectNode(key);
  state.contextMenuKey = key;
  const context = findNode(key);
  const menu = document.querySelector("#outlineContextMenu");
  if (!menu || !context) return;
  document.querySelector("#contextMenuTitle").textContent = context.kind === "chapter"
    ? `第${context.node.number}章 · ${context.node.title}`
    : `${context.node.number} · ${context.node.title}`;
  menu.hidden = false;
  const width = 230;
  const height = 188;
  menu.style.left = `${Math.max(8, Math.min(event.clientX, window.innerWidth - width - 8))}px`;
  menu.style.top = `${Math.max(8, Math.min(event.clientY, window.innerHeight - height - 8))}px`;
}

document.addEventListener("contextmenu", event => {
  const node = event.target.closest("[data-node-key]");
  if (!node) return;
  openContextMenu(event, node.dataset.nodeKey);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeContextMenu();
});

document.addEventListener("click", event => {
  if (!event.target.closest("#outlineContextMenu")) closeContextMenu();
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "toggle-chapter") {
    state.expandedChapters.has(target.dataset.id) ? state.expandedChapters.delete(target.dataset.id) : state.expandedChapters.add(target.dataset.id);
    renderOutline();
  }
  if (action === "select-node") {
    const context = findNode(target.dataset.key);
    selectNode(target.dataset.key);
    if (context?.kind === "topic" && context.node.children?.length) {
      if (state.expandedNodes.has(context.node.id)) {
        state.expandedNodes.delete(context.node.id);
      } else {
        state.expandedNodes.add(context.node.id);
      }
      renderOutline();
    }
  }
  if (action === "edit-questions") {
    selectNode(target.dataset.key);
    state.editingQuestionId = "new";
    renderEditor();
  }
  if (action === "edit-question") {
    if (target.dataset.nodeKey) selectNode(target.dataset.nodeKey);
    state.referenceDraft = null;
    state.chapterPickerOpen = false;
    state.editingQuestionId = target.dataset.id;
    renderEditor();
  }
  if (action === "newQuestion") { state.referenceDraft = null; state.chapterPickerOpen = false; state.editingQuestionId = "new"; renderEditor(); }
  if (action === "cancel-question") { state.referenceDraft = null; state.chapterPickerOpen = false; state.chapterPickerQuery = ""; state.editingQuestionId = null; renderEditor(); }
  if (action === "save-node") saveNode();
  if (action === "add-child" || action === "new-child") { if (action === "new-child") state.selectedKey = state.contextMenuKey; closeContextMenu(); addChild(); }
  if (action === "new-question") { state.selectedKey = state.contextMenuKey; closeContextMenu(); state.referenceDraft = null; state.chapterPickerOpen = false; state.editingQuestionId = "new"; renderEditor(); }
  if (action === "link-question") { state.selectedKey = state.contextMenuKey; closeContextMenu(); state.linkQuery = ""; state.editingQuestionId = "link"; renderEditor(); }
  if (action === "toggle-reference-picker") { state.chapterPickerOpen = !state.chapterPickerOpen; renderEditor(); }
  if (action === "toggle-question-reference") {
    const current = state.referenceDraft ?? document.querySelector("#questionChapterNumber")?.value ?? "";
    const references = referenceNumbers(current);
    const number = target.dataset.number;
    state.referenceDraft = references.includes(number) ? references.filter(reference => reference !== number).join(" & ") : [...references, number].join(" & ");
    renderEditor();
  }
  if (action === "link-question-item") linkQuestion(target.dataset.id);
  if (action === "delete-node") deleteNode();
  if (action === "save-question") saveQuestion();
  if (action === "add-option") addOption();
  if (action === "delete-question") {
    state.data.questions = state.data.questions.filter(item => String(item.id) !== String(target.dataset.id));
    state.editingQuestionId = null;
    saveData();
    render();
    showToast("題目已刪除");
  }
});

document.querySelector("#newQuestionButton").addEventListener("click", () => { state.editingQuestionId = "new"; renderEditor(); });
document.querySelector("#addChapterButton").addEventListener("click", () => {
  const number = String(state.data.paperOneSyllabus.length + 1);
  const item = chapter(number, "新章節", "", []);
  state.data.paperOneSyllabus.push(item);
  state.selectedKey = `chapter:${number}`;
  saveData();
  render();
  showToast("已新增新章節");
});
document.querySelector("#collapseAllButton").addEventListener("click", () => { state.expandedChapters.clear(); state.expandedNodes.clear(); renderOutline(); });
document.querySelector("#outlineSearch").addEventListener("input", event => { state.search = event.target.value; renderOutline(); });
document.addEventListener("input", event => {
  if (event.target.id === "questionChapterNumber") {
    state.referenceDraft = event.target.value;
    return;
  }
  if (event.target.id === "chapterPickerSearch") {
    state.chapterPickerQuery = event.target.value;
    const context = findNode(state.selectedKey);
    const picker = document.querySelector(".outline-picker");
    if (context && picker) {
      const value = event.target.value;
      picker.outerHTML = renderReferencePicker(state.referenceDraft ?? document.querySelector("#questionChapterNumber")?.value ?? "");
      const nextSearch = document.querySelector("#chapterPickerSearch");
      nextSearch?.focus();
      nextSearch?.setSelectionRange(value.length, value.length);
    }
    return;
  }
  if (event.target.id !== "linkQuestionSearch") return;
  state.linkQuery = event.target.value;
  const context = findNode(state.selectedKey);
  const list = document.querySelector("#linkQuestionList");
  if (context && list) list.outerHTML = renderLinkQuestionList(context);
});
document.querySelector("#exportButton").addEventListener("click", exportSnapshot);
document.querySelector("#importButton").addEventListener("click", () => document.querySelector("#importInput").click());
document.querySelector("#importInput").addEventListener("change", event => { if (event.target.files[0]) importSnapshot(event.target.files[0]); event.target.value = ""; });

render();
if (unresolvedQuestionCount()) {
  showToast(`有 ${unresolvedQuestionCount()} 道試題的參考章節未對應大綱，請用大綱選擇器關聯`);
}
