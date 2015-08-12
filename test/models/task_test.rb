# == Schema Information
#
# Table name: tasks
#
#  id             :integer          not null, primary key
#  parent_task_id :integer
#  due_date       :date
#  project_id     :integer
#  title          :string           not null
#  body           :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  creator_id     :integer          not null
#

require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
