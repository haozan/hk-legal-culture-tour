class ImportQuestionBankQ2GeneralInsurance < ActiveRecord::Migration[7.2]
  def up
    ContentSnapshot.reset_column_information
    paper_name = ContentSnapshot::PAPER_TWO_NAME
    snapshot = ContentSnapshot.find_by(paper_name: paper_name) || ContentSnapshot.new(paper_name: paper_name)
    snapshot.data = ContentSnapshot.merge_question_bank_data(snapshot.data, paper_name)
    snapshot.paper_name = paper_name
    snapshot.published_at = nil
    snapshot.save!
  end

  def down
    # Keep the imported paper when rolling back application code.
  end
end
