class CheckInSpot < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  # Associations
  has_many :route_check_in_spots, dependent: :destroy
  has_many :routes, through: :route_check_in_spots
  has_and_belongs_to_many :tags, join_table: :check_in_spots_tags

  # Validations
  validates :title, presence: true
  validates :subtitle, presence: true
  validates :description, presence: true
  validates :cover_image, presence: true

  # Scopes
  scope :published, -> { where.not(description: nil) }
end
