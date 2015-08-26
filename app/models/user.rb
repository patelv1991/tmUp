# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  fname           :string           not null
#  lname           :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :fname, :lname, :email, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :email, :session_token, uniqueness: true

  attr_reader :password
  after_initialize :ensure_session_token

  has_many :user_workspaces, dependent: :destroy

  has_many :projects, through: :workspaces, source: :projects
  has_many :workspaces, through: :user_workspaces, dependent: :destroy

  has_many(
    :team_assignments,
    class_name: "TeamAssignment",
    foreign_key: :member_id,
    primary_key: :id
  )

  has_many(
    :tasks,
    class_name: "Task",
    foreign_key: :assignee_id,
    primary_key: :id
  )

  def gravatar_url
    "http://www.gravatar.com/avatar/#{ Digest::MD5.hexdigest(email) }"
  end

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    user.try(:is_password?, user_params[:password]) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  protected

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
