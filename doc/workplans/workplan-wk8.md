# Workplan 05/13/2024


## Sprint Structure
- 1 week each
- Milestones have 2 sprints, for a total 3 milestones
- Start and end on Monday
- We have weekly meetings at 3:00 PM on Monday to discuss tasks
- Meeting structure:
  - First few minutes: update on status/retrospections/reports.
  - Next: Discuss this sprint’s tasks, priorities, time estimates, and assign them
  - Next: Update the Github
  - Next: Group work
- Primarily work within roles
  - Each role/team will divide and assign their given tasks amongst themselves and upload those sub-tasks to the Github board
  - **Roles**:
    - **Frontend**: Andrew, Alexis, Ethan, (Daniel)
    - **Backend**: Bernie, Karl, Matthew, (Jett)
    - **Testing** (with CI/CD responsibilities): Jett(backend), Daniel (frontend)
      - (Will help out with frontend and backend if they have time)
    - **Support** : Xavier
      - fire brigade, the person whose project we chose
      - they will be assigned to whichever end has the most work during the sprint but primary task is to help all sections by clarifying code or other things
- Post updates in discord every other day


## User Stories
Did not complete fully so these remain the same.
- As a developer, I want to refactor the app to a web app so that it is more accessible for users
- As a user, I want the app to be a web app so that I can access the account across all my devices
  - Essentially same story but from two perspectives

New:
- As a chef(user), I want to be able to add specifications to the recipe so that I can further tailor the resulting recipe to suit my needs
- As a user, I want the app to be intuitive and simple to use so that I can fulfill my needs of finding and using a recipe easily.

## Tasks
### Backend
TODO:
 - Convert Model's Java files to javascript
    - Priority: High
        - We plan to use AWS's lambda functions, which do not work with Java, to handle server requests 
    - Estimate: 10 hours
        - There are 4 files we will work on first (Recipe.java, ChatGPT.java, Dalle.java, AccountManager.java) as they are the bare minimum needed for the app to run

 - Allow for more inputs (add more ChatGPT prompts)
    - Priority: high -> low
        - We want to give users the ability to add further specifications to their recipe so they can better tailor the recipe to suit their needs
    - Estimate: 4 hours
        - One team member (Matthew) also worked on the app so he know how to modify the prompt.
Done:
 - Set up a AWS webserver 
   - Priority: med
     - We want to switch from Googiehost to AWS so that we can use the Java files of the project instead of refactoring to PHP.
    - Estimate: 3 hours
      - One team member (Karl) has experience with AWS


### Frontend
TODO:
 - Create a recipe display page in React
   - Priority: High
     - This is the final page we need for a MVP
    - Estimate: 4 hours
      - We have assigned Andrew and Daniel to this task but they are still unfamiliar with React so it may take some time
    - Subtasks:
      - Convert JavaFX UI to React

 - Start implementing design decisions (Color palette, page layout/interaction)
    - Priority: Med -> low
        - Not necessary for the app to function but still important to the app
    - Estimate: 10 hours
        - Will be ongoing task for entire milestone

### Testing
No new tasks as no new features added. Additionally, React view file not fully implemented yet.
TODO:
 - Assist other teams with their tasks
 - Priority: Low
   - Testing team members are not a key component to to either frontend or backend and should only do this task if nothing else to do 
  - Estimate: 4 hours

## Sequencing Information
![Sequencing Information](https://github.com/CSE112-Team-10/Team10-PantryPals/blob/main/workplans/Sequencing-information-wk8.png "Sequencing Information")

Our primary focus this week is to finish refactoring from JavaFX to React and to start implementing new features.

## Current Overall Plan
 - Milestone 1: Refatoring
   - Update original repository from a JavaFX app to a web app
   - If time left in milestone, start adding features

- Milestone 2: Add features
  - Some features we are thinking about:
    - Text input
    - Input cuisine, number of servings, difficultly, cook time
    - encrypt password
    - prompt GPT to add/delete selected step
    - Quality control
      - Make sure generated recipe is safe for consumption

- Milestone 3: Quality Control:
  - Bug checks
  - Ensure decent load speed
    - Definition of decent to be discussed later
  
