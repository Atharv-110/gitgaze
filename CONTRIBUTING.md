# Contribution Rules📚:

- You are allowed to make pull requests that break the rules. We just merge it ;)
- Do NOT add any build steps, e.g., npm install (we want to keep this a simple static site)
- Do NOT remove other content.
- Styling/code can be pretty, ugly, or stupid, big or small, as long as it works
<!-- - Add your name to the contributorsList file. -->
- Try to keep pull requests small to minimize merge conflicts

## Getting Started 🤩🤗:

- Fork this repo (button on top)
- Clone it on your local machine

```markdown
git clone https://github.com/<your-username>/gitgaze.git
```

- Navigate to the project directory.

```markdown
cd gitgaze
```

- Create a new branch

```markdown
git checkout -b my-new-branch
```
- Stage your changes 
<!--- - Add your name to `contributors/contributorsList.js`. -->

```markdown
git add .
```

- Commit your changes.

```markdown
git commit -m "Relevant message"
```

- Then push

```markdown
git push origin my-new-branch
```

- Create a new pull request from your forked repository

<br>

## Avoid Conflicts {Syncing your fork}

An easy way to avoid conflicts is to add an 'upstream' for your git repo, as other PRs may be merged while you're working on your branch/fork.   

```markdown
git remote add upstream https://github.com/<your-username>/gitgaze.git
```

You can verify that the new remote has been added by typing:

```markdown
git remote -v
```

To pull any new changes from your parent repo, simply run:

```markdown
git merge upstream/main
```

This will give you any eventual conflicts and allow you to easily solve them in your repo. It's a good idea to use it frequently in between your own commits to make sure that your repo is up to date with its parent.

For more information on syncing forks, [read this article from GitHub](https://help.github.com/articles/syncing-a-fork/).
