class CreateRoutes < ActiveRecord::Migration[7.2]
  def change
    create_table :routes do |t|
      t.string :title
      t.text :description
      t.string :slug

      t.index :slug, unique: true

      t.timestamps
    end
  end
end
