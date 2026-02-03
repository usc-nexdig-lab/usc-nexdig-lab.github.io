## Running and deploying

1. clone repository

```shell
git clone https://github.com/usc-nexdig-lab/usc-nexdig-lab.github.io.git
```

2. install packages

```shell
npm i
```

3. run server

```shell
npm start
```

Once an update is pushed to the repository, the CI/CD pipeline will automatically deploy new changes to nexdig.usc.edu/

Please be very careful with the content you push, since the changes will be reflected immediately on our official website.

## System Architecture

This section describes how the USC NexDIG Lab website is technically implemented.

### Technology Stack

The website is built using modern web technologies:

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | React with TypeScript | React 18.3.1, TypeScript 4.9.5 |
| **Routing** | React Router | 6.30.3 |
| **Styling** | Tailwind CSS + Custom CSS | Tailwind 3.x |
| **Icons** | FontAwesome | 6.7.2 |
| **Build Tool** | Create React App (CRA) | react-scripts 5.0.1 |
| **Testing** | React Testing Library + Jest | Included with CRA |
| **Package Manager** | npm/yarn | npm (default) or yarn |
| **Deployment** | GitHub Pages | gh-pages 6.2.0 |

### Project Structure

The codebase follows a modular organization pattern:

```
src/
├── app.tsx              # Main application component with route definitions
├── index.tsx            # Application entry point
├── index.css            # Global styles and custom CSS utilities
├── components/          # Reusable UI components
│   ├── header.tsx       # Navigation header with routing
│   └── title.tsx        # Shared page title component
├── views/               # Page-level components (routed views)
│   ├── home.tsx         # Homepage with photo gallery and news
│   ├── people.tsx       # Team members display
│   ├── research.tsx     # Research projects listing
│   ├── publications.tsx # Publications list
│   ├── opportunities.tsx # Job/research opportunities
│   ├── projectDetails.tsx # Individual project detail pages
│   └── news.tsx         # News section component
├── assets/              # Static assets (SVG logos, images)
└── declarations.d.ts    # TypeScript type declarations

public/
├── index.html           # HTML template with GitHub Pages SPA routing
├── people_photos/       # Team member photos
└── project_photos/      # Research project images
```

### Routing System

The website uses **client-side routing** powered by React Router v6:

**Available Routes:**
- `/` - Homepage
- `/people` - Team members page
- `/research` - Research projects listing
- `/publications` - Publications page
- `/opportunities` - Opportunities page
- `/project/:id` - Dynamic route for individual project details

**Key Features:**
- Fixed navigation header with active route highlighting
- Client-side navigation (no page reloads)
- Location-based animations using `useLocation()` hook
- GitHub Pages SPA support (404 redirect handling)

### Data Management

The website uses a **simplified, file-based data approach** without external databases or state management libraries:

**Content Storage:**
- Research projects: defined as JavaScript objects in `/src/views/research.tsx`
- Project details: structured data in `/src/views/projectDetails.tsx`
- News items: stored in `/src/views/news.tsx`
- Publications: managed in `/src/views/publications.tsx`
- People: team information in `/src/views/people.tsx`

**Data Structure:**
Each project has:
- Metadata (title, subtitle, members)
- Links to artifacts (code, papers, demos)
- BibTeX citations
- Customizable HTML content sections
- Associated images

This approach allows lab members to directly update content by editing component files.

### Styling Approach

The website uses a **hybrid styling strategy**:

**1. Tailwind CSS (Primary)**
- Utility-first CSS framework
- Responsive design with mobile-first breakpoints
- Custom configuration in `tailwind.config.js`
- Examples: `px-[30px]`, `max-w-[1200px]`, `hidden sm:inline`

**2. Custom CSS (`index.css`)**
- Brand colors (USC maroon: #990000)
- Custom animations and transitions
- Navigation hover effects
- Specialized components (news grid, separators)
- Custom utility classes: `.clickable-link`, `.separator`, `.custom-h2`

**Responsive Design:**
- Mobile-first approach
- Breakpoint-based visibility controls
- Grid and flexbox layouts
- Fixed header with z-index layering

### Build and Deployment

**Build Process:**
```bash
npm run build           # Creates optimized production build in /build
npm start               # Runs development server (localhost:3000)
npm test                # Runs test suite
npm run deploy          # Builds and deploys to GitHub Pages
```

**Deployment Pipeline:**
1. Code changes are pushed to the GitHub repository
2. Automated CI/CD pipeline triggers (GitHub Actions)
3. `npm run build` creates an optimized production bundle
4. Build artifacts are deployed to GitHub Pages
5. Website updates at `https://usc-nexdig-lab.github.io`
6. Custom domain serves at `nexdig.usc.edu`

**Key Configuration:**
- Homepage URL set in `package.json`: `"homepage": "https://usc-nexdig-lab.github.io"`
- GitHub Pages deployment handled by `gh-pages` package
- SPA routing support via custom `404.html` redirect script
- Automatic HTTPS enabled

### Component Architecture

**Reusable Components:**
- `Header`: Navigation bar with active route detection
- `Title`: Standardized page title component

**Page Components (Views):**
Each view component is self-contained with:
- Data definitions
- Layout structure
- Styling (Tailwind classes)
- TypeScript type safety

**Best Practices:**
- Functional components with React Hooks
- TypeScript for type safety
- Modular CSS with Tailwind utilities
- Semantic HTML structure
- Accessibility considerations

### Development Workflow

1. **Local Development:**
   ```bash
   npm install      # Install dependencies
   npm start        # Start dev server at localhost:3000
   ```

2. **Making Changes:**
   - Edit component files in `/src`
   - Changes hot-reload automatically
   - Test in browser

3. **Deployment:**
   - Push changes to repository
   - CI/CD automatically builds and deploys
   - Verify at production URL

### Performance Optimizations

- Code splitting with React lazy loading (if needed)
- Optimized production builds via CRA
- Static asset caching
- Minified JavaScript and CSS
- Tree-shaking of unused code

### Testing Strategy

- Unit tests with React Testing Library
- Jest test runner (included with CRA)
- Test files colocated with components (`.test.tsx`)
- Run tests: `npm test`

## Updating research projects
We use two files to manage ongoing research:
- `/src/views/research.tsx`. This is the page you see when you go to "Research" on our website. It shows the current and past research we work on - note that a research is a line of research. You might have multiple publications under the same research
- `/src/views/projectDetails.tsx`. This is the page you see when you click on a certain research. It should consist of detailed descriptions of your research line.



### Skeleton of a project in `projectDetails.tsx`:
```js
  PROJECT_ID: { //project ID is a single-word identifier for your project. e.g. limao. **IT SHOULD MATCH THE ID USED IN research.tsx**
    title: "TITLE HERE", //research title
    subtitle: "SUBTITLE HERE", //subtitle (optional)
    links: [
      { label: "LINK NAME(e.g. code, paper, demo)", url: "#" }, //add a link to artifacts (optional), 
      { label: "Paper", url: "#" }, //e.g.: link to paper
    ],
    bibtex: `BIBTEX HERE`, //add bibtex (optional)
    members: [
      { name: "MEMBER 1", image: "/people_photos/##.jpg" }, //member name and photo of the person
      { name: "MEMBER 2", image: "/people_photos/##.jpg" },
    ],
    sections: [ //sections are customizable html blocks, as needed by projects.
      {
        title: "Project Description (required)",
        html: `<p>DETAILS HERE</p>`,
      },
      {
        title: "Proposed Approach (optional)",
        html: `<p>DETAILS HERE</p>`,
        images: ["/project_photos/blank.jpeg"],
      },
      {
        title: "Experimental Results (optinoal)",
        html: `<p>DETAILS HERE</p>`,
        images: ["/project_photos/blank.jpeg"],
      },
      {
        title: "Related Publications (optional)", //your publications in the line of this research area
        html: `
        <ul class="list-disc list-inside">
          <li>PUBLICATION 1/li>
          <li>PUBLICATION 2</li>
        </ul>`,
      },
    ],
    
  },
```

### Skeleton of a project description in research.tsx:
- first identify whether your project is current ongoing project or a past project
- add the short description to your project to the corresponding (current or past) section in `research.tsx`

```js
{
      id: "PROJECT_ID", //need to match PROJECT_ID in projectDetails.tsx
      header: "RESEARCH TITLE",
      content:
        "DETAILS HERE",
      image: "/project_photos/##.jpeg",
    },
```

## Roles and Duties
The lab website shall be maintained by PhDs and advisor of the NexDIG lab. 

The following is the breakdown of the duties:

Eveyone:
- **Research**: <u> add/update latest research</u> and maintain project page (in `/src/views/research.tsx` and `/src/views/projectDetails.tsx`)
- **News**: <u>add latest announcements</u>> regarding their own works, such as paper acceptance, internship, rewards, conference presentations. News are managed in `/src/views/news.tsx` - the news are automatically sorted by dates so please simply add a news section with incremented id
- **Publications**: <u>add your newest publications</u> in `src/views/publications.tsx`

Shelly will maintain the following components of the website:
- **People**: add new memebr and change member status in `src/view/people.tsx`
- **Home**: collect and update group photos
- **Maintenance**: troubleshoot and polish the layout of the website





