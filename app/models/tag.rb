class Tag < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  # Associations
  has_and_belongs_to_many :check_in_spots, join_table: :check_in_spots_tags
  has_and_belongs_to_many :routes, join_table: :routes_tags

  # Validations
  validates :name, presence: true, uniqueness: true
  validates :color, presence: true

  # Scopes
  scope :popular, -> { order(created_at: :desc) }
end
