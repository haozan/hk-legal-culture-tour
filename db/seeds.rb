# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# IMPORTANT: Do NOT add Administrator data here!
# Administrator accounts should be created manually by user.
# This seeds file is only for application data (products, categories, etc.)
#
require 'open-uri'

# Clear existing data
puts "Clearing existing data..."
RouteCheckInSpot.destroy_all
CheckInSpot.destroy_all
Route.destroy_all
Tag.destroy_all
Subscription.destroy_all
User.destroy_all

puts "Creating tags..."
legal = Tag.create!(name: "Legal Professional", color: "#1e40af", slug: "legal")
culture = Tag.create!(name: "Culture Experience", color: "#be123c", slug: "culture")
architecture = Tag.create!(name: "Architecture", color: "#7c2d12", slug: "architecture")
history = Tag.create!(name: "History", color: "#4c1d95", slug: "history")
entertainment = Tag.create!(name: "Entertainment", color: "#15803d", slug: "entertainment")
food = Tag.create!(name: "Food", color: "#c2410c", slug: "food")

puts "Creating check-in spots..."

spot1 = CheckInSpot.create!(
  title: "Hong Kong Court of Final Appeal",
  subtitle: "Experience the highest authority of common law system",
  description: "The Court of Final Appeal is the highest court of Hong Kong, located at 8 Jackson Road, Central. Built in 1912 in neoclassical style, it serves as the core of Hong Kong's judicial system, hearing cases of great legal significance each year.",
  cover_image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800",
  address: "8 Jackson Road, Central, Hong Kong",
  tips: "Visit on weekdays 9:30-12:30, 2:00-5:00. Court observation requires advance booking. No large luggage, proper dress code required."
)
spot1.tags << [legal, architecture, history]

spot2 = CheckInSpot.create!(
  title: "Legislative Council Complex",
  subtitle: "Witness Hong Kong's democratic system",
  description: "The Legislative Council Complex is located at 1 Tim Mei Avenue, Central. It features modern design and houses the meeting chamber where Hong Kong's laws are made.",
  cover_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
  address: "1 Tim Mei Avenue, Central, Hong Kong",
  tips: "Tours available with advance booking (minimum 2 weeks). Bring valid ID. Meetings usually on Wednesday 11:00 AM."
)
spot2.tags << [legal, architecture]

spot3 = CheckInSpot.create!(
  title: "Department of Justice",
  subtitle: "Core institution of Hong Kong legal affairs",
  description: "The Department of Justice serves as the legal advisor to the Hong Kong SAR Government, responsible for criminal prosecutions and representing the government in civil litigation.",
  cover_image: "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=800",
  address: "66 Queensway, Hong Kong",
  tips: "Not open for public tours. External architecture can be photographed. Public legal seminars held annually."
)
spot3.tags << [legal]

spot4 = CheckInSpot.create!(
  title: "Central Legal District",
  subtitle: "Epicenter of Hong Kong's legal culture",
  description: "Central is Hong Kong's legal hub, home to numerous law firms and barristers' chambers. The area exudes a strong legal culture with lawyers in robes often seen on the streets.",
  cover_image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
  address: "Pottinger Street & Wyndham Street, Central",
  tips: "Best visited on weekdays. Recommended route: Central Station → Pottinger Street → Wyndham Street. Lunch time for spotting lawyers."
)
spot4.tags << [legal, culture]

spot5 = CheckInSpot.create!(
  title: "HKU Faculty of Law",
  subtitle: "Cradle of legal talent",
  description: "Founded in 1969, HKU Faculty of Law is Hong Kong's oldest law school. The campus blends Eastern and Western architectural elements and has trained numerous legal professionals.",
  cover_image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
  address: "Pokfulam Road, HKU Centennial Campus",
  tips: "Library open to public with registration. Campus allows free photography. Law lectures occasionally open to public."
)
spot5.tags << [legal, culture, history]

spot6 = CheckInSpot.create!(
  title: "Victoria Harbour",
  subtitle: "Hong Kong's iconic landmark",
  description: "Victoria Harbour is Hong Kong's signature landscape, located between Hong Kong Island and Kowloon Peninsula. The Symphony of Lights show runs nightly at 8 PM.",
  cover_image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800",
  address: "Between Hong Kong Island and Kowloon",
  tips: "Best views from Tsim Sha Tsui Promenade, Central Pier, or Victoria Peak. Visit at sunset or 8 PM for light show."
)
spot6.tags << [culture, entertainment]

spot7 = CheckInSpot.create!(
  title: "Victoria Peak",
  subtitle: "Panoramic view of Hong Kong",
  description: "Victoria Peak is Hong Kong's highest point at 554 meters. The Peak Tram is one of Hong Kong's oldest transportation methods and an experience in itself.",
  cover_image: "https://images.unsplash.com/photo-1517816428104-797678c7cf0c?w=800",
  address: "Victoria Peak, Hong Kong Island",
  tips: "Take Peak Tram from Central. Book online to skip queues. Evening visits offer both sunset and night views. Bring a jacket."
)
spot7.tags << [culture, entertainment]

spot8 = CheckInSpot.create!(
  title: "Lan Kwai Fong",
  subtitle: "Hong Kong nightlife landmark",
  description: "Lan Kwai Fong is Hong Kong's famous nightlife district with over 90 bars and restaurants. A hub of international culture and featured in many Hong Kong films.",
  cover_image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
  address: "Between Wyndham Street and D'Aguilar Street, Central",
  tips: "Busiest after 8 PM, especially Friday and Saturday. High prices, budget accordingly. Stay safe and don't drink and drive."
)
spot8.tags << [entertainment, culture]

spot9 = CheckInSpot.create!(
  title: "West Kowloon Cultural District",
  subtitle: "New landmark of art and culture",
  description: "West Kowloon Cultural District is Hong Kong's largest cultural project, featuring M+ Museum and Hong Kong Palace Museum.",
  cover_image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800",
  address: "West Kowloon, Hong Kong",
  tips: "M+ Museum free on Wednesdays. Palace Museum requires booking. MTR Kowloon Station Exit E4/E5."
)
spot9.tags << [culture, architecture]

spot10 = CheckInSpot.create!(
  title: "Temple Street Night Market",
  subtitle: "Experience authentic Hong Kong street life",
  description: "Temple Street Night Market is one of Hong Kong's most famous night markets, operating from evening to late night with various street food, souvenirs, and fortune tellers.",
  cover_image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
  address: "Temple Street, Yau Ma Tei, Kowloon",
  tips: "Opens around 6 PM, busiest 9-10 PM. Must-try: clay pot rice, cart noodles, fish balls. Remember to bargain."
)
spot10.tags << [culture, food, entertainment]

puts "Creating routes..."

route1 = Route.create!(
  title: "Legal Professional Day Tour",
  description: "In-depth visit to Hong Kong's core legal institutions, from the Court of Final Appeal to Legislative Council. Suitable for legal professionals and law students interested in Hong Kong's legal system.",
  slug: "legal-professional-tour"
)
route1.tags << [legal, culture]
RouteCheckInSpot.create!(route: route1, check_in_spot: spot1, position: 1)
RouteCheckInSpot.create!(route: route1, check_in_spot: spot2, position: 2)
RouteCheckInSpot.create!(route: route1, check_in_spot: spot3, position: 3)
RouteCheckInSpot.create!(route: route1, check_in_spot: spot4, position: 4)

route2 = Route.create!(
  title: "Culture & Entertainment Tour",
  description: "Combining cultural landmarks and entertainment venues, visit cultural sites during the day and experience Hong Kong nightlife in the evening.",
  slug: "culture-entertainment-tour"
)
route2.tags << [culture, entertainment]
RouteCheckInSpot.create!(route: route2, check_in_spot: spot6, position: 1)
RouteCheckInSpot.create!(route: route2, check_in_spot: spot7, position: 2)
RouteCheckInSpot.create!(route: route2, check_in_spot: spot9, position: 3)
RouteCheckInSpot.create!(route: route2, check_in_spot: spot8, position: 4)

route3 = Route.create!(
  title: "Heritage & Law Exploration",
  description: "From legal education to practice, from historic buildings to modern facilities, this route connects Hong Kong's legal culture past, present, and future.",
  slug: "heritage-law-exploration"
)
route3.tags << [legal, history, culture]
RouteCheckInSpot.create!(route: route3, check_in_spot: spot5, position: 1)
RouteCheckInSpot.create!(route: route3, check_in_spot: spot4, position: 2)
RouteCheckInSpot.create!(route: route3, check_in_spot: spot1, position: 3)

route4 = Route.create!(
  title: "Weekend Leisure Tour",
  description: "Relaxed weekend itinerary combining cultural experience and food exploration. Visit West Kowloon art venues during the day and enjoy Temple Street night market in the evening.",
  slug: "weekend-leisure-tour"
)
route4.tags << [culture, food, entertainment]
RouteCheckInSpot.create!(route: route4, check_in_spot: spot9, position: 1)
RouteCheckInSpot.create!(route: route4, check_in_spot: spot10, position: 2)
RouteCheckInSpot.create!(route: route4, check_in_spot: spot6, position: 3)

puts "Creating sample users and subscriptions..."
# Create test user with active subscription
user_with_sub = User.create!(
  name: "Test User",
  email: "test@example.com",
  password: "password",
  password_confirmation: "password",
  verified: true
)

user_with_sub.subscriptions.create!(
  price: 99.00,
  expires_at: 90.days.from_now,
  status: 'active'
)

# Create test user without subscription
User.create!(
  name: "Free User",
  email: "free@example.com",
  password: "password",
  password_confirmation: "password",
  verified: true
)

puts "Seed data created successfully!"
puts "  - #{Tag.count} tags"
puts "  - #{CheckInSpot.count} check-in spots"
puts "  - #{Route.count} routes"
puts "  - #{User.count} users"
puts "  - #{Subscription.count} subscriptions"
puts ""
puts "Test accounts:"
puts "  - test@example.com / password (with active subscription)"
puts "  - free@example.com / password (no subscription)"
