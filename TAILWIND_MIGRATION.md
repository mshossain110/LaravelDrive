# Vuetify to Tailwind CSS Migration Strategy

## Overview

Migrate the LaravelDrive frontend from **Vuetify 3.5** to **Tailwind CSS 3.4** with Headless UI for interactive primitives. The app has **41 Vue files** using **42 unique Vuetify components**.

---

## Prerequisites

- [x] Tailwind CSS 3.4.1 installed
- [x] @tailwindcss/forms plugin installed
- [x] PostCSS configured
- [ ] Fix `tailwind.config.js` content paths (currently missing Vue files)
- [ ] Install `@headlessui/vue` for accessible Dialog, Menu, Listbox, Combobox, Disclosure
- [ ] Decide icon strategy: keep `@mdi/font` or switch to `@heroicons/vue`

---

## Phase 0: Setup & Configuration

### 0.1 Fix Tailwind Config

Update `tailwind.config.js` content array to scan Vue files:

```js
content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.{vue,js,ts}',  // ADD THIS
]
```

### 0.2 Install Dependencies

```bash
npm install @headlessui/vue @heroicons/vue
```

### 0.3 Create Tailwind Base Components Directory

```
resources/js/Components/UI/
├── AppModal.vue        (replaces v-dialog + v-card)
├── AppDropdown.vue     (replaces v-menu)
├── AppDrawer.vue       (replaces v-navigation-drawer)
├── AppSnackbar.vue     (replaces v-snackbar)
├── AppDataTable.vue    (replaces v-data-table)
├── AppTreeView.vue     (replaces v-treeview)
├── AppSelect.vue       (replaces v-select)
├── AppCombobox.vue     (replaces v-combobox)
├── AppChip.vue         (replaces v-chip)
├── AppAvatar.vue       (replaces v-avatar)
└── AppTooltip.vue      (replaces v-tooltip)
```

---

## Phase 1: Layout Shell (4 files)

**Files:** `Layout.vue`, `MenuItems.vue`, `FavoriteFolders.vue`, `UserInfo.vue`

### Component Mapping

| Vuetify | Tailwind Replacement |
|---------|---------------------|
| `v-app` | `<div class="min-h-screen bg-gray-50">` |
| `v-app-bar` | `<header class="sticky top-0 z-30 ...">` |
| `v-app-bar-nav-icon` | `<button>` with hamburger SVG icon |
| `v-navigation-drawer` | `AppDrawer.vue` (sidebar with mobile slide-over) |
| `v-main` | `<main class="flex-1 ...">` |
| `v-toolbar` | `<div class="flex items-center px-4 h-16 ...">` |
| `v-toolbar-title` | `<h1 class="text-lg font-semibold ...">` |
| `v-list` | `<ul class="space-y-1">` |
| `v-list-item` | `<li><a class="flex items-center px-3 py-2 rounded-lg ...">` |
| `v-list-group` | Headless UI `Disclosure` |
| `v-divider` | `<hr class="border-gray-200 my-2">` |
| `v-spacer` | `<div class="flex-1">` |
| `v-menu` | Headless UI `Menu` |
| `v-avatar` | `AppAvatar.vue` |

### Steps
1. Build `AppDrawer.vue` with Headless UI `TransitionRoot`
2. Convert `Layout.vue` — replace v-app, v-app-bar, v-navigation-drawer, v-main
3. Convert `MenuItems.vue` — replace v-list, v-list-item, v-list-group with Disclosure
4. Convert `FavoriteFolders.vue` — replace v-list-group
5. Convert `UserInfo.vue` — replace v-menu, v-avatar, v-card with Headless UI Menu + AppAvatar

---

## Phase 2: Dashboard (2 files)

**Files:** `Dashboard.vue`, `Widgets/Count.vue`

### Component Mapping

| Vuetify | Tailwind Replacement |
|---------|---------------------|
| `v-row` | `<div class="grid grid-cols-12 gap-4">` |
| `v-col` | `<div class="col-span-3">` (adjust spans) |
| `v-icon` | `@heroicons/vue` or inline SVG |

### Steps
1. Convert `Dashboard.vue` grid layout
2. Convert `Count.vue` widget card with Tailwind utility classes

---

## Phase 3: MyDrive — Core File Management (14 files)

**Files:** `MyDrive.vue`, `Preview.vue`, `FileUploader.vue`, `ShareFile.vue`, `MoveTo.vue`, `RenameFile.vue`, `ShareLink.vue`, `ContextMenu.vue`, `mediaItem.vue`, `mediaToolbar.vue`, `NewFolderForm.vue`, `MediaInfo.vue`, `Stared.vue`, `SharedWithMe.vue`, `Trash.vue`, `RecursiveFolder.vue`

### Component Mapping

| Vuetify | Tailwind Replacement |
|---------|---------------------|
| `v-dialog` | `AppModal.vue` (Headless UI `Dialog`) |
| `v-card` | `<div class="rounded-xl bg-white shadow-sm border ...">` |
| `v-card-title` | `<div class="px-6 py-4 border-b ...">` |
| `v-card-text` | `<div class="px-6 py-4">` |
| `v-card-actions` | `<div class="px-6 py-4 border-t flex justify-end gap-3">` |
| `v-text-field` | `<input class="form-input rounded-lg ...">` |
| `v-combobox` | `AppCombobox.vue` (Headless UI `Combobox`) |
| `v-checkbox` | `<input type="checkbox" class="form-checkbox rounded ...">` |
| `v-treeview` | `AppTreeView.vue` (custom recursive component) |
| `v-overlay` | Headless UI `Popover` or custom positioned overlay |
| `v-img` | `<img class="object-cover ...">` with lazy loading |
| `v-progress-circular` | CSS spinner or SVG animation |
| `v-chip` | `AppChip.vue` |
| `v-snackbar` | `AppSnackbar.vue` (toast notification) |
| `v-tooltip` | `AppTooltip.vue` or CSS `title` attribute |
| `v-responsive` | Native aspect-ratio CSS: `aspect-video`, `aspect-square` |

### Steps (ordered by dependency)
1. Build `AppModal.vue` with Headless UI Dialog + transitions
2. Build `AppSnackbar.vue` toast notification system
3. Build `AppChip.vue` and `AppAvatar.vue`
4. Build `AppCombobox.vue` with Headless UI Combobox
5. Build `AppTreeView.vue` recursive tree component
6. Convert `MyDrive.vue` container (v-sheet, v-container)
7. Convert `mediaItem.vue` (v-img, v-avatar)
8. Convert `mediaToolbar.vue` (v-toolbar, v-menu, v-icon, v-btn)
9. Convert `ContextMenu.vue` (v-overlay, v-list)
10. Convert `NewFolderForm.vue` (v-dialog, v-card, v-text-field)
11. Convert `RenameFile.vue` (v-dialog, v-card, v-text-field)
12. Convert `Preview.vue` (v-dialog, v-card, v-toolbar)
13. Convert `FileUploader.vue` (v-card, v-toolbar, v-progress-circular)
14. Convert `ShareFile.vue` (v-dialog, v-combobox, v-chip, v-avatar, v-menu)
15. Convert `ShareLink.vue` (v-dialog, v-checkbox, v-menu)
16. Convert `MoveTo.vue` (v-dialog, v-treeview)
17. Convert `MediaInfo.vue` (v-navigation-drawer, v-img)
18. Convert `Stared.vue`, `SharedWithMe.vue`, `Trash.vue`

---

## Phase 4: Users & Roles (8 files)

**Files:** `Users.vue`, `UsersTable.vue`, `UserForm.vue`, `Roles.vue`, `RoleForm.vue`, `Role.vue`, `Permissions.vue`, `Profile.vue`

### Component Mapping

| Vuetify | Tailwind Replacement |
|---------|---------------------|
| `v-data-table` | `AppDataTable.vue` (custom HTML table + sort/pagination) |
| `v-select` | `AppSelect.vue` (Headless UI `Listbox`) |
| `v-simple-checkbox` | `<input type="checkbox" class="form-checkbox ...">` |

### Steps
1. Build `AppDataTable.vue` — sortable columns, pagination, row selection
2. Build `AppSelect.vue` with Headless UI Listbox
3. Convert `UsersTable.vue` (heaviest: data-table, select, checkbox, avatar, chip)
4. Convert `UserForm.vue` (text-field, container, row, col, checkbox)
5. Convert `Users.vue` (row, col, toolbar, dialog)
6. Convert role/permission files similarly
7. Convert `Profile.vue`

---

## Phase 5: Translations (6 files)

**Files:** `Translations.vue`, `NewTranslation.vue`, `Languages.vue`, `Language.vue`, `NewLanguage.vue`, `TranslationInput.vue`

### Steps
1. Convert `Translations.vue` (v-card, v-toolbar, v-select, v-text-field, v-menu, v-list)
2. Convert remaining translation files using already-built UI components

---

## Phase 6: Passport / OAuth (3 files)

**Files:** `Clients.vue`, `AuthorizedClients.vue`, `PersonalAccessTokens.vue`

### Steps
1. Convert all three using AppModal, AppDataTable, form inputs

---

## Phase 7: Cleanup

1. Remove Vuetify from `app.js` — delete `app.use(Vuetify)` line
2. Delete `resources/js/Vuetify.js`
3. Uninstall packages:
   ```bash
   npm uninstall vuetify material-design-icons-iconfont @mdi/font
   ```
4. Remove Vuetify CSS imports from `resources/css/app.css`
5. Run `npm run build` — verify no Vuetify references remain
6. Test all pages end-to-end

---

## Reusable UI Components Reference

### AppModal.vue
```
Props: open (Boolean), title (String), maxWidth (String: 'sm'|'md'|'lg'|'xl')
Events: @close
Slots: default, footer
Uses: Headless UI Dialog, TransitionRoot
```

### AppDropdown.vue
```
Props: align ('left'|'right')
Slots: trigger, content
Uses: Headless UI Menu
```

### AppDrawer.vue
```
Props: open (Boolean), side ('left'|'right')
Events: @close
Slots: default
Behavior: overlay on mobile, persistent on desktop
```

### AppDataTable.vue
```
Props: columns (Array), items (Array), sortBy (String), loading (Boolean)
Events: @sort, @page-change
Slots: column-specific slots, empty state
Features: sortable headers, pagination, row selection, loading state
```

### AppTreeView.vue
```
Props: items (Array), openAll (Boolean), selectable (Boolean)
Events: @select
Slots: label
Features: recursive expand/collapse, icons, selection
```

### AppSnackbar.vue
```
Props: message (String), type ('success'|'error'|'info'), duration (Number)
Behavior: auto-dismiss, stacked, bottom-right position
```

---

## Migration Checklist

- [x] **Phase 0** — Fix config, install deps, create UI directory
- [x] **Phase 1** — Layout shell (4 files)
- [x] **Phase 2** — Dashboard (2 files)
- [x] **Phase 3** — MyDrive file management (14 files)
- [x] **Phase 4** — Users & Roles (8 files)
- [x] **Phase 5** — Translations (6 files)
- [x] **Phase 6** — Passport/OAuth (3 files)
- [x] **Phase 7** — Cleanup & remove Vuetify

---

## Notes

- **Incremental migration**: Vuetify and Tailwind can coexist during migration. Convert one section at a time and test before moving on.
- **Hardest components**: `v-data-table` and `v-treeview` have the most built-in functionality to replicate. Consider using a lightweight library if the custom build is too complex.
- **Icons**: If keeping `@mdi/font`, replace `<v-icon>mdi-xxx</v-icon>` with `<span class="mdi mdi-xxx"></span>`. If switching to Heroicons, import SVG components directly.
- **Transitions**: Vuetify provides built-in transitions. Use Headless UI `Transition` or Vue's `<Transition>` component with Tailwind classes.
- **Theme colors**: Map Vuetify custom theme colors to `tailwind.config.js` `extend.colors`.
