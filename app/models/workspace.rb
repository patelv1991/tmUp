# == Schema Information
#
# Table name: workspaces
#
#  id         :integer          not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Workspace < ActiveRecord::Base
  attr_accessor :link
  validates :title, presence: true

  has_many :user_workspaces, dependent: :destroy
  has_many :users, through: :user_workspaces
  has_many :projects, dependent: :destroy
  has_many :tasks, through: :projects

  def is_member?(u)
    return true if u.id == self.user_id
    user_workspaces.where(user_id: u.id).exists?
  end

  def self.search(searchData, current_user)
    return {} if searchData == ""
    sd = searchData.downcase

    names = sd.split(" ")
    regexp = []
    names.each do |el|
      regexp << el
    end
    regexp = regexp.join("|")

    data =  User.includes(:associates,
                          :workspaces, :projects, :tasks).find(current_user)

    resultData = {}
    resultData['users'] = find_users(resultData, data, regexp)
    resultData['workspaces'] = find_workspaces(resultData, data, sd)
    resultData['projects'] = find_projects(resultData, data, sd)
    resultData['tasks'] = find_tasks(resultData, data, sd)
    resultData
  end

  def self.find_users(resultData, data, regexp)
    data.associates.where('fname ~* ? OR lname ~* ?',
                          "(#{regexp})", "(#{regexp})").uniq
  end

  def self.find_workspaces(resultData, data, sd)
    data.workspaces.where('LOWER(title) LIKE ?', "%#{sd}%").uniq
  end

  def self.find_projects(resultData, data, sd)
    data.projects.where('LOWER(projects.title) LIKE ? OR
                        LOWER(projects.description) LIKE ?',
                        "%#{sd}%", "%#{sd}%").uniq
  end

  def self.find_tasks(resultData, data, sd)
    data.tasks.where('LOWER(title) LIKE ?', "%#{sd}%").uniq
  end

end
