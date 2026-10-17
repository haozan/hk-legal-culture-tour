class ImportQuestionBankQ2Zp5SixHundredEightyTwo < ActiveRecord::Migration[7.2]
  def up
    ContentSnapshot.reset_column_information
    paper_name = ContentSnapshot::PAPER_TWO_NAME
    snapshot = ContentSnapshot.find_by(paper_name: paper_name) || ContentSnapshot.new(paper_name: paper_name)
    existing = snapshot.data.deep_dup if snapshot.data.present?

    # Keep the maintained outline and weights, then rebuild all question links
    # from the authoritative 682-question source file.
    clear_contents(existing) if existing
    snapshot.data = ContentSnapshot.merge_question_bank_data(existing, paper_name)
    snapshot.paper_name = paper_name
    snapshot.published_at = nil
    snapshot.save!
  end

  def down
    # Keep the imported paper when rolling back application code.
  end

  private

  def clear_contents(value)
    return unless value.is_a?(Hash)

    syllabus = value['paperOneSyllabus']
    clear_nodes(syllabus) if syllabus.is_a?(Array)
  end

  def clear_nodes(nodes)
    nodes.each do |node|
      node['contents'] = [] if node.is_a?(Hash)
      children = node['children'] || node['topics']
      clear_nodes(children) if children.is_a?(Array)
    end
  end
end
