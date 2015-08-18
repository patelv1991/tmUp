class Api::UsersController < ApplicationController
  def show
    @users = User.where(email: params[:emails])
    if @users.length < 1
      render json: ["No users found with that email"], status: 422
    else
      render :show
    end

  end

end
