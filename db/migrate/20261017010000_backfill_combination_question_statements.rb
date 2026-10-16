class BackfillCombinationQuestionStatements < ActiveRecord::Migration[7.2]
  COMBINATION_IDS = [2, 3, 5, 13, 27, 28, 29, 37, 38, 39, 48, 49].freeze

  def up
    source_path = Rails.root.join('db', 'content_q1_q50_questions.json')
    source_questions = JSON.parse(File.read(source_path))
    source_titles = source_questions
      .select { |question| COMBINATION_IDS.include?(question['id'].to_i) }
      .to_h { |question| [question['id'].to_i, question['title']] }

    ContentSnapshot.find_each do |snapshot|
      data = snapshot.data.deep_dup
      changed = false

      Array(data['questions']).each do |question|
        question_id = question['id'].to_i
        next unless source_titles.key?(question_id)

        if question['title'] != source_titles[question_id]
          question['title'] = source_titles[question_id]
          changed = true
        end

        if question.delete('answerMode')
          changed = true
        end

        cleaned_tags = Array(question['tags']) - ['组合选项']
        if cleaned_tags != question['tags']
          question['tags'] = cleaned_tags
          changed = true
        end
      end

      snapshot.update_columns(data: data, updated_at: Time.current) if changed
    end
  end

  def down
    # The original records did not contain the missing statements, so there is
    # no safe reverse operation that would preserve later editorial changes.
  end
end
