class NormalizeQuestionBankChapterNames < ActiveRecord::Migration[7.2]
  def up
    snapshot = ContentSnapshot.find_by(paper_name: ContentSnapshot::PAPER_NAME)
    return unless snapshot

    data = snapshot.data.deep_dup
    data['chapterNames'] = ContentSnapshot::PAPER_NAMES
    snapshot.update!(data: data)
  end

  def down
    # The canonical five-paper order is retained on rollback.
  end
end
