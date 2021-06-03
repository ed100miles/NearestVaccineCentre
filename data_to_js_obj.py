import json
import csv

#### Vac sites csv to js object:
# sites_list = []
# with open('data/vac_sites_longs_lats.csv', 'r') as vac_sites_long_lat:
#     sites_reader = csv.reader(vac_sites_long_lat)
#     for site in sites_reader:
#         temp = site[:4]
#         temp.append(float(site[4]))
#         temp.append(float(site[5]))
#         sites_list.append(temp)

# with open('data/vac_sites.js', 'a') as vac_sites_js:
#     vac_sites_js.write("let vac_sites = {\n" )
#     for row in sites_list[:]:
#         out_key = f'{row[2]}'
#         out_value = []
#         for x in row[:2]:
#             out_value.append(x)
#         for y in row[3:]:
#             out_value.append(y)
#         # print(out_value)
#         vac_sites_js.write(f'"{out_key}": {out_value},\n')
#         # print(row)
#     vac_sites_js.write('}')

# postcode_list = []

# with open('data/PLL.csv', 'r') as postcode_csv:
#     with open('data/postcode.js', 'a') as postcode_out:
#         postcode_reader = csv.reader(postcode_csv)
#         postcode_out.write('export const postcodes = [\n')
#         for postcode in postcode_reader:
#             postcode_out.write(f'{postcode},\n')
#         postcode_out.write(']')

postcode_list = []
    
with open('data/PLL.csv', 'r') as postcode_csv:
    with open('data/postcodeJSON.js', 'a') as postcode_out:
        postcode_reader = csv.reader(postcode_csv)
        postcode_out.write('export const postcodes = {\n')
        for postcode in postcode_reader:
            postcode_out.write(f'"{postcode[0]}": {postcode[1:]},\n')
        postcode_out.write('}')

