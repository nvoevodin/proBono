library(data.table)
library(dplyr)
library(readxl)
library(tidygeocoder)
library(RMySQL)
library(DBI)

#Nikita swap for yours when you wanna work on it
direc = "/Users/mac/Documents/git_projects/proBono/data/"


#READ DATA AND CLEAN-----------------------------
#read allowed users
allowed_users = read_xlsx(paste0(direc,'App_Info.xlsx'), sheet = 1)
setDT(allowed_users)

#read sites
sites = read_xlsx(paste0(direc,'App_Info.xlsx'), sheet = 2)
setDT(sites)

#merged_site
merged_data = 
merge(sites,
      allowed_users,
      by="Position: Construction Site: Project Name",
      all.x = T,
      allow.cartesian = T)[order(`Start Date`, decreasing = T)]

#unique users
merged_data_n = merged_data[!duplicated(`Full Name`)]

#separate names
merged_data_n[,paste0("name_", 1:4) := tstrsplit(`Full Name`, " ")]


#pull allowed users data
final_allowed_users = 
  merged_data_n[,.(
    id=Email,
    user_id=NA,
    first_name=name_1,
    last_name=name_2,
    site_id = `Position: Construction Site: Project Name`
    
  )]


#pull sites data
final_sites = 
  sites[,.(
    site_id = `Position: Construction Site: Project Name`,
    site_name = `Position: Construction Site: Project Name`,
    site_address = paste(`Position: Construction Site: Project Name`,Borough, State)
  )]

#pull lat longs
lat_longs = final_sites %>% 
  #filter(name %in% c(site_id, site_name, site_address)) %>%
  geocode(site_address, lat = latitude , long = longitude)

setDT(lat_longs)[,site_manager:='John Doe']

#ADD EXISTING DATA-------------------

#allowed users
test_users =
data.table(
  id = c('voevodin.nv@gmail.com', 'nvoevodin@yandex.ru',
         'nvoevodin@me.com','faustolopez110@gmail.com',
         'lopezf.tlc@gmail.com', 'oliviatorres@gmail.com'),
  user_id = c('1234','12345',
              '123456','1791',
              '1792','2421'),
  first_name= c('Nikita', 'Nikita',
                'Nikita', 'Fausto',
                'Fausto', 'Olivia'),
  last_name= c('Voevodin', 'Tennis',
               'Sinagogue', 'Lopez',
               'Lopez', 'Torres'),
  site_id = c('B0002','B0004',
              'B0005','B0001',
              'B0006','B0003')
  
)

#sites
test_sites = 
data.table(
  site_id = c("B0001","B0002","B0003","B0004","B0005","B0006"),
  site_name =c("faustosite","nikita_home","oliviaPlace",
               "tennis_courts","sinagogue","faustoFamilyHouse"),
  site_address=c("23-48 Broadway Street Astoria NY 11106",
                 "pkwy",
                 "30-74 32nd street",
                 "383 Avenue T Brooklyn NY 1122",
                 "Ocean Pkwy",
                 "110-23 55 ave 2nd floor"),
  latitude=c('40.7635','40.6','40.7609',
             '40.599','40.602','40.7399'),
  longitude=c('-73.929', '-73.964','-73.9252',
              '-73.971','-73.966','-73.8481'),
  site_manager='John Doe'
)


#ADD TEST DATA
final_sites_n = rbind(lat_longs,test_sites)
final_allowed_users_n = rbind(final_allowed_users, test_users)

#add random uids for now for users
z = nrow(final_allowed_users_n[ !(user_id %in% c(
  '1234',
  '12345',
  '123456',
  '1791',
  '1792',
  '2421'
)
)])

final_allowed_users_n = 
final_allowed_users_n[ !(user_id %in% c(
  '1234',
  '12345',
  '123456',
  '1791',
  '1792',
  '2421'
)
), user_id:=sample(100, size = z, replace = TRUE)]



#WRITE OUT DATA----------------------

setwd(direc)
fwrite(final_sites_n, "sites.csv", row.names = F)
fwrite(final_allowed_users_n, "allowed_users.csv", row.names = F)

#LOAD DATA-----------------------------
setwd(direc)
sitez = fread("sites.csv")
userz = fread("allowed_users.csv")

#connection
connection = dbConnect(drv = MySQL(), #specifying database type.
                       user = "admin", # username
                       password = 'greenappl3', # password
                       host =
                         'probobo.cgac79lt7rx0.us-east-2.rds.amazonaws.com', # address
                       port = 3306, # port
                       dbname = 'proBono') # name of the database

#recreate tables
dbSendQuery(connection,"DROP TABLE proBono.allowed_users;")
dbSendQuery(connection,
            "
CREATE TABLE IF NOT EXISTS proBono.allowed_users(
id VARCHAR(100),
user_id VARCHAR(100),
first_name VARCHAR(100),
last_name VARCHAR(100),
site_id VARCHAR(100),
primary key (user_id)
);            
            ")

dbSendQuery(connection,"DROP TABLE proBono.construction_sites;")
dbSendQuery(connection,
            "
CREATE TABLE IF NOT EXISTS proBono.construction_sites(
     site_id VARCHAR(100),
     site_name VARCHAR(100),
     site_address VARCHAR(100),
     latitude float,
     longitude float,
     site_manager VARCHAR(30),
     PRIMARY KEY (site_id)
     );     
            ")

#load
dbWriteTable(connection,
             "allowed_users",
             userz, 
             append=TRUE,
             row.names = FALSE
             )

dbWriteTable(connection,
             "construction_sites",
             sitez, 
             append=TRUE,
             row.names = FALSE)



#dont forget to disconnect:
dbDisconnect(connection)



#read final files in and add them

sample(100, size = 100, replace = TRUE)


