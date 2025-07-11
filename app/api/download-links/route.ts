import { NextResponse } from 'next/server'

interface GitHubRelease {
  id: number
  tag_name: string
  name: string
}

interface GitHubAsset {
  id: number
  name: string
  browser_download_url: string
  content_type: string
  size: number
}

interface DownloadLink {
  id: string
  label: string
  url: string
  enabled: boolean
}

interface PlatformDownloads {
  mac: DownloadLink[]
  windows: DownloadLink[]
}

interface CachedData {
  version: string
  downloadLinks: PlatformDownloads
  timestamp: number
}

// In-memory cache (in production, consider using Redis or similar)
let cache: CachedData | null = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function GET() {
  try {
    // Check cache first
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        version: cache.version,
        downloadLinks: cache.downloadLinks,
        cached: true
      })
    }

    // Fetch latest release
    const releaseResponse = await fetch('https://api.github.com/repos/therealtimex/realtimex/releases/latest', {
      headers: {
        'User-Agent': 'RealTimeX-Download-Service'
      }
    })
    
    if (!releaseResponse.ok) {
      const errorData = {
        status: releaseResponse.status,
        statusText: releaseResponse.statusText
      }
      
      if (releaseResponse.status === 429) {
        return NextResponse.json({
          error: 'rate_limit',
          message: 'GitHub API rate limit exceeded. Please try again in a few minutes.',
          retryAfter: releaseResponse.headers.get('retry-after') || '60'
        }, { status: 429 })
      }
      
      throw new Error(`GitHub API error: ${releaseResponse.status} ${releaseResponse.statusText}`)
    }
    
    const release: GitHubRelease = await releaseResponse.json()
    
    // Fetch assets for the latest release
    const assetsResponse = await fetch(`https://api.github.com/repos/therealtimex/realtimex/releases/${release.id}/assets`, {
      headers: {
        'User-Agent': 'RealTimeX-Download-Service'
      }
    })
    
    if (!assetsResponse.ok) {
      if (assetsResponse.status === 429) {
        return NextResponse.json({
          error: 'rate_limit',
          message: 'GitHub API rate limit exceeded. Please try again in a few minutes.',
          retryAfter: assetsResponse.headers.get('retry-after') || '60'
        }, { status: 429 })
      }
      
      throw new Error(`GitHub API error: ${assetsResponse.status} ${assetsResponse.statusText}`)
    }
    
    const assets: GitHubAsset[] = await assetsResponse.json()
    
    // Map assets to download links
    const downloadLinks: PlatformDownloads = {
      mac: [],
      windows: []
    }
    
    assets.forEach(asset => {
      const fileName = asset.name
      const fileNameLower = fileName.toLowerCase()
      
      // Only process files that start with "RealTimeX.AI-" and end with .dmg or .exe
      if (!fileName.startsWith('RealTimeX.AI-') || 
          (!fileName.endsWith('.dmg') && !fileName.endsWith('.exe'))
      ) {
        return
      }
      
      if (fileName.endsWith('.dmg')) {
        // Mac DMG files - check for arm64 or x86_64
        if (fileName.includes('-arm64.dmg')) {
          downloadLinks.mac.push({
            id: 'mac-apple-silicon',
            label: 'Download for Apple Silicon',
            url: asset.browser_download_url,
            enabled: true
          })
        } else if (fileName.includes('-x86_64.dmg')) {
          downloadLinks.mac.push({
            id: 'mac-intel',
            label: 'Download for Intel Mac',
            url: asset.browser_download_url,
            enabled: true
          })
        }
      } else if (fileName.endsWith('.exe')) {
        // Windows EXE files - check for arm64 or x86_64
        if (fileName.includes('-arm64.exe')) {
          downloadLinks.windows.push({
            id: 'windows-arm64',
            label: 'Download for Windows ARM64',
            url: asset.browser_download_url,
            enabled: false // Temporarily disabled
          })
        } else if (fileName.includes('-x86_64.exe')) {
          downloadLinks.windows.push({
            id: 'windows-x64',
            label: 'Download for Windows x64',
            url: asset.browser_download_url,
            enabled: true
          })
        }
      }
    })
    
    // Cache the successful response
    cache = {
      version: release.tag_name,
      downloadLinks,
      timestamp: Date.now()
    }
    
    return NextResponse.json({
      version: release.tag_name,
      downloadLinks
    })
    
  } catch (error) {
    console.error('Error fetching download links:', error)
    
    // Return error response instead of placeholder links
    return NextResponse.json({
      error: 'fetch_failed',
      message: 'Unable to fetch the latest download links. Please try again.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
