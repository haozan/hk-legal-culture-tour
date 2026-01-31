class CreateCheckInSpots < ActiveRecord::Migration[7.2]
  def change
    create_table :check_in_spots do |t|
      t.string :title
      t.string :subtitle
      t.text :description
      t.string :cover_image
      t.string :address
      t.text :tips
      t.string :slug

      t.index :slug, unique: true

      t.timestamps
    end
  end
end
