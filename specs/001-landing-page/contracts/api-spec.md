# API Contracts: Landing Page System

**Feature**: Kids Learning App Landing Page  
**Date**: 2025-11-01  
**Purpose**: Define API interfaces for static content delivery and navigation

## Overview

The landing page system primarily serves static content with minimal API requirements. APIs focus on content delivery, performance optimization, and basic navigation tracking (COPPA compliant).

## Content Delivery API

### Base Configuration
```yaml
openapi: 3.0.3
info:
  title: Kids Learning App - Landing Page API
  version: 1.0.0
  description: Static content delivery for landing page and subject navigation
servers:
  - url: https://api.kidslearning.app/v1
    description: Production API
  - url: https://staging-api.kidslearning.app/v1
    description: Staging API
```

### Security
```yaml
security:
  - ApiKeyAuth: []
securitySchemes:
  ApiKeyAuth:
    type: apiKey
    in: header
    name: X-API-Key
    description: Public API key for content access (no user data)
```

## Endpoints

### 1. Landing Page Content
```yaml
/landing:
  get:
    summary: Get landing page configuration
    description: Returns static configuration for main landing page
    tags: [Content]
    responses:
      200:
        description: Landing page data
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LandingPage'
      304:
        description: Not modified (cached content still valid)
      500:
        description: Server error
    parameters:
      - name: If-None-Match
        in: header
        schema:
          type: string
        description: ETag for caching
```

### 2. Subject List
```yaml
/subjects:
  get:
    summary: Get available subjects
    description: Returns list of all educational subjects
    tags: [Content]
    responses:
      200:
        description: List of subjects
        content:
          application/json:
            schema:
              type: object
              properties:
                subjects:
                  type: array
                  items:
                    $ref: '#/components/schemas/Subject'
                total:
                  type: integer
                lastModified:
                  type: string
                  format: date-time
```

### 3. Subject Details
```yaml
/subjects/{subjectId}:
  get:
    summary: Get subject details
    description: Returns detailed information for a specific subject
    tags: [Content]
    parameters:
      - name: subjectId
        in: path
        required: true
        schema:
          type: string
          pattern: '^[a-z][a-z0-9-]*$'
          example: 'math'
    responses:
      200:
        description: Subject details
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SubjectPage'
      404:
        description: Subject not found
```

### 4. Media Assets
```yaml
/media/{assetId}:
  get:
    summary: Get optimized media asset
    description: Returns optimized image or media file
    tags: [Media]
    parameters:
      - name: assetId
        in: path
        required: true
        schema:
          type: string
      - name: width
        in: query
        schema:
          type: integer
          enum: [320, 640, 1024, 1920]
        description: Requested image width
      - name: format
        in: query
        schema:
          type: string
          enum: [webp, jpeg, png]
        description: Preferred image format
    responses:
      200:
        description: Media file
        content:
          image/*:
            schema:
              type: string
              format: binary
        headers:
          Cache-Control:
            schema:
              type: string
              example: 'public, max-age=31536000'
          ETag:
            schema:
              type: string
```

### 5. Health Check
```yaml
/health:
  get:
    summary: Service health check
    description: Returns service status for monitoring
    tags: [System]
    responses:
      200:
        description: Service healthy
        content:
          application/json:
            schema:
              type: object
              properties:
                status:
                  type: string
                  enum: [healthy]
                timestamp:
                  type: string
                  format: date-time
                version:
                  type: string
```

## Data Schemas

### LandingPage Schema
```yaml
LandingPage:
  type: object
  required: [id, title, subtitle, heroImage, subjectNavigation]
  properties:
    id:
      type: string
      example: 'main-landing'
    title:
      type: string
      minLength: 2
      maxLength: 50
      example: 'Kids Learning Adventure'
    subtitle:
      type: string
      minLength: 10
      maxLength: 200
      example: 'Fun and interactive learning for kids aged 5-12'
    heroImage:
      $ref: '#/components/schemas/MediaAsset'
    subjectNavigation:
      type: array
      items:
        $ref: '#/components/schemas/SubjectCard'
      minItems: 3
      maxItems: 12
    metadata:
      $ref: '#/components/schemas/PageMetadata'
```

### Subject Schema
```yaml
Subject:
  type: object
  required: [id, name, description, icon, coverImage, color, status]
  properties:
    id:
      type: string
      pattern: '^[a-z][a-z0-9-]*$'
      example: 'math'
    name:
      type: string
      minLength: 3
      maxLength: 30
      example: 'Math Adventure'
    description:
      type: string
      minLength: 20
      maxLength: 150
      example: 'Numbers, counting, and problem-solving fun!'
    icon:
      $ref: '#/components/schemas/MediaAsset'
    coverImage:
      $ref: '#/components/schemas/MediaAsset'
    color:
      $ref: '#/components/schemas/SubjectColor'
    difficulty:
      type: string
      enum: [beginner, intermediate, advanced]
    status:
      type: string
      enum: [available, coming-soon, maintenance]
```

### MediaAsset Schema
```yaml
MediaAsset:
  type: object
  required: [id, altText, dimensions, optimizedUrls]
  properties:
    id:
      type: string
      example: 'hero-landing-001'
    altText:
      type: string
      minLength: 10
      maxLength: 200
      example: 'Happy children learning with colorful educational materials'
    dimensions:
      $ref: '#/components/schemas/ImageDimensions'
    optimizedUrls:
      $ref: '#/components/schemas/ResponsiveImageSet'
    loadingStrategy:
      type: string
      enum: [eager, lazy, critical]
      default: lazy
```

### ResponsiveImageSet Schema
```yaml
ResponsiveImageSet:
  type: object
  properties:
    webp:
      type: object
      properties:
        320w:
          type: string
          format: uri
        640w:
          type: string
          format: uri
        1024w:
          type: string
          format: uri
        1920w:
          type: string
          format: uri
    jpeg:
      type: object
      properties:
        320w:
          type: string
          format: uri
        640w:
          type: string
          format: uri
        1024w:
          type: string
          format: uri
        1920w:
          type: string
          format: uri
```

## Error Handling

### Standard Error Response
```yaml
ErrorResponse:
  type: object
  properties:
    error:
      type: object
      properties:
        code:
          type: string
          example: 'SUBJECT_NOT_FOUND'
        message:
          type: string
          example: 'The requested subject could not be found'
        timestamp:
          type: string
          format: date-time
        requestId:
          type: string
          format: uuid
```

### Common Error Codes
- `SUBJECT_NOT_FOUND`: Requested subject ID doesn't exist
- `MEDIA_NOT_FOUND`: Requested media asset doesn't exist
- `INVALID_FORMAT`: Unsupported image format requested
- `RATE_LIMIT_EXCEEDED`: Too many requests from client
- `SERVICE_UNAVAILABLE`: Temporary service interruption

## Caching Strategy

### Cache Headers
```http
# Static content (images, configs)
Cache-Control: public, max-age=31536000, immutable
ETag: "content-hash-12345"

# Dynamic content with validation
Cache-Control: public, max-age=300, must-revalidate
ETag: "config-version-67890"
```

### CDN Configuration
- **Static assets**: 1 year cache, immutable
- **API responses**: 5 minutes cache with revalidation
- **Media transforms**: 1 year cache with versioning
- **Error responses**: No cache

## Performance Requirements

### Response Time Targets
- `/landing`: <200ms (95th percentile)
- `/subjects`: <300ms (95th percentile)
- `/media/*`: <500ms initial, <100ms cached
- `/health`: <50ms

### Throughput Requirements
- 1000 requests/minute for content endpoints
- 10,000 requests/minute for media endpoints
- 99.9% uptime SLA

## COPPA Compliance

### Privacy Considerations
- **No user tracking**: APIs serve public content only
- **No personal data**: All responses contain static content
- **No cookies**: Stateless API design
- **Access logging**: Minimal, aggregated only
- **Data retention**: Content versioning only, no user data

### Security Measures
- API key authentication for content access
- Rate limiting to prevent abuse
- HTTPS only for all endpoints
- Input validation for all parameters
- No sensitive data in URLs or logs

## Implementation Notes

### Static Content Delivery
Since this is primarily a landing page with static content, consider:
1. **Static Site Generation**: Pre-build all content at deploy time
2. **CDN-first**: Serve everything through CDN when possible
3. **API fallback**: Use API for dynamic updates only
4. **Edge functions**: Handle image transformations at CDN edge

### Future Enhancements
- GraphQL endpoint for flexible content queries
- Webhook system for content updates
- Analytics API (with privacy protection)
- Multi-language content support
- Real-time status updates for subjects