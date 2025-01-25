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
- fix errors when directly accessing a certain page under our website. For example, directly searching for https://nexdig.usc.edu/people will give a 404 not found.



