import csv

input_file = r'c:\client work\directory-app\directory\airline_details_dummy.csv'
temp_file = r'c:\client work\directory-app\directory\airline_details_dummy_temp.csv'

# Read the raw file
with open(input_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Write with proper quoting - wrap Google Maps links in quotes
with open(temp_file, 'w', encoding='utf-8', newline='') as f:
    for i, line in enumerate(lines):
        if i == 0:  # Header
            f.write(line)
        else:
            # Find the last unquoted URL (Google Maps link) and wrap it in quotes
            # Split by comma but preserve quoted sections
            parts = []
            current = ''
            in_quotes = False
            for char in line:
                if char == '"':
                    in_quotes = not in_quotes
                    current += char
                elif char == ',' and not in_quotes:
                    parts.append(current)
                    current = ''
                else:
                    current += char
            parts.append(current.strip())
            
            # The last part should be Google_Maps_Link - quote it if it contains a comma
            if len(parts) == 21 and ',' in parts[-1] and not parts[-1].startswith('"'):
                parts[-1] = f'"{parts[-1]}"'
            
            f.write(','.join(parts) + '\n')

# Replace original with fixed version
import os
os.replace(temp_file, input_file)
print('CSV file fixed - Google Maps links are now properly quoted')
