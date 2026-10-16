class MarkCombinationQuestionsAsMultiple < ActiveRecord::Migration[7.2]
  def up
    ContentSnapshot.find_each do |snapshot|
      data = snapshot.data
      questions = data.is_a?(Hash) ? data['questions'] : nil
      next unless questions.is_a?(Array)

      changed = false
      normalized_questions = questions.map do |question|
        tags = question['tags'] || []
        combination = tags.include?('组合选项') || question['answerMode'] == '组合选项'
        next question unless combination

        normalized = question.merge('type' => '多选题', 'answerMode' => '组合选项')
        changed ||= normalized != question
        normalized
      end
      next unless changed

      snapshot.update!(data: data.merge('questions' => normalized_questions), published_at: nil)
    end
  end

  def down
    # Content classification is intentionally not reverted with a schema rollback.
  end
end
