class ImportQuestionBankQ5InvestmentLinked < ActiveRecord::Migration[7.2]
  def up
    paper_name = ContentSnapshot::PAPER_FIVE_NAME
    data = ContentSnapshot.default_data_for(paper_name)
    return if data.blank?

    snapshot = ContentSnapshot.find_or_initialize_by(paper_name: paper_name)
    snapshot.data = ContentSnapshot.traditionalize_data(data)
    snapshot.published_at = nil
    snapshot.save!
  end

  def down
    ContentSnapshot.where(paper_name: ContentSnapshot::PAPER_FIVE_NAME).delete_all
  end
end
