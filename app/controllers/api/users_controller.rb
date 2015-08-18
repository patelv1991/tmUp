class Api::UsersController < ApplicationController
  def show
    @users = User.where(email: params[:emails])
    if @users.length < 1
      render json: params[:emails], status: 422
    # elsif @users.length != params[:emails].length

      # TODO: if you want to show errors for both not finding users and also
      # users being in the workspace, then use following code. This will
      # require refactoring some code in team_members_form.js

    #   non_existant_emails = params[:emails]
    #   @users.each do |user|
    #     non_existant_emails = non_existant_emails - [user.email]
    #   end
    #   @users << {emails: non_existant_emails}
    #   render json: @users
    else
      render :show
    end

  end

end
