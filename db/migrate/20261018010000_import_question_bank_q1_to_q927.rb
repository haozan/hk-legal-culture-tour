class ImportQuestionBankQ1ToQ927 < ActiveRecord::Migration[7.2]
  def up
    ContentSnapshot.reset_column_information
    snapshot = ContentSnapshot.find_by(paper_name: ContentSnapshot::PAPER_NAME) || ContentSnapshot.find_by(paper_name: '保险原理及实务')
    snapshot ||= ContentSnapshot.new(paper_name: ContentSnapshot::PAPER_NAME)
    snapshot.data = ContentSnapshot.merge_question_bank_data(snapshot.data)
    snapshot.paper_name = ContentSnapshot::PAPER_NAME
    snapshot.published_at = nil
    snapshot.save!
  end

  def down
    # Keep the expanded question bank when rolling back application code.
  end
end
