require 'rails_helper'

RSpec.describe "Admin::CheckInSpots", type: :request do
  before { admin_sign_in_as(create(:administrator)) }

  describe "GET /admin/check_in_spots" do
    it "returns http success" do
      get admin_check_in_spots_path
      expect(response).to be_success_with_view_check('index')
    end
  end

end
