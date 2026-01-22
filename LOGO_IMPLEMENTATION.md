# Logo System Implementation

## ✅ Implemented

The 3-piece logo system has been fully implemented according to brand guidelines:

### 1. **PRIMARY WORDMARK** (`components/logos/Wordmark.tsx`)
- Clean, two-line stacked: "PELOTON" / "ARCHIVE"
- Used in: Navbar (desktop), Footer
- Responsive: Switches to Bike Icon on mobile navbar

### 2. **SECONDARY MARK - BIKE ICON** (`components/logos/BikeIcon.tsx`)
- Standalone bike icon (SVG)
- Used in: Favicon, mobile navbar, small UI elements
- File: `public/favicon.svg`

### 3. **PRIMARY HERITAGE MARK - ARCHIVE SEAL** (`components/logos/ArchiveSeal.tsx`)
- Stamp-style emblem with perforated border, checkerboard pattern
- Used in: Homepage hero section
- Features: "PELOTON ARCHIVE", "PRO TEAM ISSUE", serial number

## 📍 Current Placement

- **Navbar**: Wordmark (desktop) / Bike Icon (mobile)
- **Footer**: Wordmark
- **Homepage Hero**: Archive Seal (centered, below headline)
- **Favicon**: Bike Icon SVG

## 🔄 To Replace with Final Assets

When you have the final logo files:

1. **Archive Seal Image**: Replace the styled placeholder in `components/logos/ArchiveSeal.tsx` with the actual image
2. **Apple Touch Icon**: Create 180x180 PNG from bike icon → `public/apple-touch-icon.png`
3. **Favicon ICO**: Convert bike icon to ICO format → `public/favicon.ico` (optional, SVG works)

## 📝 Usage Guidelines

- ✅ Wordmark: Daily navigation, footer
- ✅ Bike Icon: Favicon, mobile nav, small contexts
- ✅ Archive Seal: Hero sections, collection pages, premium features only
- ❌ Never use Archive Seal as nav logo
- ❌ Never use texture/checkerboard outside Archive Seal
