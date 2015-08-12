# == Schema Information
#
# Table name: tasks
#
#  id             :integer          not null, primary key
#  creator_id     :integer          not null
#  parent_task_id :integer
#  due_date       :date
#  project_id     :integer
#  title          :string           not null
#  body           :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Task < ActiveRecord::Base
  validates :title, :creator_id, presence: true

  belongs_to :project
  belongs_to :user

  has_many(
    :sub_tasks,
    class_name: "Task",
    foreign_key: :parent_task_id,
    primary_key: :id
  )

  belongs_to(
    :parent_task,
    class_name: "Task",
    foreign_key: :parent_task_id,
    primary_key: :id
  )

  def self.all_parent_tasks
    Task.all.where(parent_task_id: nil)
  end

  # def self.all_sub_tasks
  #   Task.all.where()
end
