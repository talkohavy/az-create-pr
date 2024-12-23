# az-create-pr

## 1.0.18

### Patch Changes

- When adding a reviewer, the tool now inquires for the email first, to note that this is the most important part. Next up, it inquires the name, and makes sure the user understands it's just an alias / nickname, and not something important for az.

## 1.0.17

### Patch Changes

- Added help menu on error. Given that a special error is thrown, a help menu will be displayed to the user.
- The `reviewer` command now has clear documentation. With colored sub-commands, and many examples to guide the user on how to use it.

## 1.0.16

### Patch Changes

- `create-pr` command refactored. Created a new inquire - inquireMultiSelectFromList. BUGFIX: inquireTargetBranch always defaulted to 'develop' - now fixed. inquireConfirm now requires a message, and is not named alternativeMessage anymore, just message. inquireValue isn't automatically default anymore internally. You need to color it yourself from outside.

## 1.0.15

### Patch Changes

- Renamed 2 global variables: CLI_TOOL_NAME & toolNameBigText.

## 1.0.14

### Patch Changes

- The package is now using `esbuild` as its bundler. Faster builds, and bundle size is 50% less.

## 1.0.13

### Patch Changes

- BUGFIX: During build, need to change type from 'module' to 'commonjs'.

## 1.0.12

### Patch Changes

- We are now using esbuild to bundle our code, so it weighs much much less.

## 1.0.11

### Patch Changes

- The reviewers structure had changed. No more just a simple string. Now an object with `name`, `email`, and `checked`.
- Created 2 more inquires: `inquireConfirm` and `inquireValue`, under common/utils/inquires.
- `inquireSelectFromList` moved under common/utils/inquires.
- Added the `reviewer` command to add, updated, and delete a reviewer. You can use the --name, --email, and --checked to skip inquires, and just have the values set for the add or update commands.

## 1.0.10

### Patch Changes

- Added the Json Colorizer.
- Using the Json Colorizer to paint the response of currentContext

## 1.0.9

### Patch Changes

- added the config command

## 1.0.8

### Patch Changes

- added line-break before & after currentContext No context is currently set message
- export COLORS
- new approach to az-create-pr tool

## 1.0.7

### Patch Changes

- inquireShouldAutoComplete now defaults to false instead of true

## 1.0.6

### Patch Changes

- forgot to reduce the number of the step

## 1.0.5

### Patch Changes

- gave up the reviewers inquire

## 1.0.4

### Patch Changes

- asking 1 more question - confirming the auto-complete

## 1.0.3

### Patch Changes

- the check was for reviewers instead of reviewers.length

## 1.0.2

### Patch Changes

- added more people

## 1.0.1

### Patch Changes

- first publish of the cli
