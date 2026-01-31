class CreateSubscriptions < ActiveRecord::Migration[7.2]
  def change
    create_table :subscriptions do |t|
      t.datetime :expires_at
      t.string :status, default: "active"


      t.timestamps
    end
  end
end
