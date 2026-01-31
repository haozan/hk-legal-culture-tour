class CreateRouteCheckInSpots < ActiveRecord::Migration[7.2]
  def change
    create_table :route_check_in_spots do |t|
      t.references :route
      t.references :check_in_spot
      t.integer :position

      t.timestamps
    end
  end
end
