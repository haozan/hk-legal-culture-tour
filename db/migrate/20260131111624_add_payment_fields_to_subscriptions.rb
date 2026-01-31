class AddPaymentFieldsToSubscriptions < ActiveRecord::Migration[7.2]
  def change
    add_column :subscriptions, :customer_name, :string
    add_column :subscriptions, :customer_email, :string
    add_column :subscriptions, :price, :decimal

  end
end
