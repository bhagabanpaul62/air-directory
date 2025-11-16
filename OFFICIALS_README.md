# Officials Data Upload System

## Overview

The Officials data system has been added to the admin dashboard, similar to Airlines and Airports. It allows you to manage tourism boards, embassies, consulates, and other official organizations.

## Features Added

### 1. **Database Model** (`src/model/official.model.js`)

- MongoDB schema for official organizations
- Fields include:
  - `official_id`: Unique identifier
  - `Type`: Organization type (Tourism Board, Embassy, Consulate, etc.)
  - `Name`, `Country`, `City`, `Region`, `Continent`
  - `Website`, `Email`, `Phone`, `Address`
  - Social media: `Facebook`, `Instagram`, `LinkedIn`, `X`, `YouTube`
  - `Google_Maps_Link`: Google Maps location (same as airlines/airports)
  - `Logo`, `Background_Image`
  - Auto-generated `slug` from name

### 2. **Import API** (`src/app/api/import/official/route.js`)

- CSV upload endpoint: `/api/import/officials`
- Supports upsert (update existing or create new)
- Handles duplicate detection by `official_id` or `Name`
- Properly parses CSV with quoted fields

### 3. **CRUD APIs**

- **List/Create/Delete All**: `/api/admin/officials`
- **Get/Update/Delete One**: `/api/admin/officials/[id]`
- Supports pagination and search

### 4. **Admin Dashboard Integration**

- New "Officials" tab in admin page
- CSV upload functionality
- Add/Edit/Delete officials manually
- Search and pagination

### 5. **Sample Data** (`official_data.csv`)

- 10 sample official organizations
- Includes tourism boards from various countries
- US Embassy example
- All with Google Maps links

## CSV File Format

The CSV file should have these columns (in order):

```csv
official_id,Continent,Country,Region,City,Name,Type,Info,Description,Website,Address,Facebook,Instagram,LinkedIn,X,YouTube,Email,Phone,Logo,Background_Image,Google_Maps_Link
```

### Example Row:

```csv
OF001,North America,USA,California,Los Angeles,Visit California,Tourism Board,Official tourism board of California,Promoting tourism...,https://www.visitcalifornia.com,"555 Capitol Mall, Sacramento",https://facebook.com/visitcalifornia,...,"https://maps.google.com/?q=38.5767,-121.4934"
```

### Important Notes:

1. **Google_Maps_Link**: Must be properly quoted if it contains commas
   - Format: `"https://maps.google.com/?q=LAT,LNG"`
2. **Address**: Quote if it contains commas
3. **Type**: Examples - "Tourism Board", "Embassy", "Consulate", "Government Office"

## How to Use

### Upload CSV:

1. Go to Admin Dashboard → **Officials** tab
2. Click "Choose File" in the CSV Upload section
3. Select `official_data.csv`
4. Click "Upload"
5. Success message will show: rows, upserted, modified counts

### Manual Entry:

1. Click "Add Official" button
2. Fill in the form fields:
   - **Required**: Name, Type
   - **Optional**: All other fields
3. Click "Save"

### Edit/Delete:

- Click "Edit" button on any row to modify
- Click "Delete" button to remove (requires confirmation)

## API Endpoints

### Import CSV

```
POST /api/import/officials
Content-Type: multipart/form-data
Body: file (CSV file)
```

### List Officials

```
GET /api/admin/officials?page=1&limit=10&search=tourism
```

### Create Official

```
POST /api/admin/officials
Content-Type: application/json
Body: { Name, Type, Country, ... }
```

### Update Official

```
PUT /api/admin/officials/[id]
Content-Type: application/json
Body: { Name, Type, ... }
```

### Delete Official

```
DELETE /api/admin/officials/[id]
```

## Data Types

### Organization Types:

- Tourism Board
- Embassy
- Consulate
- Government Office
- Trade Commission
- Cultural Center
- Visa Application Center
- (Any custom type)

## Migration from Latitude/Longitude

Just like airlines and airports, officials use `Google_Maps_Link` instead of separate `Latitude` and `Longitude` fields.

**Example:**

```
Old: Latitude: 34.0522, Longitude: -118.2437
New: Google_Maps_Link: "https://maps.google.com/?q=34.0522,-118.2437"
```

## Files Created

1. `src/model/official.model.js` - Mongoose schema
2. `src/app/api/import/official/route.js` - CSV import endpoint
3. `src/app/api/admin/officials/route.js` - CRUD operations
4. `src/app/api/admin/officials/[id]/route.js` - Single official operations
5. `official_data.csv` - Sample data file
6. `generate_official_csv.py` - Script to generate CSV

## Updated Files

1. `src/app/admin/page.jsx` - Added Officials tab and form support

## Testing

1. **Verify CSV format:**

   ```powershell
   python -c "import csv; f = open('official_data.csv', 'r'); reader = csv.reader(f); print(len(next(reader)), len(next(reader)))"
   ```

   Should show: `21 21` (matching columns)

2. **Upload test:**

   - Navigate to http://localhost:3000/admin
   - Select "Officials" tab
   - Upload `official_data.csv`
   - Should show success message

3. **Database check:**
   - MongoDB compass or shell
   - Collection: `officials`
   - Should have 10 documents

## Summary

✅ Complete CRUD system for officials
✅ CSV import/export support
✅ Google Maps integration
✅ Admin dashboard integration
✅ Sample data provided
✅ Consistent with airlines/airports structure
