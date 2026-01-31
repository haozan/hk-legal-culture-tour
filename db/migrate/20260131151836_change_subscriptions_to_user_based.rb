class ChangeSubscriptionsToUserBased < ActiveRecord::Migration[7.2]
  def change
    # Delete existing subscriptions as they don't have user associations
    reversible do |dir|
      dir.up do
        execute "DELETE FROM subscriptions"
      end
    end
    
    add_reference :subscriptions, :user, null: false, foreign_key: true
    remove_column :subscriptions, :customer_name, :string
    remove_column :subscriptions, :customer_email, :string
  end
end
