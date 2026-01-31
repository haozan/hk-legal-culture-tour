class RoutesController < ApplicationController

  def index
    @routes = Route.published.includes(:tags).order(created_at: :desc)

    # Filter by tag if provided
    if params[:tag].present?
      @tag = Tag.friendly.find(params[:tag])
      @routes = @routes.joins(:tags).where(tags: { id: @tag.id })
    end

    @tags = Tag.all
  end

  def show
    @route = Route.friendly.find(params[:id])
    @route_spots = @route.route_check_in_spots.includes(:check_in_spot).order(position: :asc)
  end

  private
  # Write your private methods here
end
