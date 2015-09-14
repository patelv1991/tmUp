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

    data =  User.includes(:workspaces, associates: :user_workspaces, projects: :tasks).find(current_user)

    resultData = {}
    resultData['users'] = find_users(data, regexp)
    resultData['workspaces'] = find_workspaces(data, sd)
    resultData['projects'] = find_projects(data, sd)
    resultData['tasks'] = find_tasks(data, sd)
    resultData
  end

  def self.find_users(data, regexp)
    users = data.associates.where('fname ~* ? OR lname ~* ?',
                                  "(#{regexp})", "(#{regexp})").uniq
    workspaces = data.workspaces.pluck(:id)
    users.each_with_index do |user, idx|
      workspace_id = user.user_workspaces.first.workspace_id
      user.link = "workspaces/#{workspace_id}/user/#{user.id}"
    end
  end

  def self.find_workspaces(data, sd)
    workspaces = data.workspaces.where('LOWER(title) LIKE ?', "%#{sd}%").uniq
    workspaces.each do |workspace|
      workspace.link = "workspaces/#{workspace.id}"
    end
  end

  def self.find_projects(data, sd)
    projects = data.projects.where('LOWER(projects.title) LIKE ? OR
                                   LOWER(projects.description) LIKE ?',
                                   "%#{sd}%", "%#{sd}%").uniq
    projects.each do |project|
      project.link = "workspaces/#{project.workspace_id}/project/#{project.id}"
    end
  end

  def self.find_tasks(data, sd)
    tasks = []
    data.projects.each do |project|
      t = project.tasks.where('LOWER(title) LIKE ?', "%#{sd}%").uniq
      tasks += t unless t.empty?
    end

    tasks.each do |task|
      project_id = task.project_id
      workspace_id = data.projects.where(id: project_id)[0].workspace_id
      task.link = "workspaces/#{workspace_id}/project/#{project_id}"
    end
  end

end
