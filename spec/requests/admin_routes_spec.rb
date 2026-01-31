require 'rails_helper'

RSpec.describe "Admin::Routes", type: :request do
  before { admin_sign_in_as(create(:administrator)) }

  describe "GET /admin/routes" do
    it "returns http success" do
      get admin_routes_path
      expect(response).to be_success_with_view_check('index')
    end
  end

end
