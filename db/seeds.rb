# 港险小象的应用数据种子。
# 管理员账户不在种子中创建，首次部署后请通过管理员初始化流程设置。

puts 'Preparing 港险小象 content data...'

# Remove the retired tourism content while preserving administrator accounts and user identities.
RouteCheckInSpot.delete_all
CheckInSpot.delete_all
Route.delete_all
Tag.delete_all
ContentSnapshot.delete_all

ContentSnapshot.create!(
  paper_name: ContentSnapshot::PAPER_NAME,
  data: ContentSnapshot.default_data
)

puts "Created #{ContentSnapshot::PAPER_NAME} with #{ContentSnapshot.default_data['questions'].length} sample questions and #{ContentSnapshot.default_data['paperOneSyllabus'].length} chapters."
