class Api::WorkspaceMembershipController < ApplicationController
  before_action :require_signed_in!

  
  private
    def workspace_membership_params
      params.require(:workspace_membership).permit(:user_id, :workspace_id)
    end

end
