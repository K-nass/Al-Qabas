# Dynamic Document Title Implementation

## Overview
The browser document title now automatically changes based on the current route and language selection.

## How It Works

### Hook: `useDocumentTitle`
**File**: `src/hooks/useDocumentTitle.ts`

The hook:
1. Listens to route changes using `useLocation()`
2. Maps the current pathname to a translation key
3. Translates the title using `useTranslation()`
4. Updates `document.title` with format: `{PageTitle} | Al-Qabas`

### Route Mappings
```
/admin                      → Dashboard
/admin/post-format          → Post Format
/admin/add-post             → Add Post
/admin/posts/all            → All Posts
/admin/posts/slider-posts   → Slider Posts
/admin/posts/featured-posts → Featured Posts
/admin/posts/breaking-news  → Breaking News
/login                      → Login
/register                   → Register
```

## Features

✅ **Automatic Updates** - Title changes when navigating between pages  
✅ **Language Support** - Title updates when language is toggled  
✅ **Bilingual** - Shows English or Arabic titles based on current language  
✅ **Consistent Format** - All titles follow `{Page} | Al-Qabas` format  
✅ **Translation Keys** - Uses existing i18n translation system  

## Implementation Details

### App.tsx
The `useDocumentTitle()` hook is called in the `AppContent` component, which is inside the `LanguageProvider`. This ensures:
- The hook has access to the translation system
- Title updates when language changes
- Title updates when route changes

### Translation Keys Used
All titles use existing translation keys from `src/i18n/locales/en.json` and `src/i18n/locales/ar.json`:
- `dashboard.home`
- `dashboard.postFormat`
- `post.addPost`
- `dashboard.allPosts`
- `dashboard.sliderPosts`
- `dashboard.featuredPosts`
- `dashboard.breakingNews`
- `auth.login`
- `auth.register`
- `app.nameAlt` (Al-Qabas - used as suffix)

## Adding New Routes

To add a dynamic title for a new route:

1. Add the route to `src/routes.tsx`
2. Add the mapping to `routeTitles` array in `src/hooks/useDocumentTitle.ts`:
```typescript
{ path: '/admin/new-page', titleKey: 'dashboard.newPage' }
```
3. Ensure the translation key exists in both `en.json` and `ar.json`

## Example

When user navigates to `/admin/posts/all`:
- **English**: Browser title shows `All Posts | Al-Qabas`
- **Arabic**: Browser title shows `جميع المقالات | القبس`

When language is toggled, the title automatically updates without page reload.

## Files Modified
- `src/hooks/useDocumentTitle.ts` (new)
- `src/App.tsx` (updated)

## Testing
1. Navigate to different admin pages
2. Check browser tab title changes
3. Toggle language and verify title updates
4. Refresh page - title should persist based on current route
