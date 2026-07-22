# Party Roster (Crewmates Project)

Submitted by: **Soja Sunny**

**Party Roster** is a web app that allows users to build and manage their own Dungeons & Dragons adventuring party. Users can recruit new crewmates, browse their full party, view an adventurer's detailed backstory, and update or release party members over time.

Time spent: **X** hours spent in total

## Required Features

The following **required** functionality is completed:

- [ ] The web app contains a page that features a create form to add a new crewmate
  - [ ] Users can name the crewmate
  - [ ] Users can set the crewmate's attributes by clicking on one of several values
- [ ] The web app includes a summary page of all the user's added crewmates
  - [ ] The summary page is sorted by creation date such that the most recently created crewmates appear at the top
- [ ] A previously created crewmate can be updated from the list of crewmates in the summary page
  - [ ] Each crewmate has an edit button that will take users to an update form for the relevant crewmate
  - [ ] Users can see the current attributes of their crewmate on the update form
  - [ ] After editing the crewmate's attribute values using the form, the user can immediately see those changes reflected in the update form and on the summary page
- [ ] A previously created crewmate can be deleted from the crewmate list
  - [ ] Using the edit form, there is a button that allows users to delete that crewmate
  - [ ] After deleting a crewmate, the crewmate should no longer be visible in the summary page
- [ ] Each crewmate has a direct, unique URL link to an info page about them
  - [ ] Clicking on a crewmate in the summary page navigates to the detail view page for that crewmate
  - [ ] The detail page contains extra information about the crewmate not included in the summary page
  - [ ] Users can navigate to the edit form from the detail page

The following **stretch** features are implemented:

- [ ] A crewmate can be given a category upon creation which restricts their attribute options
- [ ] A section of the summary page displays summary statistics about a user's crew
- [ ] The site displays a custom "success" metric about a user's crew which changes the look of the crewmate list

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<!-- Replace this line with your GIF walkthrough -->

GIF created with ...  <!-- LICEcap, Kap, ScreenToGif, or RecordIt -->

## Notes

Describe any challenges encountered while building the app, or things you'd like to explore further.

## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

---

## Setup Instructions (for local development)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a Supabase project**
   - Go to [supabase.com](https://supabase.com) and create a free project.
   - Open the **SQL Editor** and run the contents of `supabase_schema.sql` (included in this repo) to create the `crewmates` table.

3. **Connect your app to Supabase**
   - Copy `.env.example` to a new file named `.env`.
   - In your Supabase project, go to **Settings > API** and copy your **Project URL** and **anon public key** into `.env`:
     ```
     VITE_SUPABASE_URL=your-project-url-here
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     ```

4. **Run the app locally**
   ```bash
   npm run dev
   ```
   Then open the URL shown in your terminal (usually `http://localhost:5173`).

## Project Structure

```
party-roster/
├── src/
│   ├── components/
│   │   └── AttributeSelector.jsx   # reusable click-to-select attribute buttons
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── CreateCrewmate.jsx
│   │   ├── Gallery.jsx              # summary page
│   │   ├── CrewmateDetail.jsx       # detail page, one per crewmate URL
│   │   └── EditCrewmate.jsx
│   ├── App.jsx                      # routes
│   ├── constants.js                 # dropdown/attribute option lists
│   ├── supabaseClient.js
│   └── main.jsx
├── supabase_schema.sql               # run this in Supabase's SQL editor
├── .env.example
└── package.json
```
