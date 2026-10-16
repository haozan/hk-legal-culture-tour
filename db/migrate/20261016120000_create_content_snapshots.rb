class CreateContentSnapshots < ActiveRecord::Migration[7.2]
  def change
    create_table :content_snapshots do |t|
      t.string :paper_name, null: false
      t.jsonb :data, null: false, default: {}
      t.datetime :published_at
      t.timestamps
    end

    add_index :content_snapshots, :paper_name, unique: true
  end
end
