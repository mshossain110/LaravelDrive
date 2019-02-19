## Laravel Drive allows you to create your own fully-featured, self-hosted file sharing and hosting website in minutes without any coding or server management knowledge.

<p align="center">
<a href="http://laraveldrive.decoderlab.com">Demo</a>
<br/>
</p>
```username: admin@admin.com```
```password: admin123```

## Features
-------------
* **Vue** – It is build with vuejs, vue-router and vuex.
* **vuetify** – vutify ui component for batter user experience.
* **File Sharing** – Users can share files and folders with multiple users, allowing collaboration.
* **Uploads** – Drop zone uploader for best User experience.
<!--- **Shareable Links** – Create publicly shareable links for files and folders with optional expiration date, password and permissions. -->

* **Responsive** – it is fully responsive and will work on desktop, mobile, tablet and other devices.
<!--- * File Previews – Preview multiple file types including audio, video, text, pdf, zip and images right in the browser without the need to download the file. -->
<!--- * Amazon S3, DigitalOcean, Dropbox Storage – Easily store user upload files on many different cloud services and providers. -->
* **Authentication system** – Fully featured authentication system with social login(facebook, twitter and google), normal login, registration, password recovery, account settings and more.
* **Roles & Permissions** – Assign roles and permissions to users to give or restrict access to specific functionality on the site.

<!---  Grid and List views – Both grid and list views are available and freely switchable by the user so they can select the one they prefer more. -->

* **Professional Design** – Pixel-perfect google’s material design.
<!--- Settings – Admin panel has many settings that allow you to fine-tune the site to your needs. -->
* **Drag and Drop** – Natural drag and drop features for uploading, selecting and moving files & folders.
* **Context Menu** – Fully integrated context menu (right click on file or folder) is available with all the actions you’d expect like delete, copy, share, move, rename, get link and more. This menu can be accessed from navigation bar as well on touch based devices.
<!--- * Trash – Deleted items will first be moved to trash so they can be restored later. -->
<!--- * Favorites – Favorite files or folders so you can find them easily from favorites page later. -->
<!--- * Search – Powerful search will find files and folders that are at any level of depth. -->
* **File Details** – Sidebar on the right will display selected file or folder details as well as preview (if available).
* 
## Requirements
------------
 - PHP >= 7.0.0
 - Laravel >= 5.5.0
 - Fileinfo PHP Extension
 
## How to install
-------------
1. Clone the repo  ```git clone https://github.com/mshossain110/LaravelDrive.git```
2. Move Directory ```cd LarvelDrive```
3. Install composer ```composer install```
4. Copy .env file ```cp .env.example .env```
5. Generate key ```php artisan key:generate```
6. Create database and edit ```.env``` file to add database, MAIL_DRIVER
7. Install Passport ```php artisan passport:install```
8. Migrate database ```php artisan migrate```
9. Install npm ```npm i```
10. Watch file ```npm run watch```

## License
------------
The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
