# Laravel 13 Upgrade Notes

## Completed Steps

### 1. ✅ Updated Dependencies
- PHP: ^8.0.2 → ^8.2
- Laravel Framework: ^9.19 → ^11.0
- Laravel Sanctum: ^2.14.1 → ^4.0
- Laravel Tinker: ^2.7 → ^2.9
- Spatie Laravel Permission: ^5.5 → ^6.0
- Intervention Image: ^2.7 → ^3.0
- Guzzle: ^7.2 → ^7.8

### 2. ✅ Restructured Application Bootstrap
- Migrated `bootstrap/app.php` to Laravel 11+ structure
- Implemented new `Application::configure()` builder pattern
- Moved middleware aliases from HTTP Kernel to bootstrap

### 3. ✅ Fixed Deprecated Code
- Replaced `protected $dates` with `$casts` in ShareableLink model
- Updated Exception Handler method signatures (removed `@return void`)
- Updated Authenticate middleware with proper return type hints

### 4. ✅ Updated Frontend Dependencies
- Vite: ^2.9.11 → ^5.2.8
- Vue: ^3.2.37 → ^3.4.21
- Vuetify: ^3.0.0-beta.5 → ^3.5.13
- Laravel Vite Plugin: ^0.2.1 → ^1.0.2

## ⚠️ IMPORTANT: Manual Steps Required

### Step 1: Upgrade PHP (CRITICAL)
```bash
# You must upgrade your server PHP version to 8.2 or higher
php -v  # Check current version
```

### Step 2: Backup Database
```bash
# Create a complete backup before proceeding
php artisan db:backup  # or use your backup method
```

### Step 3: Run Composer Update
```bash
# Clear caches first
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# Update Composer dependencies
composer update

# If you encounter conflicts, try:
composer update --with-all-dependencies
```

### Step 4: Update NPM Dependencies
```bash
# Update Node packages
npm install

# Rebuild assets
npm run build
```

### Step 5: Update Intervention Image Usage (BREAKING CHANGE)
The Intervention Image library was upgraded from v2 to v3 with significant API changes.

**Files that need manual updates:**
1. `app/Http/Controllers/API/V1/FileController.php`
2. `app/Jobs/ResizedImage.php`

**Migration Guide:**
```php
// OLD (v2):
use Intervention\Image\Facades\Image;
$img = Image::make($file);
$img->fit(200, 200);
$img->save($path);

// NEW (v3):
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

$manager = new ImageManager(new Driver());
$img = $manager->read($file);
$img->scale(width: 200);
$img->save($path);
```

### Step 6: Update Spatie Permission (BREAKING CHANGE)
Spatie Laravel Permission v6 has breaking changes from v5.

**Check and update:**
- Permission model uses
- Role assignment methods
- Configuration file (`config/permission.php`)

**Run migrations if needed:**
```bash
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
php artisan migrate
```

### Step 7: Run Artisan Commands
```bash
# Clear all caches
php artisan optimize:clear

# Regenerate config cache
php artisan config:cache

# Regenerate route cache
php artisan route:cache

# Run migrations if needed
php artisan migrate

# Publish any new vendor assets
php artisan vendor:publish --tag=laravel-assets
```

### Step 8: Test the Application
```bash
# Run tests
php artisan test

# Or PHPUnit directly
./vendor/bin/phpunit
```

## 🔍 Files That May Need Review

### HTTP Kernel (Optional)
The `app/Http/Kernel.php` file is no longer required in Laravel 11+. 
Middleware registration has been moved to `bootstrap/app.php`.

**Options:**
1. Keep the file for compatibility (it won't break anything)
2. Delete it after verifying all middleware work correctly

### Route Service Provider (Optional)
The `app/Providers/RouteServiceProvider.php` can be removed in Laravel 11+.
Route configuration is now in `bootstrap/app.php`.

**Action:** Can be kept or removed after testing.

### Models
Check all models for:
- `$dates` property → migrate to `$casts`
- Type hints on methods
- Deprecated methods

### Controllers
Review for:
- Return type hints
- Request validation changes
- Response macros

## 🎯 Laravel 11 → 12 → 13 Migration

After Laravel 11 is stable and working:

### To Laravel 12:
```bash
# Update composer.json
"laravel/framework": "^12.0"

# Run composer update
composer update

# Follow Laravel 12 upgrade guide
```

### To Laravel 13:
```bash
# Update composer.json
"laravel/framework": "^13.0"

# Run composer update
composer update

# Follow Laravel 13 upgrade guide
```

## 📚 Resources

- [Laravel 10 Upgrade Guide](https://laravel.com/docs/10.x/upgrade)
- [Laravel 11 Upgrade Guide](https://laravel.com/docs/11.x/upgrade)
- [Intervention Image v3 Docs](https://image.intervention.io/v3)
- [Spatie Permission v6 Changelog](https://github.com/spatie/laravel-permission/blob/main/CHANGELOG.md)

## 🐛 Known Issues & Solutions

### Issue: "Class 'Illuminate\Foundation\Application' not found"
**Solution:** Run `composer dump-autoload`

### Issue: Intervention Image errors
**Solution:** Update all Image facade usages to v3 API (see Step 5)

### Issue: Permission errors after Spatie upgrade
**Solution:** Clear cache and republish permissions config

### Issue: Vite build errors
**Solution:** Delete `node_modules` and run `npm install` fresh

## ✅ Testing Checklist

- [ ] Application boots without errors
- [ ] Authentication works (login/logout)
- [ ] File uploads work correctly
- [ ] Image processing/resizing works
- [ ] Permissions/roles function properly
- [ ] API endpoints respond correctly
- [ ] Frontend assets load properly
- [ ] Database operations work
- [ ] Queue jobs process correctly
- [ ] Email notifications send
- [ ] Tests pass

## 📝 Notes

- The upgrade targets Laravel 11 first as a stable intermediate step
- Laravel 12 and 13 upgrades should be done incrementally after 11 is stable
- Always test in a staging environment first
- Monitor error logs closely after deployment
