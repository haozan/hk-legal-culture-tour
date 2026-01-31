class Route < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  # Associations
  has_many :route_check_in_spots, -> { order(position: :asc) }, dependent: :destroy
  has_many :check_in_spots, through: :route_check_in_spots
  has_and_belongs_to_many :tags, join_table: :routes_tags

  # Validations
  validates :title, presence: true
  validates :description, presence: true

  # Scopes
  scope :published, -> { where.not(description: nil) }
end
