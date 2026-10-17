class NormalizePaperOrder < ActiveRecord::Migration[7.2]
  def up
    snapshot = ContentSnapshot.find_by(paper_name: ContentSnapshot::PAPER_NAME) || ContentSnapshot.find_by(paper_name: '保险原理及实务')
    return unless snapshot

    data = snapshot.data.deep_dup
    data['chapterNames'] = ContentSnapshot::PAPER_NAMES
    snapshot.update!(data: data, paper_name: ContentSnapshot::PAPER_NAME)
  end

  def down
    # Keep the normalized paper order when rolling back application code.
  end
end
