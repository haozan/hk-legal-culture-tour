require 'digest'

class ContentSnapshot < ApplicationRecord
  validates :paper_name, presence: true, uniqueness: true

  PAPER_NAME = '保险原理及实务'.freeze

  def self.default_data
    question_bank_path = Rails.root.join('db', 'content_q1_q50_questions.json')
    question_bank = JSON.parse(File.read(question_bank_path)) if File.exist?(question_bank_path)

    data = {
      version: 'draft-2026.10.17-outline-content',
      chapterNames: ['保险原理及实务', '人寿保险', '一般保险', '法规与合规', '风险管理'],
      questions: question_bank || [
        question(1, '1.1.1', '保险的最大诚信原则要求投保人如实披露重要事实。以下哪项最符合该原则？', '单选题', ['只披露对自己有利的资料', '投保时披露足以影响承保决定的所有重要事实', '签约后才披露重要事实', '由保险代理人代为决定披露范围'], ['B'], '最大诚信原则贯穿订立合约的全过程，投保人、被保险人及保险人都应披露重要事实。', ['核心概念', '卷一']),
        question(2, '1.2', '以下哪些属于厘定一般保险保费时通常考虑的因素？', '多选题', ['风险发生的概率', '潜在损失幅度', '营运费用', '投保人的幸运颜色'], ['A', 'B', 'C'], '保费通常综合风险概率、损失幅度、营运费用、资本成本及所需利润等因素。', ['多选', '卷一']),
        question(3, '2.1.1', '在合约成立时，哪一项属于有效合约的重要元素？', '单选题', ['要约与承诺', '幸运数字', '广告颜色', '代理人的个人偏好'], ['A'], '合约通常需要具备要约、承诺、代价及建立法律关系的意向等元素。', ['法律原则', '卷一']),
        question(4, '4.1', '保险中介人向客户介绍产品时，哪些做法符合客户为本原则？', '多选题', ['了解客户的需要和财务状况', '说明产品的主要风险和费用', '只推荐佣金最高的产品', '提供与客户情况相称的建议'], ['A', 'B', 'D'], '销售过程应充分了解客户需要、风险承受能力及支付能力，并提供合适、清晰的建议。', ['合规', '卷一']),
        question(5, '3.1.1', '人寿保险的保险利益通常须在何时存在？', '单选题', ['订立保单时', '每次缴费时', '理赔完成后', '保单失效后'], ['A'], '人寿保险的保险利益须在保单订立时存在。', ['高频考点', '卷一']),
        question(6, '5.1.1', '风险管理的首要步骤通常是什么？', '单选题', ['识别和分析风险', '立即购买最高保额的保单', '忽略低概率风险', '只记录已经发生的损失'], ['A'], '风险管理通常先识别、分析和评估风险，再决定处理方法。', ['风险管理', '卷一'])
      ],
      paperOneSyllabus: [
        chapter('1', '风险及保险', '12%', [
          topic('1.1.1', '风险的意义', [topic('1.1.1.1', '风险与损失', [topic('1.1.1.1.1', '损失发生的可能性'), topic('1.1.1.1.2', '损失的经济后果')]), topic('1.1.1.2', '风险的不确定性'), topic('1.1.1.3', '可保风险的基本条件', [topic('1.1.1.3.1', '损失可以用金钱衡量'), topic('1.1.1.3.2', '风险发生具有偶然性')])]),
          topic('1.1.2', '风险的类别', [topic('1.1.2.1', '纯粹风险与投机风险'), topic('1.1.2.2', '静态风险与动态风险')]),
          topic('1.1.3', '风险管理', [topic('1.1.3.1', '识别、分析及评估风险'), topic('1.1.3.2', '风险处理方法')]),
          topic('1.2', '保险功能及好处', [topic('1.2.1', '风险转移与分散'), topic('1.2.2', '经济保障及社会功能')])
        ]),
        chapter('2', '法律原则', '16%', [topic('2.1.1', '合约法：定义'), topic('2.1.2', '合约种类'), topic('2.1.3', '合约元素和要点'), topic('2.1.4', '合约的相对性'), topic('2.2.1', '代理法：定义'), topic('2.2.2', '代理关系如何产生'), topic('2.2.3', '代理人的权限'), topic('2.2.4', '代理人对委托人的责任'), topic('2.2.5', '委托人对代理人的责任'), topic('2.2.6', '终止代理')]),
        chapter('3', '保险原则', '30%', [topic('3.1.1', '可保权益'), topic('3.1.2', '可保权益的重要性'), topic('3.1.3', '可保权益的必要条件'), topic('3.1.4', '可保权益如何产生'), topic('3.1.5', '可保权益何时需要'), topic('3.1.6', '转让'), topic('3.2.1–3.2.2', '一般诚信及最高诚信'), topic('3.2.3', '重要事实'), topic('3.2.4', '何时披露重要事实'), topic('3.2.5', '违反最高诚信'), topic('3.2.6', '违反最高诚信的补救方法'), topic('3.3.1', '近因'), topic('3.3.2', '危险的种类'), topic('3.3.3', '近因原则的应用'), topic('3.3.4', '保单对原则的更改')]),
        chapter('4', '保险公司的主要功能', '9%', [topic('4.1', '产品的开发'), topic('4.2', '客户服务'), topic('4.3', '市场营销及促销'), topic('4.4', '保险的销售'), topic('4.5', '核保'), topic('4.6', '保单的处理'), topic('4.7', '理赔'), topic('4.8', '再保险'), topic('4.9', '精算支援'), topic('4.10', '会计及投资'), topic('4.11', '培训及发展'), topic('4.12', '管控要员')]),
        chapter('5', '香港保险业结构', '5%', [topic('5.1.1', '保险业务种类：法定分类'), topic('5.1.2', '保险业务种类：实务分类'), topic('5.1.3', '保险业务种类：学术分类'), topic('5.1.4', '再保险'), topic('5.2', '行业规模'), topic('5.3', '保险公司'), topic('5.4', '保险中介人'), topic('5.5.1', '香港保险业联会'), topic('5.5.2', '认可保险经纪团体')]),
        chapter('6', '保险业的规管架构', '21%', [topic('6.1.1', '《保险业条例》'), topic('6.1.2', '《承保商专业守则》'), topic('6.1.3', '保险投诉局'), topic('6.2.1', '监管保险中介人的持牌制度'), topic('6.2.2', '获授权保险人与其代理人的关系'), topic('6.2.3', '持牌保险中介人的多重角色'), topic('6.2.4', '发牌'), topic('6.2.5', '其他监管措施')]),
        chapter('7', '职业道德及其他有关问题', '7%', [topic('7.1', '保险中介人对保单持有人的责任'), topic('7.2', '保护个人资料'), topic('7.3', '平等机会事宜'), topic('7.4', '打击洗钱及恐怖分子资金筹集'), topic('7.5', '防止贪污'), topic('7.6', '防止保险诈骗')])
      ]
    }

    with_explanation_contents(data).deep_stringify_keys
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
        grouped[node.object_id][text] = content
      end
    end

    questions.each do |question|
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
    value.to_s.gsub(' ', '').scan(/\d+(?:\.\d+)+/)
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
