require 'rails_helper'

RSpec.describe "Subscriptions", type: :request do

  # Uncomment this if controller need authentication
  # let(:user) { last_or_create(:user) }
  # before { sign_in_as(user) }

  describe "GET /subscriptions/new" do
    it "returns http success" do
      get new_subscription_path
      expect(response).to be_success_with_view_check('new')
    end
  end

  describe "POST /subscriptions" do
    it "creates a new subscription" do
      post subscriptions_path, params: { subscription: attributes_for(:subscription) }
      expect(response).to be_success_with_view_check
    end
  end
end
