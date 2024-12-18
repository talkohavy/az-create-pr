---
"az-create-pr": patch
---

`create-pr` command refactored. Created a new inquire - inquireMultiSelectFromList. BUGFIX: inquireTargetBranch always defaulted to 'develop' - now fixed. inquireConfirm now requires a message, and is not named alternativeMessage anymore, just message. inquireValue isn't automatically default anymore internally. You need to color it yourself from outside.
