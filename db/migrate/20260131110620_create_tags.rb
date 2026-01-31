class CreateTags < ActiveRecord::Migration[7.2]
  def change
    create_table :tags do |t|
      t.string :name
      t.string :color, default: "#3B82F6"
      t.string :slug

      t.index :slug, unique: true

      t.timestamps
    end
  end
end
