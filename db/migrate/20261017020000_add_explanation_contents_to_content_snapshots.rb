class AddExplanationContentsToContentSnapshots < ActiveRecord::Migration[7.2]
  def up
    ContentSnapshot.reset_column_information

    ContentSnapshot.find_each do |snapshot|
      data = snapshot.data.presence || ContentSnapshot.default_data
      updated = ContentSnapshot.with_explanation_contents(data)
      updated['version'] = 'draft-2026.10.17-outline-content'
      snapshot.update_columns(data: updated, updated_at: Time.current)
    end
  end

  def down
    ContentSnapshot.find_each do |snapshot|
      data = snapshot.data.deep_dup
      remove_contents(data)
      snapshot.update_columns(data: data, updated_at: Time.current)
    end
  end

  private

  def remove_contents(value)
    case value
    when Hash
      value.delete('contents')
      value.delete(:contents)
      value.each_value { |child| remove_contents(child) }
    when Array
      value.each { |child| remove_contents(child) }
    end
  end
end
