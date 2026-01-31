class CheckInSpotsController < ApplicationController

  def index
    @check_in_spots = CheckInSpot.published.includes(:tags).order(created_at: :desc)

    # Filter by tag if provided
    if params[:tag].present?
      @tag = Tag.friendly.find(params[:tag])
      @check_in_spots = @check_in_spots.joins(:tags).where(tags: { id: @tag.id })
    end

    @tags = Tag.all
  end

  def show
    @check_in_spot = CheckInSpot.friendly.find(params[:id])
    @related_routes = @check_in_spot.routes.published.limit(3)
  end

  private
  # Write your private methods here
end
