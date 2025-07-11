export interface DownloadLink {
  id: string
  label: string
  url: string
  enabled: boolean
}

export interface PlatformDownloads {
  mac: DownloadLink[]
  windows: DownloadLink[]
}

export const downloadLinks: PlatformDownloads = {
  mac: [
    {
      id: "mac-apple-silicon",
      label: "Download for Apple Silicon",
      url: "https://placeholder-download-link.com/mac-apple-silicon",
      enabled: true,
    },
    {
      id: "mac-intel",
      label: "Download for Intel Mac",
      url: "https://placeholder-download-link.com/mac-intel",
      enabled: true,
    },
  ],
  windows: [
    {
      id: "windows-x64",
      label: "Download for Windows x64",
      url: "https://placeholder-download-link.com/windows-x64",
      enabled: true,
    },
    {
      id: "windows-amd64",
      label: "Download for Windows AMD64",
      url: "https://placeholder-download-link.com/windows-amd64",
      enabled: false, // Temporarily disabled
    },
  ],
}
