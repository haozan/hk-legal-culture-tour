require 'digest'

class ContentSnapshot < ApplicationRecord
  # Convert legacy Simplified Chinese snapshots before they reach the admin or App.
  TRADITIONAL_CHARACTERS = {
    '与': '與',
    '专': '專',
    '业': '業',
    '两': '兩',
    '个': '個',
    '为': '為',
    '么': '麼',
    '义': '義',
    '习': '習',
    '买': '買',
    '于': '於',
    '产': '產',
    '从': '從',
    '价': '價',
    '优': '優',
    '会': '會',
    '伤': '傷',
    '体': '體',
    '余': '餘',
    '佣': '傭',
    '侧': '側',
    '偿': '償',
    '储': '儲',
    '关': '關',
    '内': '內',
    '写': '寫',
    '决': '決',
    '况': '況',
    '准': '準',
    '击': '擊',
    '划': '劃',
    '则': '則',
    '删': '刪',
    '别': '別',
    '务': '務',
    '动': '動',
    '区': '區',
    '协': '協',
    '单': '單',
    '厘': '釐',
    '参': '參',
    '发': '發',
    '台': '臺',
    '号': '號',
    '后': '後',
    '吗': '嗎',
    '启': '啟',
    '员': '員',
    '响': '響',
    '团': '團',
    '围': '圍',
    '场': '場',
    '处': '處',
    '备': '備',
    '复': '復',
    '够': '夠',
    '学': '學',
    '实': '實',
    '对': '對',
    '导': '導',
    '寿': '壽',
    '尝': '嘗',
    '层': '層',
    '属': '屬',
    '巩': '鞏',
    '并': '並',
    '广': '廣',
    '库': '庫',
    '应': '應',
    '开': '開',
    '张': '張',
    '弥': '彌',
    '当': '當',
    '录': '錄',
    '态': '態',
    '户': '戶',
    '托': '託',
    '执': '執',
    '护': '護',
    '报': '報',
    '担': '擔',
    '择': '擇',
    '挂': '掛',
    '损': '損',
    '据': '據',
    '摊': '攤',
    '数': '數',
    '无': '無',
    '旧': '舊',
    '时': '時',
    '暂': '暫',
    '术': '術',
    '机': '機',
    '权': '權',
    '条': '條',
    '来': '來',
    '构': '構',
    '标': '標',
    '树': '樹',
    '样': '樣',
    '检': '檢',
    '污': '汙',
    '没': '沒',
    '济': '濟',
    '润': '潤',
    '潜': '潛',
    '点': '點',
    '状': '狀',
    '现': '現',
    '监': '監',
    '确': '確',
    '离': '離',
    '种': '種',
    '积': '積',
    '称': '稱',
    '稳': '穩',
    '笔': '筆',
    '筹': '籌',
    '签': '籤',
    '类': '類',
    '红': '紅',
    '约': '約',
    '级': '級',
    '纪': '紀',
    '纯': '純',
    '纲': '綱',
    '线': '線',
    '练': '練',
    '组': '組',
    '终': '終',
    '绍': '紹',
    '经': '經',
    '结': '結',
    '络': '絡',
    '继': '繼',
    '续': '續',
    '维': '維',
    '综': '綜',
    '缓': '緩',
    '编': '編',
    '缴': '繳',
    '网': '網',
    '职': '職',
    '联': '聯',
    '节': '節',
    '范': '範',
    '荐': '薦',
    '获': '獲',
    '营': '營',
    '虑': '慮',
    '补': '補',
    '见': '見',
    '规': '規',
    '览': '覽',
    '计': '計',
    '订': '訂',
    '认': '認',
    '让': '讓',
    '训': '訓',
    '议': '議',
    '记': '記',
    '设': '設',
    '证': '證',
    '评': '評',
    '识': '識',
    '诈': '詐',
    '诉': '訴',
    '试': '試',
    '诚': '誠',
    '该': '該',
    '说': '說',
    '请': '請',
    '诺': '諾',
    '读': '讀',
    '财': '財',
    '责': '責',
    '败': '敗',
    '质': '質',
    '贪': '貪',
    '购': '購',
    '贯': '貫',
    '贴': '貼',
    '费': '費',
    '资': '資',
    '赔': '賠',
    '转': '轉',
    '轮': '輪',
    '辑': '輯',
    '输': '輸',
    '过': '過',
    '运': '運',
    '还': '還',
    '这': '這',
    '违': '違',
    '连': '連',
    '适': '適',
    '选': '選',
    '钱': '錢',
    '销': '銷',
    '键': '鍵',
    '问': '問',
    '间': '間',
    '际': '際',
    '险': '險',
    '难': '難',
    '雇': '僱',
    '静': '靜',
    '页': '頁',
    '项': '項',
    '须': '須',
    '预': '預',
    '频': '頻',
    '题': '題',
    '颜': '顏',
    '额': '額',
    '风': '風',
    '验': '驗',
    '骗': '騙',
    '骤': '驟'
  }.freeze

  validates :paper_name, presence: true, uniqueness: true

  PAPER_NAME = '保險原理及實務'.freeze
  PAPER_TWO_NAME = '一般保險'.freeze
  PAPER_THREE_NAME = '長期保險'.freeze
  PAPER_FOUR_NAME = '強積金計劃'.freeze
  PAPER_FIVE_NAME = '投資相連長期保險'.freeze
  PAPER_NAMES = [PAPER_NAME, PAPER_TWO_NAME, PAPER_THREE_NAME, PAPER_FOUR_NAME, PAPER_FIVE_NAME].freeze

  def self.traditionalize_data(value)
    case value
    when String
      value.each_char.map { |character| TRADITIONAL_CHARACTERS.fetch(character, character) }.join
    when Array
      value.map { |item| traditionalize_data(item) }
    when Hash
      value.to_h { |key, item| [key, traditionalize_data(item)] }
    else
      value
    end
  end

  def self.default_data
    question_bank_path = Rails.root.join('db', 'content_q1_q50_questions.json')
    question_bank = JSON.parse(File.read(question_bank_path)) if File.exist?(question_bank_path)

    data = {
      version: 'draft-2026.10.18-q1-927',
      chapterNames: PAPER_NAMES,
      questions: question_bank || [
        question(1, '1.1.1', '保險的最大誠信原則要求投保人如實披露重要事實。以下哪項最符合該原則？', '單選題', ['只披露對自己有利的資料', '投保時披露足以影響承保決定的所有重要事實', '簽約後才披露重要事實', '由保險代理人代為決定披露範圍'], ['B'], '最大誠信原則貫穿訂立合約的全過程，投保人、被保險人及保險人都應披露重要事實。', ['核心概念', '卷一']),
        question(2, '1.2', '以下哪些屬於釐定一般保險保費時通常考慮的因素？', '多選題', ['風險發生的機率', '潛在損失幅度', '營運費用', '投保人的幸運顏色'], ['A', 'B', 'C'], '保費通常綜合風險機率、損失幅度、營運費用、資本成本及所需利潤等因素。', ['多選', '卷一']),
        question(3, '2.1.1', '在合約成立時，哪一項屬於有效合約的重要元素？', '單選題', ['要約與承諾', '幸運數字', '廣告顏色', '代理人的個人偏好'], ['A'], '合約通常需要具備要約、承諾、代價及建立法律關係的意向等元素。', ['法律原則', '卷一']),
        question(4, '4.1', '保險中介人向客戶介紹產品時，哪些做法符合客戶為本原則？', '多選題', ['瞭解客戶的需要和財務狀況', '說明產品的主要風險和費用', '只推薦傭金最高的產品', '提供與客戶情況相稱的建議'], ['A', 'B', 'D'], '銷售過程應充分了解客戶需要、風險承受能力及支付能力，並提供合適、清晰的建議。', ['合規', '卷一']),
        question(5, '3.1.1', '人壽保險的保險利益通常須在何時存在？', '單選題', ['訂立保單時', '每次繳費時', '理賠完成後', '保單失效後'], ['A'], '人壽保險的保險利益須在保單訂立時存在。', ['高頻考點', '卷一']),
        question(6, '5.1.1', '風險管理的首要步驟通常是什麼？', '單選題', ['識別和分析風險', '立即購買最高保額的保單', '忽略低機率風險', '只記錄已經發生的損失'], ['A'], '風險管理通常先識別、分析和評估風險，再決定處理方法。', ['風險管理', '卷一'])
      ],
      paperOneSyllabus: [
        chapter('1', '風險及保險', '12%', [
          topic('1.1.1', '風險的意義', [topic('1.1.1.1', '風險與損失', [topic('1.1.1.1.1', '損失發生的可能性'), topic('1.1.1.1.2', '損失的經濟後果')]), topic('1.1.1.2', '風險的不確定性'), topic('1.1.1.3', '可保風險的基本條件', [topic('1.1.1.3.1', '損失可以用金錢衡量'), topic('1.1.1.3.2', '風險發生具有偶然性')])]),
          topic('1.1.2', '風險的類別', [topic('1.1.2.1', '純粹風險與投機風險'), topic('1.1.2.2', '靜態風險與動態風險')]),
          topic('1.1.3', '風險管理', [topic('1.1.3.1', '識別、分析及評估風險'), topic('1.1.3.2', '風險處理方法')]),
          topic('1.2', '保險功能及好處', [topic('1.2.1', '風險轉移與分散'), topic('1.2.2', '經濟保障及社會功能')])
        ]),
        chapter('2', '法律原則', '16%', [topic('2.1.1', '合約法：定義'), topic('2.1.2', '合約種類'), topic('2.1.3', '合約元素和要點'), topic('2.1.4', '合約的相對性'), topic('2.2.1', '代理法：定義'), topic('2.2.2', '代理關係如何產生'), topic('2.2.3', '代理人的許可權'), topic('2.2.4', '代理人對委託人的責任'), topic('2.2.5', '委託人對代理人的責任'), topic('2.2.6', '終止代理')]),
        chapter('3', '保險原則', '30%', [topic('3.1.1', '可保權益'), topic('3.1.2', '可保權益的重要性'), topic('3.1.3', '可保權益的必要條件'), topic('3.1.4', '可保權益如何產生'), topic('3.1.5', '可保權益何時需要'), topic('3.1.6', '轉讓'), topic('3.2.1–3.2.2', '一般誠信及最高誠信'), topic('3.2.3', '重要事實'), topic('3.2.4', '何時披露重要事實'), topic('3.2.5', '違反最高誠信'), topic('3.2.6', '違反最高誠信的補救方法'), topic('3.3.1', '近因'), topic('3.3.2', '危險的種類'), topic('3.3.3', '近因原則的應用'), topic('3.3.4', '保單對原則的更改')]),
        chapter('4', '保險公司的主要功能', '9%', [topic('4.1', '產品的開發'), topic('4.2', '客戶服務'), topic('4.3', '市場營銷及促銷'), topic('4.4', '保險的銷售'), topic('4.5', '核保'), topic('4.6', '保單的處理'), topic('4.7', '理賠'), topic('4.8', '再保險'), topic('4.9', '精算支援'), topic('4.10', '會計及投資'), topic('4.11', '培訓及發展'), topic('4.12', '管控要員')]),
        chapter('5', '香港保險業結構', '5%', [topic('5.1.1', '保險業務種類：法定分類'), topic('5.1.2', '保險業務種類：實務分類'), topic('5.1.3', '保險業務種類：學術分類'), topic('5.1.4', '再保險'), topic('5.2', '行業規模'), topic('5.3', '保險公司'), topic('5.4', '保險中介人'), topic('5.5.1', '香港保險業聯會'), topic('5.5.2', '認可保險經紀團體')]),
        chapter('6', '保險業的規管架構', '21%', [topic('6.1.1', '《保險業條例》'), topic('6.1.2', '《承保商專業守則》'), topic('6.1.3', '保險投訴局'), topic('6.2.1', '監管保險中介人的持牌制度'), topic('6.2.2', '獲授權保險人與其代理人的關係'), topic('6.2.3', '持牌保險中介人的多重角色'), topic('6.2.4', '發牌'), topic('6.2.5', '其他監管措施')]),
        chapter('7', '職業道德及其他有關問題', '7%', [topic('7.1', '保險中介人對保單持有人的責任'), topic('7.2', '保護個人資料'), topic('7.3', '平等機會事宜'), topic('7.4', '打擊洗錢及恐怖分子資金籌集'), topic('7.5', '防止貪汙'), topic('7.6', '防止保險詐騙')])
      ]
    }

    traditionalize_data(with_explanation_contents(data).deep_stringify_keys)
  end

  def self.default_data_for(paper_name)
    return default_data if paper_name.to_s == PAPER_NAME

    path = Rails.root.join('db', 'content_q2_general_insurance.json') if paper_name.to_s == PAPER_TWO_NAME
    path = Rails.root.join('db', 'content_q3_long_term_insurance.json') if paper_name.to_s == PAPER_THREE_NAME
    path = Rails.root.join('db', 'content_q4_mpf.json') if paper_name.to_s == PAPER_FOUR_NAME
    path = Rails.root.join('db', 'content_q5_investment_linked.json') if paper_name.to_s == PAPER_FIVE_NAME
    return JSON.parse(File.read(path)) if path && File.exist?(path)

    nil
  end

  def self.merge_question_bank_data(existing_data = nil, paper_name = PAPER_NAME)
    source = default_data_for(paper_name) || default_data
    existing = traditionalize_data(existing_data.presence || {})
    existing_questions = Array(existing['questions']).index_by { |question| question['id'].to_i }
    source['questions'] = source['questions'].map do |question|
      existing_questions[question['id'].to_i].presence || question
    end
    source['paperOneSyllabus'] = existing['paperOneSyllabus'] if existing['paperOneSyllabus'].is_a?(Array) && existing['paperOneSyllabus'].any?
    source['chapterNames'] = existing['chapterNames'] if paper_name.to_s != PAPER_NAME && existing['chapterNames'].is_a?(Array) && existing['chapterNames'].any?
    source['chapterNames'] = PAPER_NAMES if paper_name.to_s == PAPER_NAME
    source['version'] = case paper_name.to_s
                        when PAPER_TWO_NAME then 'draft-2026.10.18-q2-zp5-2026-09-682'
                        when PAPER_THREE_NAME then 'draft-2026.10.18-q3-eg1-944'
                        when PAPER_FOUR_NAME then 'draft-2026.10.18-q4-gcx-600'
                        when PAPER_FIVE_NAME then 'draft-2026.10.18-q5-mlh-649'
                        else 'draft-2026.10.18-q1-927'
                        end
    traditionalize_data(with_explanation_contents(source).deep_stringify_keys)
  end

  # Add every question explanation to the most specific syllabus node that
  # matches its reference chapter. Identical explanations share one content
  # line and keep all related question IDs, so the clients can render one bell
  # per question without duplicating the sentence.
  def self.with_explanation_contents(data)
    snapshot = data.deep_dup
    questions = Array(snapshot[:questions] || snapshot['questions'])
    chapters = Array(snapshot[:paperOneSyllabus] || snapshot['paperOneSyllabus'])
    nodes = chapters.flat_map { |chapter| flatten_topics(chapter) }
    grouped = Hash.new { |hash, key| hash[key] = {} }

    nodes.each do |node|
      existing = Array(node[:contents] || node['contents'])
      existing.each do |item|
        content = item.deep_dup
        text = content[:text] || content['text']
        next if text.to_s.strip.empty?

        content['id'] = content[:id] || content['id'] || content_id(node, text)
        content['text'] = text
        content['questionIDs'] = Array(content[:questionIDs] || content['questionIDs']).map(&:to_i).uniq
        existing_content = grouped[node.object_id][text]
        if existing_content
          existing_content['questionIDs'] = (Array(existing_content['questionIDs']) + Array(content['questionIDs'])).map(&:to_i).uniq
        else
          grouped[node.object_id][text] = content
        end
      end
    end

    questions.each do |question|
      question['tags'] = []
      explanation = (question[:explanation] || question['explanation']).to_s.strip
      next if explanation.empty?

      references = reference_numbers(question[:chapterNumber] || question['chapterNumber'])
      references.each do |reference|
        matching_nodes = matching_nodes_for(nodes, reference)
        matching_nodes.each do |node|
          text = explanation
          item = grouped[node.object_id][text] ||= {
            'id' => content_id(node, text),
            'text' => text,
            'questionIDs' => []
          }
          question_id = (question[:id] || question['id']).to_i
          item['questionIDs'] << question_id unless item['questionIDs'].include?(question_id)
        end
      end
    end

    nodes.each do |node|
      node['contents'] = grouped[node.object_id].values
    end
    snapshot
  end

  def self.flatten_topics(chapter_or_topic)
    children_key = chapter_or_topic.key?(:topics) || chapter_or_topic.key?('topics') ? :topics : :children
    children = Array(chapter_or_topic[children_key] || chapter_or_topic[children_key.to_s])
    children.flat_map { |child| [child, *flatten_topics(child)] }
  end
  private_class_method :flatten_topics

  def self.reference_numbers(value)
    compact = value.to_s.gsub(/[[:space:]]+/, '').tr('（）', '()')
    compact.scan(/\d+(?:\.\d+)*(?:[a-z])?(?:\([a-z]\))?/i).flat_map do |token|
      base = token.sub(/\([a-z]\)\z/i, '')
      [token, base].uniq
    end
  end
  private_class_method :reference_numbers

  def self.matching_nodes_for(nodes, reference)
    exact = nodes.select { |node| node_number(node) == reference }
    return exact unless exact.empty?

    descendants = nodes.select { |node| node_number(node).start_with?("#{reference}.") }
    return [] if descendants.empty?

    minimum_depth = descendants.map { |node| node_number(node).count('.') }.min
    descendants.select { |node| node_number(node).count('.') == minimum_depth }.first(1)
  end
  private_class_method :matching_nodes_for

  def self.node_number(node)
    node[:number] || node['number']
  end
  private_class_method :node_number

  def self.content_id(node, text)
    number = node_number(node).to_s.gsub(/[^0-9A-Za-z.-]/, '-')
    "explanation-#{number}-#{Digest::SHA256.hexdigest(text.to_s)[0, 10]}"
  end
  private_class_method :content_id

  def self.question(id, number, title, type, option_texts, correct_ids, explanation, tags)
    { id: id, chapter: PAPER_NAME, chapterNumber: number, title: title, type: type,
      options: option_texts.each_with_index.map { |text, index| { id: (65 + index).chr, text: text } },
      correctOptionIDs: correct_ids, explanation: explanation, tags: tags }
  end

  def self.topic(number, title, children = [])
    { id: number, number: number, title: title, keyPoints: [], contents: [], children: children }
  end

  def self.chapter(number, title, weight, topics)
    { id: number, number: number, title: title, weight: weight, topics: topics }
  end
end
