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
  validates :title, :workspace, presence: true
  validates :title, uniqueness: { scope: :workspace_id }

  belongs_to :workspace

  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :owner_id,
    primary_key: :id
  )

  # has_many(
  #   :team_members
  # )
end
