module ApplicationHelper
  # Check if current user has access to premium content
  def has_active_subscription?
    return false unless current_user.present?
    
    current_user.has_active_subscription?
  end

  # Get current user's active subscription
  def current_subscription
    return nil unless current_user.present?
    
    @current_subscription ||= current_user.active_subscription
  end
end
