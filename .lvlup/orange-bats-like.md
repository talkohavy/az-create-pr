---
"az-create-pr": patch
---

BUGFIX: when changed crud to CRUD, we forgot to give an alias of crud. Without the alias, none of the sub-commands got hit, and so an error was thrown, opening the help menu by default.
