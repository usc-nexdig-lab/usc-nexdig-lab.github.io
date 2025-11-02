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





