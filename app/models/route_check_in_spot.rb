class RouteCheckInSpot < ApplicationRecord
  belongs_to :route
  belongs_to :check_in_spot

  validates :position, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
end
