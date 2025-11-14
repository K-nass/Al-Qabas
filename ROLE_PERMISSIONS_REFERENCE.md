# Role Permissions Reference

This document defines the standard permissions for each default role in the system.

## Permission Values (PascalCase)

All permission values must be in PascalCase format:
- `AddPost`
- `AddReels`
- `CanReferPost`
- `CanReferReels`
- `ManageAllPosts`
- etc.

## Default Role Configurations

### 1. Author Role
**Permissions:**
- `AddPost`
- `AddReels`

**Description:** Authors can create posts and reels but cannot refer them.

---

### 2. Member Role
**Permissions:**
- `AddPost`
- `AddReels`

**Description:** Members have the same permissions as Authors.

---

### 3. Writer Role
**Permissions:**
- `AddPost`
- `AddReels`
- `CanReferPost`
- `CanReferReels`

**Description:** Writers have all Author permissions plus the ability to refer posts and reels.

---

## How to Update Existing Roles

1. Navigate to **Admin Panel → Roles & Permissions**
2. Find the role you want to update (e.g., "Author")
3. Click the **Edit** button
4. Check/uncheck the appropriate permission checkboxes
5. Click **Update Role** to save changes

## Creating New Roles

1. Navigate to **Admin Panel → Roles & Permissions**
2. Click **Add Role** button
3. Enter the role name
4. Select the desired permissions from the checklist
5. Click **Add Role** to create

## Notes

- Default roles (marked with "Default" badge) cannot be deleted
- Default roles can have their permissions modified but cannot be renamed
- All permission changes take effect immediately
- Users with updated roles will have their permissions refreshed on next login
