# Semantic Release Test Repository

This repository was created to debug semantic-release configuration issues in the DevOcean UI repository.

## Repository Structure

- **Branches:**
  - `main`: Stable releases with semantic versioning
  - `dev`: Development branch with beta prereleases

- **Commit History:**
  - Total: 22 commits (2 initial + 20 additional)
  - Fibonacci merge pattern: Commits 3, 5, 8, 13, 21 merged to main
  - Version updates: Applied on Fibonacci commits and every 7th commit

## Configuration

### Semantic Release Config (`release.config.js`)
Identical to UI repository configuration:
- Branches: `main` (stable), `dev` (beta prerelease)
- Plugins: commit-analyzer, release-notes-generator, changelog, npm (no publish), git, github

### GitHub Actions (`/.github/workflows/release.yml`)
- Triggers: Push to main/dev branches + manual dispatch
- Node.js 20.16.0
- Debug information for Git history and tags
- Semantic-release execution with debug mode

## Testing Results

### Commit Pattern Analysis
- ✅ 22 commits created successfully
- ✅ Fibonacci merges executed at correct positions
- ✅ Version increments: 1.0.0 → 1.5.2 (following semver)
- ✅ Conventional commit format used throughout

### Expected Semantic Release Behavior
Based on the commit history, semantic-release should:
1. Create beta releases on `dev` branch pushes
2. Create stable releases on `main` branch merges
3. Generate changelog from conventional commits
4. Update package.json version automatically

## Next Steps

1. **Manual Workflow Trigger:** Use GitHub Actions tab to manually run the release workflow
2. **Monitor Execution:** Check workflow logs for semantic-release debug output
3. **Compare with UI Repo:** Identify differences in execution environment
4. **Document Issues:** Record any configuration problems found

## Repository URL
https://github.com/noyoliel-devocean/test-semantic-release

