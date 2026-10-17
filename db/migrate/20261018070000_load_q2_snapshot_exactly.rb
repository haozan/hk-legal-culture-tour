class LoadQ2SnapshotExactly < ActiveRecord::Migration[7.2]
  def up
    ContentSnapshot.reset_column_information
    paper_name = ContentSnapshot::PAPER_TWO_NAME
    source = ContentSnapshot.default_data_for(paper_name)
    raise "Missing paper two question bank source" unless source

    snapshot = ContentSnapshot.find_by(paper_name: paper_name) || ContentSnapshot.new(paper_name: paper_name)
    snapshot.data = ContentSnapshot.traditionalize_data(source.deep_stringify_keys)
    snapshot.paper_name = paper_name
    snapshot.published_at = nil
    snapshot.save!
  end

  def down
    # Keep the finalized question bank when rolling back application code.
  end
end
