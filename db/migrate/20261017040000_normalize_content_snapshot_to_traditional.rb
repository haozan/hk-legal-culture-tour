class NormalizeContentSnapshotToTraditional < ActiveRecord::Migration[7.2]
  def up
    ContentSnapshot.reset_column_information

    ContentSnapshot.find_each do |snapshot|
      data = JSON.parse(ContentSnapshot.traditionalize_data(snapshot.data.to_json))
      paper_name = snapshot.paper_name == '保险原理及实务' ? ContentSnapshot::PAPER_NAME : snapshot.paper_name
      snapshot.update_columns(data: data, paper_name: paper_name, updated_at: Time.current)
    end
  end

  def down
    # Traditionalized content is safe to keep when rolling back application code.
  end
end
