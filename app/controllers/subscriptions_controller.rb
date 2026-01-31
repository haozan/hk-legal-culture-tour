class SubscriptionsController < ApplicationController
  before_action :authenticate_user!
  
  SUBSCRIPTION_PRICE = 99.00 # USD

  def new
    # Check if user already has active subscription
    if current_user.has_active_subscription?
      redirect_to root_path, notice: '您已有有效订阅'
      return
    end
    
    @price = SUBSCRIPTION_PRICE
  end

  def create
    # Check if user already has active subscription
    if current_user.has_active_subscription?
      redirect_to root_path, alert: '您已有有效订阅'
      return
    end
    
    # Create subscription with pending status
    @subscription = current_user.subscriptions.create!(
      price: SUBSCRIPTION_PRICE,
      status: 'pending',
      expires_at: 90.days.from_now
    )

    # Create payment record
    @payment = @subscription.create_payment!(
      amount: SUBSCRIPTION_PRICE,
      currency: 'usd',
      status: 'pending',
      customer_email: current_user.email
    )

    # Redirect to Stripe checkout
    redirect_to pay_payment_path(@payment), data: { turbo_method: :post }, allow_other_host: false
  rescue ActiveRecord::RecordInvalid => e
    flash[:error] = e.message
    redirect_to new_subscription_path
  end
end
