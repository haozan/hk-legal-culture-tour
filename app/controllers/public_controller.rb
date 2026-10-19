class PublicController < ApplicationController
  layout "application"

  def privacy
    @full_render = true
  end

  def support
    @full_render = true
  end
end
