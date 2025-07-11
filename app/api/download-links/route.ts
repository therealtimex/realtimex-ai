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

export async function GET() {
  try {
    // Fetch latest release
    const releaseResponse = await fetch('https://api.github.com/repos/therealtimex/realtimex/releases/latest')
    if (!releaseResponse.ok) {
      throw new Error('Failed to fetch latest release')
    }
    
    const release: GitHubRelease = await releaseResponse.json()
    
    // Fetch assets for the latest release
    const assetsResponse = await fetch(`https://api.github.com/repos/therealtimex/realtimex/releases/${release.id}/assets`)
    if (!assetsResponse.ok) {
      throw new Error('Failed to fetch release assets')
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
      
      // Only process files that start with "RealTimeX.AI-" and end with .dmg or .exe (excluding .blockmap files)
      if (!fileName.startsWith('RealTimeX.AI-') || 
          (!fileName.endsWith('.dmg') && !fileName.endsWith('.exe')) ||
          fileName.includes('.blockmap')) {
        return
      }
      
      if (fileName.endsWith('.dmg')) {
        // Mac DMG files
        if (fileNameLower.includes('arm64') || fileNameLower.includes('apple-silicon')) {
          downloadLinks.mac.push({
            id: 'mac-apple-silicon',
            label: 'Download for Apple Silicon',
            url: asset.browser_download_url,
            enabled: true
          })
        } else if (fileNameLower.includes('x64') || fileNameLower.includes('intel')) {
          downloadLinks.mac.push({
            id: 'mac-intel',
            label: 'Download for Intel Mac',
            url: asset.browser_download_url,
            enabled: true
          })
        } else {
          // Generic Mac download if no specific architecture is detected
          downloadLinks.mac.push({
            id: 'mac-universal',
            label: 'Download for macOS',
            url: asset.browser_download_url,
            enabled: true
          })
        }
      } else if (fileName.endsWith('.exe')) {
        // Windows EXE files
        if (fileNameLower.includes('x64')) {
          downloadLinks.windows.push({
            id: 'windows-x64',
            label: 'Download for Windows x64',
            url: asset.browser_download_url,
            enabled: true
          })
        } else if (fileNameLower.includes('amd64')) {
          downloadLinks.windows.push({
            id: 'windows-amd64',
            label: 'Download for Windows AMD64',
            url: asset.browser_download_url,
            enabled: false // Temporarily disabled as requested
          })
        } else {
          // Generic Windows download if no specific architecture is detected
          downloadLinks.windows.push({
            id: 'windows-universal',
            label: 'Download for Windows',
            url: asset.browser_download_url,
            enabled: true
          })
        }
      }
    })
    
    return NextResponse.json({
      version: release.tag_name,
      downloadLinks
    })
    
  } catch (error) {
    console.error('Error fetching download links:', error)
    
    // Return fallback/placeholder links if API fails
    return NextResponse.json({
      version: 'v2.1.0',
      downloadLinks: {
        mac: [
          {
            id: 'mac-apple-silicon',
            label: 'Download for Apple Silicon',
            url: 'https://placeholder-download-link.com/mac-apple-silicon',
            enabled: true
          },
          {
            id: 'mac-intel',
            label: 'Download for Intel Mac',
            url: 'https://placeholder-download-link.com/mac-intel',
            enabled: true
          }
        ],
        windows: [
          {
            id: 'windows-x64',
            label: 'Download for Windows x64',
            url: 'https://placeholder-download-link.com/windows-x64',
            enabled: true
          },
          {
            id: 'windows-amd64',
            label: 'Download for Windows AMD64',
            url: 'https://placeholder-download-link.com/windows-amd64',
            enabled: false
          }
        ]
      }
    })
  }
}
