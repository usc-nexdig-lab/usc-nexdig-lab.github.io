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

after each push, deploy the changes to the website:
```shell
npm run deploy
```


To update research projects:
- add project details to projectDetails.tsx
- add project overview to research.tsx
- Note: the id in research.tsx needs to match the id in projectDetails.tsx

