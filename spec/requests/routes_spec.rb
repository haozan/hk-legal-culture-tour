require 'rails_helper'

RSpec.describe "Routes", type: :request do

  # Uncomment this if controller need authentication
  # let(:user) { last_or_create(:user) }
  # before { sign_in_as(user) }

  describe "GET /routes" do
    it "returns http success" do
      get routes_path
      expect(response).to be_success_with_view_check('index')
    end
  end

  describe "GET /routes/:id" do
    let(:route_record) { create(:route) }

    it "returns http success" do
      get route_path(route_record)
      expect(response).to be_success_with_view_check('show')
    end
  end
end
