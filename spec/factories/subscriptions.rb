FactoryBot.define do
  factory :subscription do
    user
    price { 99.00 }
    expires_at { 90.days.from_now }
    status { "pending" }
    
    trait :active do
      status { "active" }
    end
    
    trait :expired do
      status { "expired" }
      expires_at { 1.day.ago }
    end
  end
end
