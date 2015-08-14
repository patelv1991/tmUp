class StaticPagesController < ApplicationController
  before_action :require_signed_in!

  def root
    # active_workspace = current_user.workspaces.select { |ws| ws.active == true }.first
    # redirect_to "/api/workspaces/#{active_workspace.id}"
  end
end
