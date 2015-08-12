# == Schema Information
#
# Table name: team_assignments
#
#  id         :integer          not null, primary key
#  project_id :integer          not null
#  member_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class TeamAssignment < ActiveRecord::Base
  validates :project, :member, presence: true
  validates :project_id, uniqueness: { scope: :member_id }

  belongs_to :project
  
  belongs_to(
    :member,
    class_name: "User",
    foreign_key: :member_id,
    primary_key: :id
  )

end
