export default {
  branches: [
    { name: 'dev', channel: false }
  ],
  repositoryUrl: 'https://github.com/noyoliel-devocean/test-semantic-release.git',
  plugins: [
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits'
      }
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
      }
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        successComment: false
      }
    ],
    [
      '@semantic-release/github',
      {
        successComment: false,
        failTitle: false
      }
    ]
  ]
}; 