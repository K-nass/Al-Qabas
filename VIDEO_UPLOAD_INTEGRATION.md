# Video Upload Integration Guide

This guide explains how to integrate video upload functionality with the Al-Qabas CMS API.

## Overview

The video upload system consists of two main steps:
1. **Upload the video file** to get processing started
2. **Create a video post** once processing is complete

## API Response Structure

When you upload a video, you receive this response:

```json
{
  "uploadId": "fc0f0789-7efc-4c62-a713-ab417b36eafe",
  "fileName": "Dummy Video For Website.mp4",
  "status": "Pending",
  "message": "Video upload started. Processing in background (includes thumbnail generation).",
  "uploadedAt": "2025-11-12T18:00:06.1990794Z",
  "signalRHubUrl": "/hubs/media-upload"
}
```

## Status Flow

1. **Pending** - Video uploaded, processing started
2. **Processing** - Video being processed, thumbnail being generated
3. **Completed** - Processing finished, video and thumbnail URLs available
4. **Failed** - Processing failed

## Components Created

### 1. VideoService (`src/api/videoService.ts`)
- `uploadVideo()` - Upload video files
- `getUploadStatus()` - Check processing status
- `createVideo()` - Create video posts
- `validateVideoFile()` - Client-side validation

### 2. VideoCreationForm (`src/components/forms/VideoCreationForm.tsx`)
- Complete form with upload progress
- Real-time status updates
- Automatic thumbnail population

### 3. VideoIntegration (`src/utils/videoIntegration.ts`)
- Complete workflow utilities
- Upload + create post in one call
- Status monitoring helpers

## Usage Examples

### Basic Upload

```tsx
import { VideoService } from '../api/videoService';

const handleUpload = async (file: File) => {
  const response = await VideoService.uploadVideo({
    file,
    onProgress: (progress) => {
      console.log(`${progress.progress}% - ${progress.message}`);
    }
  });
  
  console.log('Upload ID:', response.uploadId);
};
```

### Complete Workflow

```tsx
import { VideoIntegration } from '../utils/videoIntegration';

const createVideoPost = async (file: File, categoryId: string) => {
  const result = await VideoIntegration.uploadAndCreateVideo(
    file,
    categoryId,
    {
      title: "عنوان الفيديو",
      content: "وصف الفيديو",
      language: "Arabic",
      visibility: true,
      addToFeatured: true,
      // ... other fields
    }
  );
  
  console.log('Upload:', result.uploadResponse);
  console.log('Video Post:', result.videoPost);
};
```

### Monitor Upload Status

```tsx
const checkStatus = async (uploadId: string) => {
  const status = await VideoService.getUploadStatus(uploadId);
  
  if (status.status === 'Completed') {
    console.log('Video URL:', status.videoUrl);
    console.log('Thumbnail URL:', status.thumbnailUrl);
  }
};
```

## Form Integration

The `VideoCreationForm` component handles everything automatically:

```tsx
import VideoCreationForm from '../components/forms/VideoCreationForm';

<VideoCreationForm
  categoryId="your-category-id"
  onSubmit={handleVideoSubmit}
  onCancel={handleCancel}
/>
```

Features:
- ✅ File validation (size, format)
- ✅ Upload progress tracking
- ✅ Automatic thumbnail population
- ✅ Real-time status updates
- ✅ Error handling

## Validation Rules

### File Requirements
- **Max size**: 100MB
- **Formats**: MP4, AVI, MOV, WebM
- **Required fields**: title, content, thumbnail URL

### API Validation
- External videos require both `videoUrl` AND `videoEmbedCode`
- Either `videoUrl` or `videoFileUrls` must be provided
- Duration format: `HH:MM:SS` or `HH:MM:SS.mmm`

## Error Handling

Common errors and solutions:

### "Video embed code is required when using an external video URL"
**Solution**: Always provide both `videoUrl` and `videoEmbedCode` for external videos.

```tsx
const videoData = {
  videoUrl: "https://youtube.com/watch?v=VIDEO_ID",
  videoEmbedCode: "<iframe src='...' width='560' height='315'></iframe>",
  // ... other fields
};
```

### File Upload Errors
- **File too large**: Compress video or use smaller file
- **Unsupported format**: Convert to MP4, AVI, MOV, or WebM
- **Network error**: Check API endpoint and connectivity

## Environment Configuration

Set your API base URL in `.env`:

```env
VITE_API_BASE_URL=http://cms-dev.runasp.net
```

## SignalR Integration (Future Enhancement)

The current implementation uses polling to check upload status. For real-time updates, you can integrate SignalR using the `signalRHubUrl` from the upload response.

## Testing

Use the example components to test the integration:

1. `VideoUploadExample` - Test file uploads
2. `VideoCreationExample` - Test complete video creation
3. `VideoCreationForm` - Production-ready form

## API Endpoints

- **Upload**: `POST /api/v1/media/upload-video`
- **Status**: `GET /api/v1/media/upload-status/{uploadId}`
- **Create Video**: `POST /api/v1/posts/categories/{categoryId}/videos`

## Next Steps

1. Add SignalR for real-time progress updates
2. Implement video preview functionality
3. Add batch upload support
4. Integrate with video player components

## Support

For issues or questions about the video upload integration, check:
- Console logs for detailed error messages
- Network tab for API request/response details
- Upload status endpoint for processing updates
