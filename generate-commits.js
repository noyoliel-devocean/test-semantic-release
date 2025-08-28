#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

// Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, 21...
const fibonacciNumbers = [1, 1, 2, 3, 5, 8, 13, 21];

function updatePackageVersion(newVersion) {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    packageJson.version = newVersion;
    writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');
}

function executeGitCommand(command) {
    try {
        return execSync(command, { encoding: 'utf8', stdio: 'inherit' });
    } catch (error) {
        console.error(`Failed to execute: ${command}`);
        console.error(error.message);
        process.exit(1);
    }
}

function getNextVersion(currentVersion, commitType) {
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    
    switch (commitType) {
        case 'feat':
            return `${major}.${minor + 1}.0`;
        case 'fix':
            return `${major}.${minor}.${patch + 1}`;
        case 'chore':
        default:
            return currentVersion; // No version bump for chore commits
    }
}

async function generateCommits() {
    console.log('Starting commit generation with Fibonacci merge strategy...');
    
    // Get current version
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    let currentVersion = packageJson.version;
    
    // Create 20 additional commits (we already have 2)
    for (let i = 1; i <= 20; i++) {
        const commitNumber = i + 2; // We already have 2 commits
        
        // Determine commit type and whether to update version
        let commitType = 'chore';
        let shouldUpdateVersion = false;
        
        // Update version on specific commits (fibonacci positions and a few others)
        if (fibonacciNumbers.includes(i) || i % 7 === 0) {
            commitType = Math.random() > 0.5 ? 'feat' : 'fix';
            shouldUpdateVersion = true;
            const newVersion = getNextVersion(currentVersion, commitType);
            updatePackageVersion(newVersion);
            currentVersion = newVersion;
            console.log(`Commit ${commitNumber}: Updating version to ${currentVersion}`);
        }
        
        // Update test file content
        const testContent = `This is a test file for semantic release debugging.
Initial content for commit #2.

Commit #${commitNumber} - ${new Date().toISOString()}
Type: ${commitType}
${shouldUpdateVersion ? `Version: ${currentVersion}` : 'No version update'}`;
        
        writeFileSync('test-file.txt', testContent);
        
        // Create commit
        const commitMessage = shouldUpdateVersion 
            ? `${commitType}: update for commit ${commitNumber} with version bump`
            : `${commitType}: update for commit ${commitNumber}`;
            
        executeGitCommand('git add .');
        executeGitCommand(`git commit -m "${commitMessage}"`);
        
        console.log(`Created commit ${commitNumber}: ${commitMessage}`);
        
        // Check if this commit number is in Fibonacci sequence for merge to main
        if (fibonacciNumbers.includes(commitNumber)) {
            console.log(`🔄 Fibonacci merge: Merging commit ${commitNumber} to main branch`);
            
            // Switch to main, merge, and switch back to dev
            executeGitCommand('git checkout main');
            executeGitCommand(`git merge dev --no-ff -m "feat: merge dev to main at Fibonacci position ${commitNumber}"`);
            executeGitCommand('git checkout dev');
            
            console.log(`✅ Merged commit ${commitNumber} to main branch`);
        }
    }
    
    console.log('\n🎉 All commits generated successfully!');
    console.log('📊 Summary:');
    console.log('- Total commits created: 22 (2 initial + 20 additional)');
    console.log(`- Fibonacci merges to main at commits: ${fibonacciNumbers.filter(n => n <= 22).join(', ')}`);
    console.log('- Version updates occurred on Fibonacci commits and every 7th commit');
    
    // Push all branches
    console.log('\n📤 Pushing to GitHub...');
    executeGitCommand('git push origin dev');
    executeGitCommand('git push origin main');
    
    console.log('✅ Repository setup complete!');
}

generateCommits().catch(console.error);
