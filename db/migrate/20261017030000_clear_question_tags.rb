class ClearQuestionTags < ActiveRecord::Migration[7.2]
  def up
    ContentSnapshot.find_each do |snapshot|
      data = snapshot.data.deep_dup
      Array(data['questions']).each { |question| question['tags'] = [] }
      snapshot.update_columns(data: data, updated_at: Time.current)
    end
  end

  def down
    # Tags are intentionally no longer part of the authoring model.
  end
end
