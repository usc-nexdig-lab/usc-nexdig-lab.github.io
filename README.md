## setup

1. clone repository

```shell
git clone https://github.com/usc-nexdig-lab/usc-nexdig-lab.github.io.git
```

2. install packages

```shell
cd nexdig-site
npm i
```

3. run server

```shell
npm start
```

4. after each push, deploy the changes to the website:
```shell
npm run build
npm run predeloy
npm run deploy
```
after deployment, go to settings under the github repository -> Pages, and enter nexdig.usc.edu as the Custom Domain.

5. To update research projects:
- add project details to projectDetails.tsx
- add project overview to research.tsx
- Note: the id in research.tsx needs to match the id in projectDetails.tsx

## TODO
- add CI/CD pipeline to automate deployment upon each push and default custom domain without needing to change it everytime
- make main page pictures gallery-style slide show
- fix left corner logo configuration
- fix errors when directly accessing a subpage using URL or refresh a subpage. For example, directly searching for https://nexdig.usc.edu/people or refresh on this page will jump back to homepage. (used to jump to 404 not found page, but now I forced it to jump back to home pages using the 404.html)



