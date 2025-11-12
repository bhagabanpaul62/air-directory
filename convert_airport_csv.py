import csv

# Read the current airport data
input_file = r'c:\client work\directory-app\directory\airport_data.csv'
output_file = r'c:\client work\directory-app\directory\airport_data.csv'

data = []
with open(input_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    
    # New header without Latitude/Longitude, add Google_Maps_Link
    new_fieldnames = [field for field in reader.fieldnames if field not in ['Latitude', 'Longitude']]
    new_fieldnames.append('Google_Maps_Link')
    
    data.append(new_fieldnames)
    
    for row in reader:
        new_row = []
        for field in new_fieldnames:
            if field == 'Google_Maps_Link':
                # Create Google Maps link from Latitude and Longitude
                lat = row.get('Latitude', '')
                lon = row.get('Longitude', '')
                if lat and lon:
                    new_row.append(f'https://maps.google.com/?q={lat},{lon}')
                else:
                    new_row.append('')
            else:
                new_row.append(row.get(field, ''))
        data.append(new_row)

# Write the new CSV with proper quoting
with open(output_file, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(data)

print(f'Converted {len(data)-1} airport records')
print(f'Changed: Latitude, Longitude -> Google_Maps_Link')
