require 'rails_helper'

RSpec.describe "Check in spots", type: :request do

  # Uncomment this if controller need authentication
  # let(:user) { last_or_create(:user) }
  # before { sign_in_as(user) }

  describe "GET /check_in_spots" do
    it "returns http success" do
      get check_in_spots_path
      expect(response).to be_success_with_view_check('index')
    end
  end

  describe "GET /check_in_spots/:id" do
    let(:check_in_spot_record) { create(:check_in_spot) }

    it "returns http success" do
      get check_in_spot_path(check_in_spot_record)
      expect(response).to be_success_with_view_check('show')
    end
  end
end
