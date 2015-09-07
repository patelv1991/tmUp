# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Generate guest user and myself
User.create({ fname: "Guest", lname: "User", email: "guest@tmup.work", password: "password" })
User.create({ fname: "Varun", lname: "Patel", email: "patelv1991@gmail.com", password: "123456" })

# TmUp features data
Workspace.create({ title: "TmUp Features" })

# Add team members to workspace
2.times do |i|
  i += 1
  UserWorkspace.create({ user_id: i, workspace_id: Workspace.find_by_title("TmUp Features").id })
end

# TmUp Features projects
Project.create({
  title: "Current Features",
  description: "This Project lists current features of TmUp.",
  workspace_id: Workspace.find_by_title("TmUp Features").id
})

Project.create({
  title: "Features Under Development",
  description: "This Project lists features I am currently working on.",
  workspace_id: Workspace.find_by_title("TmUp Features").id
})

# TmUp Current feature tasks
Task.create({
  title: "Custom user authentication using BCrypt to store password hash",
  project_id: Project.find_by_title("Current Features").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: "2015-08-13"
})

Task.create({
  title: "Create / delete workspace",
  project_id: Project.find_by_title("Current Features").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: "2015-08-14"
})

Task.create({
  title: "Add / remove people from workspace, leave workspace",
  project_id: Project.find_by_title("Current Features").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: "2015-08-14"
})

Task.create({
  title: "Validate email and provide dynamic feedback through the email input box",
  project_id: Project.find_by_title("Current Features").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: "2015-08-15"
})

Task.create({
  title: "Create / edit / delete project",
  project_id: Project.find_by_title("Current Features").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: "2015-08-15"
})

Task.create({
  title: "Add / delete tasks",
  project_id: Project.find_by_title("Current Features").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: "2015-08-16"
})

Task.create({
  title: "Edit tasks by double clicking the task",
  project_id: Project.find_by_title("Current Features").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: "2015-08-16"
})

Task.create({
  title: "Assign task to a team member and add a due date",
  project_id: Project.find_by_title("Current Features").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: "2015-08-16",
  completed: true
})

Task.create({
  title: "Allow users to see tasks assigned to them by clicking on 'MY TASKS' in the sidebar",
  project_id: Project.find_by_title("Current Features").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: "2015-08-17",
  completed: true
})

Task.create({
  title: "Allow users to see other people's tasks by clicking on user's profile",
  project_id: Project.find_by_title("Current Features").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: "2015-08-17"
})

Task.create({
  title: "Allow users to mark tasks as complete and see completed",
  project_id: Project.find_by_title("Current Features").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: "2015-08-18"
})

Task.create({
  title: "Implement new features on this project",
  project_id: Project.find_by_title("Current Features").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: Time.now.localtime
})

Task.create({
  title: "Check out all TmUp features!!!!",
  project_id: Project.find_by_title("Current Features").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Guest").id,
  due_date: Time.now.localtime
})

Task.create({
  title: "Check out the website tour on top right corner",
  project_id: Project.find_by_title("Current Features").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Guest").id,
  due_date: Time.now.localtime
})

Task.create({
  title: "Implement search feature to allow users to query tasks",
  project_id: Project.find_by_title("Features Under Development").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: Time.now.localtime + 10.days
})

Task.create({
  title: "Add task show page",
  project_id: Project.find_by_title("Features Under Development").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: Time.now.localtime + 12.days
})

Task.create({
  title: "Allow users to create nested subtasks",
  project_id: Project.find_by_title("Features Under Development").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: Time.now.localtime + 15.days
})
# Avengers data
# Avengers workspace
Workspace.create({ title: "Avengers" })

# Avengers team
User.create({ fname: "Vision", lname: "Shade", email: "vision@avengers.com", password: "123456" })
User.create({ fname: "Hawkeye", lname: "Barton", email: "hawkeye@avengers.com", password: "123456" })
User.create({ fname: "Natasha", lname: "Romanoff", email: "black_widow@avengers.com", password: "123456" })
User.create({ fname: "Jarvis", lname: "Edwin", email: "jarvis@avengers.com", password: "123456" })
User.create({ fname: "Tony", lname: "Stark", email: "ironman@avengers.com", password: "123456" })
User.create({ fname: "Bruce", lname: "Banner", email: "hulk@avengers.com", password: "123456" })
User.create({ fname: "Thor", lname: "Odinson", email: "thor@avengers.com", password: "123456" })
User.create({ fname: "Steve", lname: "Rogers", email: "captain_america@avengers.com", password: "123456" })

# Add team members to workspace
10.times do |i|
  i += 1
  UserWorkspace.create({ user_id: i, workspace_id: Workspace.find_by_title("Avengers").id })
end

# Add Avengers projects
Project.create({
  title: "Avengers Tower",
  workspace_id: Workspace.find_by_title("Avengers").id
})

Project.create({
  title: "Infinity Stones",
  workspace_id: Workspace.find_by_title("Avengers").id
})

Project.create({
  title: "Hydra",
  description: "Find every last hydra agent within SHIELD and locate Red Skull",
  workspace_id: Workspace.find_by_title("Avengers").id
})

# Add Project Hydra Tasks
Task.create({
  title: "Finish designing newest avengers tower",
  project_id: Project.find_by_title("Avengers Tower").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Guest").id,
  due_date: 5.days.ago.localtime
})

Task.create({
  title: "Locate all six infinity stones",
  project_id: Project.find_by_title("Infinity Stones").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Guest").id,
  due_date: 1.day.ago.localtime
})

Task.create({
  title: "DO NOT engage with enemy. Leave that to Avengers!!!",
  project_id: Project.find_by_title("Hydra").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Guest").id,
  due_date: Time.now.localtime
})

Task.create({
  title: "Bring Nick Fury up-to-date on project Hydra and get backup",
  project_id: Project.find_by_title("Hydra").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Guest").id,
  due_date: Time.now.localtime
})

Task.create({
  title: "Locate Hydra base",
  project_id: Project.find_by_title("Hydra").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Hawkeye").id,
  due_date: Time.now.localtime + 1.day
})

Task.create({
  title: "Help Hawkeye infiltrate the Hydra base and then SMASH!!!",
  project_id: Project.find_by_title("Hydra").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Bruce").id,
  due_date: Time.now.localtime + 1.day
})

Task.create({
  title: "Wield the power of Mjölnir",
  project_id: Project.find_by_title("Hydra").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Thor").id,
  due_date: Time.now.localtime + 1.day,
  completed: true
})

Task.create({
  title: "Work with Steve to capture Red Skull",
  project_id: Project.find_by_title("Hydra").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Natasha").id,
  due_date: Time.now.localtime + 2.days
})

Task.create({
  title: "Capture Red Skull",
  project_id: Project.find_by_title("Hydra").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Steve").id,
  due_date: Time.now.localtime + 2.days
})

Task.create({
  title: "Capture Bucky Barnes aka Winter Soldier",
  project_id: Project.find_by_title("Hydra").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Steve").id,
  due_date: Time.now.localtime + 3.days
})

Task.create({
  title: "Capture Baron Strucker",
  project_id: Project.find_by_title("Hydra").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Tony").id,
  due_date: Time.now.localtime + 4.days
})

# Add Project Infinity Stone Tasks
Task.create({
  title: "Get in touch with Guardians of the Galaxy to locate Thanos and all infinity stones",
  project_id: Project.find_by_title("Infinity Stones").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Tony").id,
  due_date: Time.now.localtime,
  completed: true
})

Task.create({
  title: "Find out what Loki is upto and see if he has any of the infinity stones in his possession",
  project_id: Project.find_by_title("Infinity Stones").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Thor").id,
  due_date: Time.now.localtime,
})

Task.create({
  title: "Hold onto mind stone for safe keeping",
  project_id: Project.find_by_title("Infinity Stones").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Natasha").id,
  due_date: Time.now.localtime + 6.days,
  completed: true
})

Task.create({
  title: "Harness the power of mind stone",
  project_id: Project.find_by_title("Infinity Stones").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Vision").id,
  due_date: Time.now.localtime + 3.days
})

Task.create({
  title: "Capture Thanos and retrieve power and reality stones",
  project_id: Project.find_by_title("Infinity Stones").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Thor").id,
  due_date: Time.now.localtime + 5.days
})

Task.create({
  title: "Work with Thor in capturing Thanos",
  project_id: Project.find_by_title("Infinity Stones").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Bruce").id,
  due_date: Time.now.localtime + 5.days
})

# Add project Avengers Tower Tasks
Task.create({
  title: "Don't mess with Hulk's cookies",
  project_id: Project.find_by_title("Avengers Tower").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Hawkeye").id,
  due_date: Time.now.localtime
})

Task.create({
  title: "Train new recruits",
  project_id: Project.find_by_title("Avengers Tower").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Steve").id,
  due_date: Time.now.localtime + 5.days,
  completed: true
})

Task.create({
  title: "Keep an eye on avengers and report to Nick Fury :D",
  project_id: Project.find_by_title("Avengers Tower").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Natasha").id,
  due_date: Time.now.localtime
})

Task.create({
  title: "Build cool new Avengers toys and throw awesome parties!!",
  project_id: Project.find_by_title("Avengers Tower").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Tony").id,
  due_date: Time.now.localtime
})

Task.create({
  title: "Manage Avengers tower",
  project_id: Project.find_by_title("Avengers Tower").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Jarvis").id,
  due_date: Time.now.localtime
})

Task.create({
  title: "Take care of Hulk's laundry",
  project_id: Project.find_by_title("Avengers Tower").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Jarvis").id,
  due_date: 2.days.ago
})

Task.create({
  title: "Party with Avengers and design awesome web apps for them!!",
  project_id: Project.find_by_title("Avengers Tower").id,
  creator_id: 1,
  assignee_id: User.find_by_fname("Varun").id,
  due_date: 1.day.ago.localtime
})
