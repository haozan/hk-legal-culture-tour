class Admin::CheckInSpotsController < Admin::BaseController
  before_action :set_check_in_spot, only: [:show, :edit, :update, :destroy]

  def index
    @check_in_spots = CheckInSpot.page(params[:page]).per(10)
  end

  def show
  end

  def new
    @check_in_spot = CheckInSpot.new
  end

  def create
    @check_in_spot = CheckInSpot.new(check_in_spot_params)

    if @check_in_spot.save
      redirect_to admin_check_in_spot_path(@check_in_spot), notice: 'Check in spot was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @check_in_spot.update(check_in_spot_params)
      redirect_to admin_check_in_spot_path(@check_in_spot), notice: 'Check in spot was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @check_in_spot.destroy
    redirect_to admin_check_in_spots_path, notice: 'Check in spot was successfully deleted.'
  end

  private

  def set_check_in_spot
    @check_in_spot = CheckInSpot.find(params[:id])
  end

  def check_in_spot_params
    params.require(:check_in_spot).permit(:title, :subtitle, :description, :cover_image, :address, :tips, :slug)
  end
end
