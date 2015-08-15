class Api::ApiController < ApplicationController
  before_action :require_signed_in!

  def require_workspace_membership!
    render json: ["You must be a member to do that"], status: :unauthorized
    # redirect_to new_session_url unless current_workspace.is_member?(current_user)
  end

  def require_signed_in!
    unless signed_in?
      render json: ["You must be signed in to perform that action!"], status: :unauthorized
    end
  end
end
