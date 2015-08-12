# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150812173457) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "projects", force: :cascade do |t|
    t.string   "title",        null: false
    t.string   "description"
    t.integer  "workspace_id", null: false
    t.integer  "owner_id"
    t.date     "due_date"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "projects", ["owner_id"], name: "index_projects_on_owner_id", using: :btree
  add_index "projects", ["title", "workspace_id"], name: "index_projects_on_title_and_workspace_id", unique: true, using: :btree

  create_table "tasks", force: :cascade do |t|
    t.integer  "parent_task_id"
    t.date     "due_date"
    t.integer  "project_id"
    t.string   "title",                          null: false
    t.text     "body"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "creator_id",                     null: false
    t.integer  "assignee_id"
    t.integer  "assignor_id"
    t.boolean  "completed",      default: false
  end

  add_index "tasks", ["creator_id"], name: "index_tasks_on_creator_id", using: :btree
  add_index "tasks", ["due_date"], name: "index_tasks_on_due_date", using: :btree
  add_index "tasks", ["id", "assignor_id", "assignee_id"], name: "my_task_assignment", unique: true, using: :btree
  add_index "tasks", ["parent_task_id"], name: "index_tasks_on_parent_task_id", using: :btree
  add_index "tasks", ["project_id"], name: "index_tasks_on_project_id", using: :btree
  add_index "tasks", ["title"], name: "index_tasks_on_title", using: :btree

  create_table "team_assignments", force: :cascade do |t|
    t.integer  "project_id", null: false
    t.integer  "member_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "team_assignments", ["project_id", "member_id"], name: "index_team_assignments_on_project_id_and_member_id", unique: true, using: :btree

  create_table "user_workspaces", force: :cascade do |t|
    t.integer  "user_id",      null: false
    t.integer  "workspace_id", null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "user_workspaces", ["user_id", "workspace_id"], name: "index_user_workspaces_on_user_id_and_workspace_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "fname",           null: false
    t.string   "lname",           null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

  create_table "workspaces", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "workspaces", ["title"], name: "index_workspaces_on_title", unique: true, using: :btree

end
