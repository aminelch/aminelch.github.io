PRECOMMIT_HOOK := .git/hooks/pre-commit
HOOK_SOURCE := pre-commit

.PHONY: help
help:
	@echo "Available targets:"
	@echo "  help                    Display this help message"
	@echo "  setup-hook              Copy the pre-commit hook to the .git/hooks directory and make it executable"
	@echo "  remove-hook             Remove the pre-commit hook from the .git/hooks directory"
	@echo "  push-to-gitlab          Push commits to GitLab remote using the pre-commit hook"
	@echo "  push-to-github          Push commits to GitHub remote using the pre-commit hook"
	@echo "  push-to-all-remotes     Push commits to both GitLab and GitHub remotes"
	@echo "  clean                   No operation (useful for cleanup or resetting)"
	@echo "  about                   Display information about the author"

.PHONY: setup-hook
setup-hook:
	@echo "Setting up pre-commit hook..."
	@cp $(HOOK_SOURCE) $(PRECOMMIT_HOOK)
	@chmod +x $(PRECOMMIT_HOOK)
	@echo "Pre-commit hook installed successfully."

.PHONY: remove-hook
remove-hook:
	@echo "Removing pre-commit hook..."
	@if [ -f $(PRECOMMIT_HOOK) ]; then rm $(PRECOMMIT_HOOK); echo "Pre-commit hook removed."; else echo "No pre-commit hook to remove."; fi


.PHONY: push-to-all-remotes
push-to-all-remotes:
	@bash $(PRECOMMIT_HOOK)

.PHONY: push-to-gitlab
push-to-gitlab:
	@echo "Pushing commits to gitlab"
	@bash $(PRECOMMIT_HOOK) gitlab

.PHONY: push-to-github
push-to-github:
	@echo "Pushing commits to github"
	@bash $(PRECOMMIT_HOOK) origin

.PHONY: clean
clean:
	@echo "Nothing to clean."

.PHONY: about
about:
	@echo "Author: Amine LOUHICHI"
	@echo "This project is maintained by Amine LOUHICHI. For any inquiries, please contact at aminelch@pm.me."