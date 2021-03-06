# == Schema Information
#
# Table name: projects
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  description  :string
#  workspace_id :integer          not null
#  owner_id     :integer
#  due_date     :date
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Project < ActiveRecord::Base
  attr_accessor :link
  validates :title, :workspace, presence: true
  validates :title, uniqueness: { scope: :workspace_id }

  has_many :team_assignments
  has_many :team_members, through: :team_assignments, source: :member
  has_many :tasks, dependent: :destroy

  belongs_to :workspace
  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :owner_id,
    primary_key: :id
  )

end
