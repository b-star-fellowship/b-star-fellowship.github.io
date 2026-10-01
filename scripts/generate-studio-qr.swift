// Run from the repository root on macOS: swift scripts/generate-studio-qr.swift
// Core Image generates the QR matrix; the SVG embeds our existing vector logo.
import Foundation
import CoreImage

let destination = "https://brownai.studio"
let filter = CIFilter(name: "CIQRCodeGenerator")!
filter.setValue(Data(destination.utf8), forKey: "inputMessage")
filter.setValue("H", forKey: "inputCorrectionLevel")
let image = filter.outputImage!
let width = Int(image.extent.width)
var pixels = [UInt8](repeating: 0, count: width * width * 4)
CIContext().render(image, toBitmap: &pixels, rowBytes: width * 4,
                   bounds: image.extent, format: .RGBA8,
                   colorSpace: CGColorSpaceCreateDeviceRGB())
precondition(pixels.contains(255), "Core Image returned an empty render. Run with access to macOS image-rendering services.")

func isDark(_ x: Int, _ y: Int) -> Bool { pixels[(y * width + x) * 4] < 128 }

// Replace Core Image's one-module margin with a four-module quiet zone.
let darkCoordinates = (0..<width).flatMap { y in
    (0..<width).filter { isDark($0, y) }.map { ($0, y) }
}
let first = darkCoordinates.map { min($0.0, $0.1) }.min()!
let last = darkCoordinates.map { max($0.0, $0.1) }.max()!
let size = last - first + 1
let border = 4
let canvas = size + border * 2
var modules = ""
for y in 0..<size {
    for x in 0..<size where isDark(x + first, y + first) {
        modules += "M\(x + border) \(y + border)h1v1h-1z"
    }
}

// The small central badge covers 7 × 7 of the 29 × 29 modules.
// High error correction leaves room for the logo; the finder patterns stay intact.
let badge = Double(border) + Double(size - 7) / 2
let logo = try String(contentsOfFile: "assets/img/studio-mark.svg", encoding: .utf8)
    .replacingOccurrences(of: "<svg ", with: "<svg x=\"\(badge + 0.8)\" y=\"\(badge + 0.8)\" width=\"5.4\" height=\"5.4\" ")
let svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \(canvas) \(canvas)" width="740" height="740" role="img" aria-labelledby="title desc">
  <title id="title">Brown AI Studio QR code</title>
  <desc id="desc">Scan to visit \(destination). High error correction; four-module quiet zone.</desc>
  <rect width="\(canvas)" height="\(canvas)" fill="#f3ede5"/>
  <path d="\(modules)" fill="#171310" shape-rendering="crispEdges"/>
  <rect x="\(badge)" y="\(badge)" width="7" height="7" fill="#f3ede5"/>
  <rect x="\(badge + 0.4)" y="\(badge + 0.4)" width="6.2" height="6.2" rx="0.55" fill="#171310"/>
  \(logo.trimmingCharacters(in: .whitespacesAndNewlines))
</svg>

"""
try svg.write(toFile: "assets/img/studio-qr.svg", atomically: true, encoding: .utf8)
print("Created studio-qr.svg: \(size)×\(size) modules, correction H → \(destination)")
