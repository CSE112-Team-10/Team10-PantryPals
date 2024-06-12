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

- As a user, I want the app to be intuitive and simple to use so that I can fulfill my needs of finding and using a recipe easily.

New:
- As a chef(user), I want to know that the recipe generated is safe for consumption so that I do not become sick from eating the dish.


## Tasks
### Backend
TODO:
 - Implement safety mechanic
    - Priority: med
        - We want to check the safety(i.e. is it safe to consume) of generated recipes to ensure users are not harmed from the app
    - Estimate: 8 hours
        - We still need to decide how we will do this

 - Create rest of lambda functions (Dalle)
    - Priority: High
        - Necessary for recipe image generation
    - Estimate: 4 hours
    
 - Connect Backend and Frontend
    - Priority: High
        - Necessary for the app to function
    - Estimate: 6 hours


### Frontend
TODO:
 - Start implementing mockups
    - Priority: Med
        - Focusing on UX
    - Estimate: 10 hours
        - Will be ongoing task for entire milestone

### Testing
TODO:
 - Write unit and integration tests for lambda functions (recipe, dalle, accounts, ChatGPT)
    - Priority: med
        - Important to ensure correct function as they are key components of the app
    - Estimate: 6 hours

 - Assist other teams with their tasks
    - Priority: Low
   - Testing team members are not a key component to to either frontend or backend and should only do this task if nothing else to do 
  - Estimate: 4 hours

## Sequencing Information
![Sequencing Information](https://github.com/CSE112-Team-10/Team10-PantryPals/blob/main/workplans/Sequencing-information-wk9.png "Sequencing Information")

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
  
