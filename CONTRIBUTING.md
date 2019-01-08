# Contribution or overriding
Are welcome. To add a new feature just add a new Handler (which extends AbstractHandler). Then implement the chunk
upload and progress.

1. Fork the project.
2. Create your bugfix/feature branch and write your (try well-commented) code.
3. Commit your changes (and your tests) and push to your branch.
4. Create a new pull request against this package's `master` branch.

## Pull Requests

- **Use the [PSR-2 Coding Standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md).**
  The easiest way to apply the conventions is to use `composer run lint:fix`.

- **Consider our release cycle.**  We try to follow [SemVer v2.0.0](http://semver.org/). 

- **Document any change in behaviour.**  Make sure the `README.md` and any other relevant 
  documentation are kept up-to-date.

- **Create feature branches.**  Don't ask us to pull from your master branch.

- **One pull request per feature.**  If you want to do more than one thing, send multiple pull requests.

### Before pull-request do:

1. Rebase your changes on master branch
2. Lint project `composer run lint`
3. Run tests `composer run test`
4. (recommended) Write tests
5. (optinal) Rebase your commits to fewer commits
  
**Thank you!**
