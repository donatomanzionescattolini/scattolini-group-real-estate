# Generates square, same-origin favicon assets from the navbar logo.
#
# Source: assets2/logos/logo-transparent-background-1.png (the top-navbar icon)
#
# Why: Non-Google search engines (Bing, DuckDuckGo, Yandex) request /favicon.ico
# from the site's OWN origin and largely ignore cross-origin <link rel="icon">
# pointing at S3 -- that is why only a gray globe was showing. This writes proper
# same-origin PNG icons + a multi-size favicon.ico into /public so the navbar logo
# is used everywhere (Google result icon + the other engines).
#
# Run:  powershell -ExecutionPolicy Bypass -File scripts\generate-favicons.ps1

Add-Type -AssemblyName System.Drawing

$root      = Split-Path -Parent $PSScriptRoot
$publicDir = Join-Path $root 'public'
$sourceUrl = 'https://pagina-mama.s3.amazonaws.com/assets2/logos/logo-transparent-background-1.png'
$tmp       = Join-Path $env:TEMP 'scattolini-navbar-logo.png'

Invoke-WebRequest $sourceUrl -OutFile $tmp
$src = [System.Drawing.Image]::FromFile($tmp)

# Returns a square Bitmap of the requested size with the wide logo centered on a
# transparent canvas (never distorted).
function New-SquareIcon([System.Drawing.Image]$img, [int]$size) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g   = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $scale = [Math]::Min($size / $img.Width, $size / $img.Height)
    $w = [int][Math]::Round($img.Width  * $scale)
    $h = [int][Math]::Round($img.Height * $scale)
    $x = [int][Math]::Round(($size - $w) / 2)
    $y = [int][Math]::Round(($size - $h) / 2)
    $g.DrawImage($img, $x, $y, $w, $h)
    $g.Dispose()
    return $bmp
}

# Same-origin PNG icons referenced from index.html / manifest.json
$pngTargets = @(
    @{ Name = 'favicon-16x16.png';   Size = 16  },
    @{ Name = 'favicon-32x32.png';   Size = 32  },
    @{ Name = 'favicon-48x48.png';   Size = 48  },
    @{ Name = 'apple-touch-icon.png'; Size = 180 },
    @{ Name = 'icon-192.png';        Size = 192 },
    @{ Name = 'icon-512.png';        Size = 512 }
)

$pngBytes = @{}
foreach ($t in $pngTargets) {
    $bmp = New-SquareIcon $src $t.Size
    $path = Join-Path $publicDir $t.Name
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $pngBytes[$t.Size] = $ms.ToArray()
    $ms.Dispose(); $bmp.Dispose()
    Write-Host "wrote public/$($t.Name) ($($t.Size)x$($t.Size))"
}

# Build a Vista-style multi-size .ico embedding PNG payloads (16/32/48) -- this is
# what Bing / DuckDuckGo / Yandex fetch at /favicon.ico.
$icoSizes = @(16, 32, 48)
$count = $icoSizes.Count
$ms = New-Object System.IO.MemoryStream
$bw = New-Object System.IO.BinaryWriter($ms)
$bw.Write([UInt16]0)      # reserved
$bw.Write([UInt16]1)      # type = icon
$bw.Write([UInt16]$count) # image count

$offset = 6 + $count * 16
foreach ($s in $icoSizes) {
    $data = $pngBytes[$s]
    $bw.Write([Byte]($(if ($s -ge 256) { 0 } else { $s })))  # width
    $bw.Write([Byte]($(if ($s -ge 256) { 0 } else { $s })))  # height
    $bw.Write([Byte]0)        # palette colors
    $bw.Write([Byte]0)        # reserved
    $bw.Write([UInt16]1)      # color planes
    $bw.Write([UInt16]32)     # bits per pixel
    $bw.Write([UInt32]$data.Length)
    $bw.Write([UInt32]$offset)
    $offset += $data.Length
}
foreach ($s in $icoSizes) { $bw.Write($pngBytes[$s]) }
$bw.Flush()
$icoBytes = $ms.ToArray()
$bw.Dispose(); $ms.Dispose()

[System.IO.File]::WriteAllBytes((Join-Path $publicDir 'favicon.ico'), $icoBytes)
[System.IO.File]::WriteAllBytes((Join-Path $root 'favicon.ico'), $icoBytes)
Write-Host 'wrote public/favicon.ico and favicon.ico'

$src.Dispose()
Remove-Item $tmp -Force -ErrorAction SilentlyContinue

