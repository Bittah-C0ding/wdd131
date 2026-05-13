import pandas as pd

# Load the data
url = 'https://raw.githubusercontent.com/byuidatascience/data4names/master/data-raw/names_year/names_year.csv'
df = pd.read_csv(url)

# Check what columns exist
print("Columns:", df.columns.tolist())

# Sum the 'UT' column for rows where name is Oliver
oliver_utah_total = df[df['name'] == 'Oliver']['UT'].sum()
print("Oliver in Utah total:", oliver_utah_total)