class CreateCheckInSpotsTags < ActiveRecord::Migration[7.2]
  def change
    create_table :check_in_spots_tags do |t|
      t.references :check_in_spot
      t.references :tag

      t.timestamps
    end
  end
end
