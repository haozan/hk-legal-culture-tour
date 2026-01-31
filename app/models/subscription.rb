class Subscription < ApplicationRecord
  # Associations
  belongs_to :user
  has_one :payment, as: :payable, dependent: :destroy

  # Validations
  validates :expires_at, presence: true
  validates :status, presence: true, inclusion: { in: %w[pending active expired cancelled] }
  validates :user, presence: true

  # Scopes
  scope :pending, -> { where(status: 'pending') }
  scope :active, -> { where(status: 'active').where('expires_at > ?', Time.current) }
  scope :expired, -> { where('expires_at <= ?', Time.current).or(where(status: 'expired')) }

  # Methods
  def active?
    status == 'active' && expires_at > Time.current
  end

  def expired?
    !active?
  end

  # REQUIRED: Payment integration methods
  # These methods are required by the Payment model
  def customer_name
    user.email.split('@').first.titleize
  end

  def customer_email
    user.email
  end

  def payment_description
    "90-Day Hong Kong Legal Culture Guide Subscription"
  end

  def stripe_mode
    'payment'  # One-time payment (not recurring subscription)
  end

  def stripe_line_items
    [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: '香港法律文化之旅 - 90天导览订阅',
            description: '解锁全部打卡地的详细导览内容，90天内无限次查看景点介绍、参观攻略、拍照指南等专业内容'
          },
          unit_amount: (price * 100).to_i  # dollars to cents
        },
        quantity: 1
      }
    ]
  end
end
