class CreateRoutesTags < ActiveRecord::Migration[7.2]
  def change
    create_table :routes_tags do |t|
      t.references :route
      t.references :tag

      t.timestamps
    end
  end
end
