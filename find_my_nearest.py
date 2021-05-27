import csv
from math import sqrt

with open('data/PLL.csv') as f:
    f_reader = csv.reader(f, delimiter=',')
    f_list = list(f_reader)

# Convert longs and lats to floats not str:
new_list = []
for item in f_list:
    new_list.append([item[0], float(item[1]), float(item[2])])
postcode_long_lat_list = new_list

# Create sites list with float long + lat
sites_list = []
with open('data/vac_sites_longs_lats.csv', 'r') as vac_sites_long_lat:
    sites_reader = csv.reader(vac_sites_long_lat)
    for site in sites_reader:
        temp = site[:4]
        temp.append(float(site[4]))
        temp.append(float(site[5]))
        sites_list.append(temp)

user_postcode = input('What\'s your postcode?')

#get users long + lat 
for postcode in postcode_long_lat_list:
    if postcode[0] == user_postcode:
        user_long = postcode[1]
        user_lat = postcode[2]

# print(user_long, user_lat)

def get_hypot(user_lat, user_long, site_lat, site_long):
    lat_dist = user_lat - site_lat
    long_dist = user_long - site_long
    return sqrt(lat_dist**2 + long_dist**2)

smallest_dist = get_hypot(user_lat, user_long, sites_list[0][4], sites_list[0][5])
for site in sites_list:
    dist = get_hypot(user_lat, user_long, site[5], site[4])
    if dist < smallest_dist:
        smallest_dist = dist
        closest_site = site

print(smallest_dist)
print(closest_site)


##### old stuff...

# with open('data/out.csv', 'w') as out_file:
#     out_writer = csv.writer(out_file)
#     for site in tqdm(vac_site_list):
#         site_postcode = site[2]
#         for foo in postcode_long_lat_list:
#             if foo[0] == site_postcode:
#                 lat = foo[1]
#                 long = foo[2]
#                 site.append(lat)
#                 site.append(long)
#                 out_writer.writerow(site)