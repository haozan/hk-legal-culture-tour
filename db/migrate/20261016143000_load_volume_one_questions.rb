class LoadVolumeOneQuestions < ActiveRecord::Migration[7.2]
  def up
    path = Rails.root.join('db', 'content_q1_q50_questions.json')
    return unless File.exist?(path)

    snapshot = ContentSnapshot.find_by(paper_name: ContentSnapshot::PAPER_NAME)
    return unless snapshot

    existing_questions = snapshot.data.is_a?(Hash) ? snapshot.data['questions'] : nil
    return unless existing_questions.is_a?(Array) && existing_questions.length <= 6

    payload = JSON.parse(File.read(path))
    data = snapshot.data.deep_dup
    data['questions'] = payload
    snapshot.update!(data: data, published_at: nil)
  end

  def down
    # The imported question bank is content, not schema; it is intentionally retained on rollback.
  end
end
