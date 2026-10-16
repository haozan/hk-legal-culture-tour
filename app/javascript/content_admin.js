/* global document, console, structuredClone, fetch, URLSearchParams, clearTimeout, setTimeout, Blob, URL */

const PAPER_NAME = "保险原理及实务";
const PAPER_NAMES = ["保险原理及实务", "人寿保险", "一般保险", "法规与合规", "风险管理"];

const seedSnapshot = {
  version: "draft-2026.10.16",
  chapterNames: PAPER_NAMES,
  questions: [
    question(1, "1.1.1", "保险的最大诚信原则要求投保人如实披露重要事实。以下哪项最符合该原则？", "单选题", ["只披露对自己有利的资料", "投保时披露足以影响承保决定的所有重要事实", "签约后才披露重要事实", "由保险代理人代为决定披露范围"], ["B"], "最大诚信原则贯穿订立合约的全过程，投保人、被保险人及保险人都应披露重要事实。", ["核心概念", "卷一"]),
    question(2, "1.2", "以下哪些属于厘定一般保险保费时通常考虑的因素？", "多选题", ["风险发生的概率", "潜在损失幅度", "营运费用", "投保人的幸运颜色"], ["A", "B", "C"], "保费通常综合风险概率、损失幅度、营运费用、资本成本及所需利润等因素。", ["多选", "卷一"]),
    question(3, "2.1.1", "在合约成立时，哪一项属于有效合约的重要元素？", "单选题", ["要约与承诺", "幸运数字", "广告颜色", "代理人的个人偏好"], ["A"], "合约通常需要具备要约、承诺、代价及建立法律关系的意向等元素。", ["法律原则", "卷一"]),
    question(4, "4.1", "保险中介人向客户介绍产品时，哪些做法符合客户为本原则？", "多选题", ["了解客户的需要和财务状况", "说明产品的主要风险和费用", "只推荐佣金最高的产品", "提供与客户情况相称的建议"], ["A", "B", "D"], "销售过程应充分了解客户需要、风险承受能力及支付能力，并提供合适、清晰的建议。", ["合规", "卷一"]),
    question(5, "3.1.1", "人寿保险的保险利益通常须在何时存在？", "单选题", ["订立保单时", "每次缴费时", "理赔完成后", "保单失效后"], ["A"], "人寿保险的保险利益须在保单订立时存在。", ["高频考点", "卷一"]),
    question(6, "5.1.1", "风险管理的首要步骤通常是什么？", "单选题", ["识别和分析风险", "立即购买最高保额的保单", "忽略低概率风险", "只记录已经发生的损失"], ["A"], "风险管理通常先识别、分析和评估风险，再决定处理方法。", ["风险管理", "卷一"])
  ],
  paperOneSyllabus: [
    chapter("1", "风险及保险", "12%", [
      topic("1.1.1", "风险的意义", [topic("1.1.1.1", "风险与损失", [topic("1.1.1.1.1", "损失发生的可能性"), topic("1.1.1.1.2", "损失的经济后果")]), topic("1.1.1.2", "风险的不确定性"), topic("1.1.1.3", "可保风险的基本条件", [topic("1.1.1.3.1", "损失可以用金钱衡量"), topic("1.1.1.3.2", "风险发生具有偶然性")])]),
      topic("1.1.2", "风险的类别", [topic("1.1.2.1", "纯粹风险与投机风险"), topic("1.1.2.2", "静态风险与动态风险")]),
      topic("1.1.3", "风险管理", [topic("1.1.3.1", "识别、分析及评估风险"), topic("1.1.3.2", "风险处理方法")]),
      topic("1.2", "保险功能及好处", [topic("1.2.1", "风险转移与分散"), topic("1.2.2", "经济保障及社会功能")])
    ]),
    chapter("2", "法律原则", "16%", [topic("2.1.1", "合约法：定义"), topic("2.1.2", "合约种类"), topic("2.1.3", "合约元素和要点"), topic("2.1.4", "合约的相对性"), topic("2.2.1", "代理法：定义"), topic("2.2.2", "代理关系如何产生"), topic("2.2.3", "代理人的权限"), topic("2.2.4", "代理人对委托人的责任"), topic("2.2.5", "委托人对代理人的责任"), topic("2.2.6", "终止代理")]),
    chapter("3", "保险原则", "30%", [topic("3.1.1", "可保权益"), topic("3.1.2", "可保权益的重要性"), topic("3.1.3", "可保权益的必要条件"), topic("3.1.4", "可保权益如何产生"), topic("3.1.5", "可保权益何时需要"), topic("3.1.6", "转让"), topic("3.2.1–3.2.2", "一般诚信及最高诚信"), topic("3.2.3", "重要事实"), topic("3.2.4", "何时披露重要事实"), topic("3.2.5", "违反最高诚信"), topic("3.2.6", "违反最高诚信的补救方法"), topic("3.3.1", "近因"), topic("3.3.2", "危险的种类"), topic("3.3.3", "近因原则的应用"), topic("3.3.4", "保单对原则的更改")]),
    chapter("4", "保险公司的主要功能", "9%", [topic("4.1", "产品的开发"), topic("4.2", "客户服务"), topic("4.3", "市场营销及促销"), topic("4.4", "保险的销售"), topic("4.5", "核保"), topic("4.6", "保单的处理"), topic("4.7", "理赔"), topic("4.8", "再保险"), topic("4.9", "精算支援"), topic("4.10", "会计及投资"), topic("4.11", "培训及发展"), topic("4.12", "管控要员")]),
    chapter("5", "香港保险业结构", "5%", [topic("5.1.1", "保险业务种类：法定分类"), topic("5.1.2", "保险业务种类：实务分类"), topic("5.1.3", "保险业务种类：学术分类"), topic("5.1.4", "再保险"), topic("5.2", "行业规模"), topic("5.3", "保险公司"), topic("5.4", "保险中介人"), topic("5.5.1", "香港保险业联会"), topic("5.5.2", "认可保险经纪团体")]),
    chapter("6", "保险业的规管架构", "21%", [topic("6.1.1", "《保险业条例》"), topic("6.1.2", "《承保商专业守则》"), topic("6.1.3", "保险投诉局"), topic("6.2.1", "监管保险中介人的持牌制度"), topic("6.2.2", "获授权保险人与其代理人的关系"), topic("6.2.3", "持牌保险中介人的多重角色"), topic("6.2.4", "发牌"), topic("6.2.5", "其他监管措施")]),
    chapter("7", "职业道德及其他有关问题", "7%", [topic("7.1", "保险中介人对保单持有人的责任"), topic("7.2", "保护个人资料"), topic("7.3", "平等机会事宜"), topic("7.4", "打击洗钱及恐怖分子资金筹集"), topic("7.5", "防止贪污"), topic("7.6", "防止保险诈骗")])
  ]
};

function question(id, chapterNumber, title, type, optionTexts, correctOptionIDs, explanation, tags) {
  return { id, chapter: PAPER_NAME, chapterNumber, title, type, options: optionTexts.map((text, index) => ({ id: String.fromCharCode(65 + index), text })), correctOptionIDs, explanation, tags };
}
function topic(number, title, children = [], keyPoints = []) { return { id: number, number, title, keyPoints, children }; }
function chapter(number, title, weight, topics) { return { id: number, number, title, weight, topics }; }

const state = {
  data: loadData(),
  selectedKey: "chapter:1",
  editingQuestionId: null,
  expandedChapters: new Set(["1"]),
  expandedNodes: new Set(["1.1.1"]),
  search: ""
};

function loadData() {
  try {
    const serialized = document.querySelector("#gangxian-content-data")?.textContent;
    if (serialized) return JSON.parse(serialized);
  } catch (error) { console.warn(error); }
  return structuredClone(seedSnapshot);
}

function saveData(message = "服务器草稿 · 保存中") {
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
    if (!response.ok) throw new Error("保存失败");
    status.textContent = "服务器草稿 · 已保存";
  }).catch(error => {
    console.error(error);
    status.textContent = "服务器草稿 · 保存失败";
    showToast("服务器保存失败，请检查网络连接");
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
  const numbers = [node, ...descendants(node)].map(item => item.number);
  return state.data.questions.filter(questionItem => referenceNumbers(questionItem.chapterNumber).some(reference => numbers.some(number => reference === number || reference.startsWith(`${number}.`))));
}

function chapterQuestionCount(chapterItem) {
  return new Set(chapterItem.topics.flatMap(nodeQuestions).map(item => item.id)).size;
}

function findNode(key) {
  if (key.startsWith("chapter:")) {
    const chapterItem = state.data.paperOneSyllabus.find(item => item.id === key.slice(8));
    return chapterItem ? { node: chapterItem, kind: "chapter", chapter: chapterItem, parent: null } : null;
  }
  const nodeID = key.slice(6);
  for (const chapterItem of state.data.paperOneSyllabus) {
    const allNodes = [...chapterItem.topics.flatMap(node => [node, ...descendants(node)])];
    const nodeItem = allNodes.find(item => item.id === nodeID);
    if (nodeItem) return { node: nodeItem, kind: "topic", chapter: chapterItem, parent: null };
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
      <span class="paper-copy"><strong>${escapeHtml(name)}</strong><span>${index === 0 ? "可编辑" : "待录入"}</span></span>
    </button>
  `).join("");
}

function renderMetrics() {
  const totalQuestions = state.data.questions.length;
  document.querySelector("#headMetrics").innerHTML = `
    <div class="metric"><strong>${state.data.paperOneSyllabus.length}</strong><span>章节</span></div>
    <div class="metric"><strong>${totalNodeCount()}</strong><span>大纲节点</span></div>
    <div class="metric"><strong>${totalQuestions}</strong><span>题目</span></div>
  `;
}

function renderOutline() {
  const query = state.search.trim().toLowerCase();
  const chapters = state.data.paperOneSyllabus.filter(chapterItem => !query || JSON.stringify(chapterItem).toLowerCase().includes(query));
  document.querySelector("#outlineTree").innerHTML = chapters.map(renderChapter).join("") || `<div class="empty-state"><h3>没有匹配的大纲</h3><p>尝试搜索章节编号或标题。</p></div>`;
}

function renderChapter(chapterItem) {
  const expanded = state.expandedChapters.has(chapterItem.id);
  const topicMarkup = expanded ? `<div class="chapter-children">${chapterItem.topics.map(node => renderNode(node, 0)).join("")}</div>` : "";
  return `<div class="tree-chapter">
    <button class="chapter-row" data-action="toggle-chapter" data-id="${escapeHtml(chapterItem.id)}">
      <span class="chevron">${expanded ? "⌄" : "›"}</span>
      <span class="chapter-number">第${escapeHtml(chapterItem.number)}章</span>
      <span class="chapter-title">${escapeHtml(chapterItem.title)}</span>
      <span class="chapter-weight">${chapterItem.topics.length}节 · ${chapterQuestionCount(chapterItem)}题 · ${escapeHtml(chapterItem.weight || "—")}</span>
    </button>
    ${topicMarkup}
  </div>`;
}

function renderNode(node, depth) {
  const expanded = state.expandedNodes.has(node.id);
  const children = node.children || [];
  const questions = nodeQuestions(node);
  const childrenMarkup = expanded && children.length ? `<div class="node-children">${children.map(child => renderNode(child, depth + 1)).join("")}</div>` : "";
  const questionButton = questions.length ? `<button class="question-link" data-action="edit-questions" data-key="topic:${escapeHtml(node.id)}" title="${questions.length} 道题">▣</button>` : "";
  return `<div class="tree-node" data-depth="${depth}">
    <div class="node-row">
      <button class="node-main" data-action="select-node" data-key="topic:${escapeHtml(node.id)}">
        <span class="node-chevron">${children.length ? (expanded ? "⌄" : "›") : "·"}</span>
        <span class="node-copy"><span class="node-number">${escapeHtml(node.number)}</span><span class="node-title">${escapeHtml(node.title)}</span></span>
      </button>
      ${questionButton}
    </div>
    ${childrenMarkup}
  </div>`;
}

function renderEditor() {
  const context = findNode(state.selectedKey);
  const button = document.querySelector("#newQuestionButton");
  button.disabled = !context;
  if (!context) {
    document.querySelector("#selectionEyebrow").textContent = "选择一个大纲节点";
    document.querySelector("#selectionTitle").textContent = "开始录入内容";
    document.querySelector("#selectionHint").textContent = "从左侧选择章节或小节。";
    document.querySelector("#editorContent").className = "editor-content empty-state";
    document.querySelector("#editorContent").innerHTML = `<div class="empty-illustration">✦</div><h3>从大纲开始</h3><p>选择一个章节或小节，维护标题、比重与题目。</p>`;
    return;
  }
  const node = context.node;
  document.querySelector("#selectionEyebrow").textContent = context.kind === "chapter" ? `第${node.number}章 · 章节设置` : `参考章节 ${node.number}`;
  document.querySelector("#selectionTitle").textContent = node.title;
  document.querySelector("#selectionHint").textContent = `${nodeQuestions(node).length} 道题目 · ${context.kind === "chapter" ? node.topics.length : (node.children || []).length} 个下级节点`;
  document.querySelector("#editorContent").className = "editor-content";
  if (state.editingQuestionId !== null) {
    document.querySelector("#editorContent").innerHTML = renderQuestionEditor(context);
  } else {
    document.querySelector("#editorContent").innerHTML = renderNodeEditor(context);
  }
}

function renderNodeEditor(context) {
  const node = context.node;
  const isChapter = context.kind === "chapter";
  const keyPoints = (node.keyPoints || []).join("\n");
  const questions = nodeQuestions(node);
  return `<div class="editor-section">
    <div class="form-label">基本信息</div>
    <div class="field-row"><label>编号</label><input class="field" id="nodeNumber" value="${escapeHtml(node.number)}" ${isChapter ? "" : ""} /></div>
    <div class="field-row"><label>标题</label><input class="field" id="nodeTitle" value="${escapeHtml(node.title)}" /></div>
    ${isChapter ? `<div class="field-row"><label>考试比重</label><input class="field" id="nodeWeight" value="${escapeHtml(node.weight || "")}" placeholder="例如 12%" /></div>` : `<div class="field-row"><label>上级章节</label><div class="outline-path">第${escapeHtml(context.chapter.number)}章 · ${escapeHtml(context.chapter.title)}</div></div>`}
  </div>
  <div class="editor-section">
    <div class="form-label">大纲层级</div>
    <div class="field-row"><label>下级节点</label><div class="outline-path">${isChapter ? node.topics.length : (node.children || []).length} 个</div></div>
    ${!isChapter ? `<label class="form-label" for="nodeKeyPoints">补充要点（可选，每行一条）</label><textarea class="textarea" id="nodeKeyPoints" placeholder="用于旧版数据兼容；正式层级请使用“添加下级大纲”。">${escapeHtml(keyPoints)}</textarea>` : ""}
    <div class="form-actions"><button class="button small" data-action="add-child">＋ 添加下级大纲</button><button class="button small primary" data-action="save-node">保存大纲</button></div>
  </div>
  <div class="editor-section">
    <div class="form-label">关联题目 · ${questions.length} 道</div>
    <div class="question-list">${questions.length ? questions.map(renderQuestionRow).join("") : `<div class="outline-path">当前节点还没有题目，点击右上角“新题目”开始录入。</div>`}</div>
  </div>`;
}

function renderQuestionRow(item) {
  return `<div class="question-row"><div class="question-row-main"><div class="question-row-title">${escapeHtml(item.title)}</div><div class="question-row-meta"><span class="tag">${escapeHtml(item.type)}</span><span>参考章节 ${escapeHtml(item.chapterNumber)}</span></div></div><button class="icon-button" data-action="edit-question" data-id="${item.id}" title="编辑">✎</button></div>`;
}

function renderQuestionEditor(context) {
  const existing = state.editingQuestionId === "new" ? null : state.data.questions.find(item => String(item.id) === String(state.editingQuestionId));
  const defaultReference = context.kind === "chapter" ? (context.node.topics[0]?.number || context.node.number) : context.node.number;
  const item = existing || { id: "new", chapter: PAPER_NAME, chapterNumber: defaultReference, title: "", type: "单选题", options: [{ id: "A", text: "" }, { id: "B", text: "" }, { id: "C", text: "" }, { id: "D", text: "" }], correctOptionIDs: [], explanation: "", tags: [] };
  const options = item.options || [];
  return `<div class="editor-section">
    <div class="form-label">题目设置 ${existing ? `· #${item.id}` : "· 新题目"}</div>
    <div class="field-row"><label>题型</label><select class="select" id="questionType"><option ${item.type === "单选题" ? "selected" : ""}>单选题</option><option ${item.type === "多选题" ? "selected" : ""}>多选题</option></select></div>
    <div class="field-row"><label>参考章节</label><input class="field" id="questionChapterNumber" value="${escapeHtml(item.chapterNumber || context.node.number)}" placeholder="例如 1.1.1" /></div>
    <label class="form-label" for="questionTitle">题目正文</label><textarea class="textarea" id="questionTitle" placeholder="输入题目正文">${escapeHtml(item.title)}</textarea>
  </div>
  <div class="editor-section"><div class="form-label">选项与答案</div><div class="options" id="questionOptions">${options.map(option => `<div class="option-row"><input type="radio" name="correctOption" value="${escapeHtml(option.id)}" ${item.correctOptionIDs.includes(option.id) ? "checked" : ""} /><span class="option-id">${escapeHtml(option.id)}</span><input class="field option-text" data-option-id="${escapeHtml(option.id)}" value="${escapeHtml(option.text)}" placeholder="选项内容" /></div>`).join("")}</div><button class="add-option" data-action="add-option">＋ 添加选项</button>${item.type === "多选题" ? `<div class="form-help">多选题按原卷组合选项录入，A/B/C/D 中选择一个组合答案。</div>` : ""}</div>
  <div class="editor-section"><label class="form-label" for="questionExplanation">解析</label><textarea class="textarea" id="questionExplanation" placeholder="输入答案解析">${escapeHtml(item.explanation)}</textarea><div class="field-row" style="margin-top:12px"><label>标签</label><input class="field" id="questionTags" value="${escapeHtml((item.tags || []).join(", "))}" placeholder="例如 高频考点, 卷一" /></div></div>
  <div class="form-actions"><button class="button small" data-action="cancel-question">取消</button>${existing ? `<button class="button small danger" data-action="delete-question" data-id="${item.id}">删除题目</button>` : ""}<button class="button small primary" data-action="save-question" data-id="${item.id}">保存题目</button></div>`;
}

function selectNode(key) {
  state.selectedKey = key;
  state.editingQuestionId = null;
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
  const child = topic(newNumber, "新大纲节点");
  if (context.kind === "chapter") node.topics.push(child); else node.children.push(child);
  state.expandedChapters.add(context.chapter.id);
  state.expandedNodes.add(node.id);
  state.selectedKey = `topic:${child.id}`;
  saveData();
  render();
  showToast("已添加下级大纲");
}

function saveNode() {
  const context = findNode(state.selectedKey);
  if (!context) return;
  const title = document.querySelector("#nodeTitle").value.trim();
  const number = document.querySelector("#nodeNumber").value.trim();
  if (!title || !number) return showToast("编号和标题不能为空");
  context.node.title = title;
  context.node.number = number;
  context.node.id = number;
  if (context.kind === "chapter") context.node.weight = document.querySelector("#nodeWeight").value.trim();
  if (context.kind === "topic" && document.querySelector("#nodeKeyPoints")) context.node.keyPoints = document.querySelector("#nodeKeyPoints").value.split("\n").map(value => value.trim()).filter(Boolean);
  state.selectedKey = `${context.kind === "chapter" ? "chapter" : "topic"}:${number}`;
  saveData();
  render();
  showToast("大纲已保存");
}

function saveQuestion() {
  const context = findNode(state.selectedKey);
  if (!context) return;
  const title = document.querySelector("#questionTitle").value.trim();
  const type = document.querySelector("#questionType").value;
  const chapterNumber = document.querySelector("#questionChapterNumber").value.trim();
  const options = [...document.querySelectorAll(".option-row")].map(row => ({ id: row.querySelector("[data-option-id]").dataset.optionId, text: row.querySelector("[data-option-id]").value.trim() })).filter(option => option.text);
  const correctOptionIDs = [...document.querySelectorAll("input[name='correctOption']:checked")].map(input => input.value);
  if (!title || !chapterNumber || options.length < 2 || !correctOptionIDs.length) return showToast("请填写题目、参考章节、至少两个选项和正确答案");
  if (correctOptionIDs.length !== 1) return showToast("每题只能选择一个答案");
  const item = { id: state.editingQuestionId === "new" ? nextQuestionID() : Number(state.editingQuestionId), chapter: PAPER_NAME, chapterNumber, title, type, options, correctOptionIDs, explanation: document.querySelector("#questionExplanation").value.trim(), tags: document.querySelector("#questionTags").value.split(",").map(value => value.trim()).filter(Boolean) };
  const index = state.data.questions.findIndex(questionItem => questionItem.id === item.id);
  if (index >= 0) state.data.questions[index] = item; else state.data.questions.push(item);
  state.editingQuestionId = null;
  saveData();
  render();
  showToast("题目已保存");
}

function nextQuestionID() { return Math.max(0, ...state.data.questions.map(item => Number(item.id) || 0)) + 1; }

function addOption() {
  const options = document.querySelectorAll(".option-row");
  const id = String.fromCharCode(65 + options.length);
  const row = document.createElement("div");
  row.className = "option-row";
  row.innerHTML = `<input type="radio" name="correctOption" value="${id}" /><span class="option-id">${id}</span><input class="field option-text" data-option-id="${id}" placeholder="选项内容" />`;
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
  saveData("服务器草稿 · 已导出");
  showToast("已导出 App 可用的题库快照");
}

function importSnapshot(file) {
  if (!file) return;
  document.querySelector("#importForm")?.requestSubmit();
}

document.addEventListener("click", event => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "toggle-chapter") {
    state.expandedChapters.has(target.dataset.id) ? state.expandedChapters.delete(target.dataset.id) : state.expandedChapters.add(target.dataset.id);
    renderOutline();
  }
  if (action === "select-node") {
    selectNode(target.dataset.key);
    const context = findNode(target.dataset.key);
    if (context?.kind === "topic" && context.node.children?.length) {
      state.expandedNodes.add(context.node.id);
      renderOutline();
    }
  }
  if (action === "edit-questions") {
    selectNode(target.dataset.key);
    state.editingQuestionId = "new";
    renderEditor();
  }
  if (action === "edit-question") { state.editingQuestionId = target.dataset.id; renderEditor(); }
  if (action === "newQuestion") { state.editingQuestionId = "new"; renderEditor(); }
  if (action === "cancel-question") { state.editingQuestionId = null; renderEditor(); }
  if (action === "save-node") saveNode();
  if (action === "add-child") addChild();
  if (action === "save-question") saveQuestion();
  if (action === "add-option") addOption();
  if (action === "delete-question") {
    state.data.questions = state.data.questions.filter(item => String(item.id) !== String(target.dataset.id));
    state.editingQuestionId = null;
    saveData();
    render();
    showToast("题目已删除");
  }
});

document.querySelector("#newQuestionButton").addEventListener("click", () => { state.editingQuestionId = "new"; renderEditor(); });
document.querySelector("#addChapterButton").addEventListener("click", () => {
  const number = String(state.data.paperOneSyllabus.length + 1);
  const item = chapter(number, "新章节", "", []);
  state.data.paperOneSyllabus.push(item);
  state.selectedKey = `chapter:${number}`;
  saveData();
  render();
  showToast("已添加新章节");
});
document.querySelector("#collapseAllButton").addEventListener("click", () => { state.expandedChapters.clear(); state.expandedNodes.clear(); renderOutline(); });
document.querySelector("#outlineSearch").addEventListener("input", event => { state.search = event.target.value; renderOutline(); });
document.querySelector("#exportButton").addEventListener("click", exportSnapshot);
document.querySelector("#importButton").addEventListener("click", () => document.querySelector("#importInput").click());
document.querySelector("#importInput").addEventListener("change", event => { if (event.target.files[0]) importSnapshot(event.target.files[0]); event.target.value = ""; });

render();
